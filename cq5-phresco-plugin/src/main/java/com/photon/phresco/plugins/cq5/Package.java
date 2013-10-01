/**
 * java-phresco-plugin
 *
 * Copyright (C) 1999-2013 Photon Infotech Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.photon.phresco.plugins.cq5;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.logging.Log;
import org.apache.maven.project.MavenProject;

import com.google.gson.Gson;
import com.photon.phresco.api.ConfigManager;
import com.photon.phresco.configuration.ConfigReader;
import com.photon.phresco.configuration.Environment;
import com.photon.phresco.exception.ConfigurationException;
import com.photon.phresco.exception.PhrescoException;
import com.photon.phresco.impl.ConfigManagerImpl;
import com.photon.phresco.plugin.commons.MavenProjectInfo;
import com.photon.phresco.plugin.commons.PluginConstants;
import com.photon.phresco.plugin.commons.PluginUtils;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration.Parameters.Parameter;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration.Parameters.Parameter.MavenCommands.MavenCommand;
import com.photon.phresco.plugins.util.MojoUtil;
import com.photon.phresco.plugins.util.PluginPackageUtil;
import com.photon.phresco.util.Constants;
import com.photon.phresco.util.Utility;
import com.phresco.pom.exception.PhrescoPomException;
import com.phresco.pom.util.PomProcessor;

public class Package implements PluginConstants {
	
	private MavenProject project;
	private File baseDir;
	private String environmentName;
	private String moduleName;
	private String buildName;
	private String buildNumber;
	private int buildNo;
	private File targetDir;
	private File buildDir;
	private File buildInfoFile;
	private File tempDir;
	private int nextBuildNo;
	private String zipName;
	private Date currentDate;
	private String context;
	private Log log;
	private PluginPackageUtil util;
	private PluginUtils pu;
	private String sourceDir;
	private StringBuilder builder;
	private String pomName;
	private String packagingType;
	
	public void pack(Configuration configuration, MavenProjectInfo mavenProjectInfo, Log log) throws PhrescoException {
		this.log = log;
		baseDir = mavenProjectInfo.getBaseDir();
        project = mavenProjectInfo.getProject();
        pomName = project.getFile().getName();
        Map<String, String> configs = MojoUtil.getAllValues(configuration);
        environmentName = configs.get(ENVIRONMENT_NAME);
        buildName = configs.get(BUILD_NAME);
        buildNumber = configs.get(BUILD_NUMBER);
        util = new PluginPackageUtil();
        pu = new PluginUtils();
        builder = new StringBuilder();
        moduleName = configs.get(PROJECT_MODULE);
        PluginUtils.checkForConfigurations(baseDir, environmentName);
        packagingType = getPackagingType();
        try { 
			init();
			getMavenCommands(configuration); // -DskipTests cmd
			adaptSourceConfig();
			executeMvnPackage();
			boolean buildStatus = build();
			writeBuildInfo(buildStatus);
			cleanUp();
		} catch (MojoExecutionException e) {
			throw new PhrescoException(e);
		} catch (IOException e) {
			throw new PhrescoException(e);
		}	
	}
	
	private void adaptSourceConfig() throws MojoExecutionException {
		String modulePath = "";
		if(StringUtils.isEmpty(environmentName)) {
			return;
		}
		if (moduleName != null) {
			modulePath = File.separatorChar + moduleName;
		}
		PomProcessor processor  = null;
		File sourceConfigFile = null;
		try {
			processor = new PomProcessor(project.getFile());
			String configXml = processor.getProperty(POM_PROP_CONFIG_FILE);
			if(StringUtils.isNotEmpty(configXml)) {
				sourceConfigFile = new File(baseDir + modulePath + configXml);
			} else {
				sourceConfigFile = new File(baseDir + modulePath + sourceDir + FORWARD_SLASH +  "config.json");
			}
			File parentFile = sourceConfigFile.getParentFile();
			if (parentFile.exists()) {
				writeConfiguration(environmentName, baseDir.getPath(), sourceConfigFile);
			}
		} catch (PhrescoPomException e) {
			throw new MojoExecutionException(e.getMessage());
		} catch (PhrescoException e) {
			throw new MojoExecutionException(e.getMessage());
		}
	}

	private String getPackagingType() throws PhrescoException {
		StringBuilder builder = new StringBuilder();
		builder.append(baseDir.getPath())
		.append(File.separatorChar);
		if(StringUtils.isNotEmpty(moduleName)) {
			builder.append(moduleName);
			builder.append(File.separatorChar);
		}
		builder.append(pomName);
		try {
			PomProcessor pomProcessor = new PomProcessor(new File(builder.toString()));
			return pomProcessor.getModel().getPackaging();
		} catch (PhrescoPomException e) {
			throw new PhrescoException(e);
		}
	}
	
	private void init() throws MojoExecutionException {
		try {
			buildDir = new File(baseDir.getPath() + PluginConstants.BUILD_DIRECTORY);
			if(StringUtils.isNotEmpty(moduleName)) {
				targetDir = new File(baseDir.getPath() + File.separator + moduleName + DO_NOT_CHECKIN_FOLDER + File.separator + TARGET);
			} else {
				targetDir = new File(project.getBuild().getDirectory());
			}
			baseDir = getProjectRoot(baseDir);
			if (!buildDir.exists()) {
				buildDir.mkdirs();
				log.info("Build directory created..." + buildDir.getPath());
			}
			buildInfoFile = new File(baseDir.getPath() + PluginConstants.BUILD_DIRECTORY + BUILD_INFO_FILE);
			File buildInfoDir = new File(baseDir.getPath() + PluginConstants.BUILD_DIRECTORY);
			if (!buildInfoDir.exists()) {
				buildInfoDir.mkdirs();
				log.info("Build directory created..." + buildDir.getPath());
			}
			nextBuildNo = util.generateNextBuildNo(buildInfoFile);
			currentDate = Calendar.getInstance().getTime();
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new MojoExecutionException(e.getMessage(), e);
		}
	}

	private File getProjectRoot(File childDir) {
		File[] listFiles = childDir.listFiles(new PhrescoDirFilter());
		if (listFiles != null && listFiles.length > 0) {
			return childDir;
		}
		if (childDir.getParentFile() != null) {
			return getProjectRoot(childDir.getParentFile());
		}
		return null;
	}

	public class PhrescoDirFilter implements FilenameFilter {

		public boolean accept(File dir, String name) {
			return name.equals(DOT_PHRESCO_FOLDER);
		}
	}

	private void updateFinalName() throws MojoExecutionException {
		try {
			File pom = project.getFile();
			PomProcessor pomprocessor = new PomProcessor(pom);
			String envName = environmentName;
			List<String> envList = pu.csvToList(environmentName);

			if (environmentName.indexOf(',') > -1) { // multi-value
				envName = readDefaultEnv(envList);
			}
			List<com.photon.phresco.configuration.Configuration> configurations = pu.getConfiguration(baseDir, envName, Constants.SETTINGS_TEMPLATE_SERVER);
			if(CollectionUtils.isNotEmpty(configurations)) {
				for (com.photon.phresco.configuration.Configuration configuration : configurations) {
					context = configuration.getProperties().getProperty(Constants.SERVER_CONTEXT);
					break;
				}
			}
			sourceDir = pomprocessor.getProperty(POM_PROP_KEY_SOURCE_DIR);
			if (StringUtils.isEmpty(context)) {
				return;
			}
			pomprocessor.setFinalName(context);
			pomprocessor.save();
		} catch (PhrescoException e) {
			throw new MojoExecutionException(e.getMessage(), e);
		} catch (PhrescoPomException e) {
			throw new MojoExecutionException(e.getMessage(), e);
		}
	}
	
	public String readDefaultEnv(List<String> envList) throws MojoExecutionException {
		boolean defaultEnv = false;
		String defaultEnvName = "";
		ConfigManager configManager = null;
		try {
			String customerId = pu.readCustomerId(baseDir);
			File settingsXml = new File(Utility.getProjectHome() + customerId + Constants.SETTINGS_XML);
			if (settingsXml.exists()) {
				configManager = new ConfigManagerImpl(new File(Utility.getProjectHome() + customerId
						+ Constants.SETTINGS_XML));
				List<Environment> settingsEnvironments = configManager.getEnvironments(envList);
				for (Environment environment : settingsEnvironments) {
					defaultEnv = environment.isDefaultEnv();
					if (defaultEnv) {
						defaultEnvName = environment.getName();
					}
				}
			}
			if (!defaultEnv) {
				configManager = new ConfigManagerImpl(new File(baseDir.getPath() + File.separator
						+ Constants.DOT_PHRESCO_FOLDER + File.separator + Constants.CONFIGURATION_INFO_FILE));
				List<Environment> configurationEnvironments = configManager.getEnvironments(envList);
				for (Environment configEnvironment : configurationEnvironments) {
					defaultEnv = configEnvironment.isDefaultEnv();
					if (defaultEnv) {
						defaultEnvName = configEnvironment.getName();
					}
				}
			}
		} catch (PhrescoException e) {
			throw new MojoExecutionException(e.getMessage(), e);
		} catch (ConfigurationException e) {
			throw new MojoExecutionException(e.getMessage(), e);
		}
		return defaultEnvName;
	}
	
	private void getMavenCommands(Configuration configuration) {
		List<Parameter> parameters = configuration.getParameters().getParameter();
		for (Parameter parameter : parameters) {
			if(parameter.getPluginParameter() != null && parameter.getMavenCommands() != null) {
				List<MavenCommand> mavenCommands = parameter.getMavenCommands().getMavenCommand();
				for (MavenCommand mavenCommand : mavenCommands) {
					if(parameter.getValue().equals(mavenCommand.getKey())) {
						builder.append(mavenCommand.getValue());
						builder.append(STR_SPACE);
					}
				}
			}
		}
	}
	
	private void executeMvnPackage() throws MojoExecutionException, IOException {
		log.info("Packaging the project...");
		BufferedReader bufferedReader = null;
		StringBuilder sb = new StringBuilder();
		sb.append(MVN_CMD);
		sb.append(STR_SPACE);
		sb.append(MVN_PHASE_CLEAN);
		sb.append(STR_SPACE);
		sb.append(MVN_PHASE_PACKAGE);
		if(!Constants.POM_NAME.equals(pomName)) {
			sb.append(STR_SPACE);
			sb.append(Constants.HYPHEN_F);
			sb.append(STR_SPACE);
			sb.append(pomName);
		}
		sb.append(STR_SPACE);
		sb.append(builder.toString());
		String line ="";
		String processName = ManagementFactory.getRuntimeMXBean().getName();
		String[] split = processName.split("@");
		String processId = split[0].toString();
		Utility.writeProcessid(baseDir.getPath(), "package", processId);
		bufferedReader = Utility.executeCommand(sb.toString(), baseDir.getPath());
		while ((line = bufferedReader.readLine()) != null) {
				System.out.println(line); //do not use getLog() here as this line already contains the log type.
		}
	}

	private boolean build() throws MojoExecutionException {
		boolean isBuildSuccess = true;
		try {
			log.info("Building the project...");
			createPackage();
		} catch (Exception e) {
			isBuildSuccess = false;
			log.error(e.getMessage());
			throw new MojoExecutionException(e.getMessage(), e);
		}
		return isBuildSuccess;
	}
	
	private void writeConfiguration(String envName, String basePath, File sourceConfigXML) throws PhrescoException {
		FileWriter writer = null;
		List<Environment> environments = new ArrayList<Environment>();
		List<Environment> configEnvs = null;
		List<Environment> settingsEnvs = null;
		try {
			String customerId = pu.readCustomerId(new File(basePath));
			File currentDirectory = new File(".");
			File configXML = new File(currentDirectory + File.separator + 
					PluginConstants.DOT_PHRESCO_FOLDER + File.separator + PluginConstants.CONFIG_FILE);
			File settingsXML = new File(Utility.getProjectHome() + customerId + Constants.SETTINGS_XML);
			ConfigReader reader = new ConfigReader(configXML);
			String[] envNames = envName.split(",");
			List<String> envList = Arrays.asList(envNames);
			configEnvs = reader.getEnvironments(envList);
			environments.addAll(configEnvs);
			if (settingsXML.exists()) {
				ConfigReader srcReaderToAppend = new ConfigReader(sourceConfigXML);
				settingsEnvs = srcReaderToAppend.getEnvironments(envList);
				environments.addAll(settingsEnvs);
			}
			if(CollectionUtils.isNotEmpty(environments)) {
				writer = new FileWriter(sourceConfigXML);
				writer.write(new Gson().toJson(environments));
				writer.flush();
			}
		} catch (ConfigurationException e) {
			throw new PhrescoException(e);
		} catch (IOException e) {
			throw new PhrescoException(e);
		} finally {
			Utility.closeStream(writer);
		}
	}
	
	private void createPackage() throws MojoExecutionException {
		if(StringUtils.isNotEmpty(moduleName) && JAR.equals(packagingType) || StringUtils.isEmpty(packagingType)) {
			return;
		}
		zipName = util.createPackage(buildName, buildNumber, nextBuildNo, currentDate);
		String zipFilePath = buildDir.getPath() + File.separator + zipName;
		String zipNameWithoutExt = zipName.substring(0, zipName.lastIndexOf('.'));
		copyZipToPackage(zipNameWithoutExt); // jar package
	}

	private void copyZipToPackage(String zipNameWithoutExt) throws MojoExecutionException {
		try {
			String[] list = targetDir.list(new ZipFileNameFilter());
			if (list.length > 0) {
				File zipFile = new File(targetDir.getPath() + File.separator + list[0]);
				if(!buildDir.exists()) {
					buildDir.mkdirs();
				}
				FileUtils.copyFileToDirectory(zipFile, buildDir);
				File contextZipFile = new File(buildDir.getPath() + File.separator + zipNameWithoutExt + ".zip");
				File buildZipFile = new File(buildDir, zipFile.getName());
				buildZipFile.renameTo(contextZipFile);
			}
		} catch (IOException e) {
			throw new MojoExecutionException(e.getMessage(), e);
		}
	}

	private void writeBuildInfo(boolean isBuildSuccess) throws MojoExecutionException {
		if(StringUtils.isNotEmpty(moduleName) && JAR.equals(packagingType) || StringUtils.isEmpty(packagingType)) {
			return;
		}
		util.writeBuildInfo(isBuildSuccess, buildName, buildNumber, nextBuildNo, environmentName, buildNo, currentDate, buildInfoFile);
	}

	private void cleanUp() throws MojoExecutionException {
		try {
			if(tempDir != null && tempDir.exists()) {
				FileUtils.deleteDirectory(tempDir);
			}
		} catch (IOException e) {
			throw new MojoExecutionException(e.getMessage(), e);
		}
	}
}

class JarFileNameFilter implements FilenameFilter {

	public boolean accept(File dir, String name) {
		return name.endsWith(".jar");
	}

}

class ZipFileNameFilter implements FilenameFilter {

	public boolean accept(File dir, String name) {
		return name.endsWith(".zip");
	}
}
