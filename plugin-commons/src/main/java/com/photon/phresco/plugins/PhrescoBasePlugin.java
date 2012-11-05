package com.photon.phresco.plugins;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.lang.StringUtils;
import org.apache.maven.plugin.logging.Log;
import org.apache.maven.project.MavenProject;
import org.codehaus.plexus.util.cli.CommandLineException;
import org.codehaus.plexus.util.cli.Commandline;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.photon.phresco.api.ConfigManager;
import com.photon.phresco.exception.ConfigurationException;
import com.photon.phresco.exception.PhrescoException;
import com.photon.phresco.framework.PhrescoFrameworkFactory;
import com.photon.phresco.impl.ConfigManagerImpl;
import com.photon.phresco.plugin.commons.MavenProjectInfo;
import com.photon.phresco.plugin.commons.PluginConstants;
import com.photon.phresco.plugins.api.PhrescoPlugin;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration.Parameters.Parameter;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration.Parameters.Parameter.MavenCommands.MavenCommand;
import com.photon.phresco.plugins.util.MojoUtil;
import com.photon.phresco.util.Constants;

public class PhrescoBasePlugin implements PhrescoPlugin, PluginConstants {

	public Log log;
	private ConfigManager configManager;

	public PhrescoBasePlugin(Log log) {
		this.log = log;
	}

	protected final Log getLog() {
		return log;
	}

	public void runUnitTest(Configuration configuration, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		generateMavenCommand(mavenProjectInfo, Constants.POM_PROP_KEY_UNITTEST_DIR);
	}

	public void runFunctionalTest(Configuration configuration, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		MavenProject project = mavenProjectInfo.getProject();
		String basedir = project.getBasedir().getPath();
		Map<String, String> configValues = MojoUtil.getAllValues(configuration);
		String environmentName = configValues.get(ENVIRONMENT_NAME);
		String browserValue = configValues.get(BROWSER);
		String resolutionValue = configValues.get(RESOLUTION);
		File selectedEnvFile = new File(basedir + File.separator + DOT_PHRESCO_FOLDER + File.separator + Constants.CONFIGURATION_INFO_FILE);
		String resultConfigFileDir = project.getProperties().getProperty(Constants.PHRESCO_FUNCTIONAL_TEST_ADAPT_DIR);
		File resultConfigXml = new File(basedir + resultConfigFileDir, Constants.CONFIGURATION_INFO_FILE);
		adaptTestConfig(selectedEnvFile, resultConfigXml, environmentName, browserValue, resolutionValue);
		generateMavenCommand(mavenProjectInfo, Constants.POM_PROP_KEY_FUNCTEST_DIR);
	}

	public void runPerformanceTest() throws PhrescoException {
		// TODO Auto-generated method stub

	}

	public void runLoadTest() throws PhrescoException {
		// TODO Auto-generated method stub

	}

	public void validate(Configuration configuration, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(SONAR_COMMAND);
			Map<String, String> config = MojoUtil.getAllValues(configuration);
			MavenProject project = mavenProjectInfo.getProject();
			String baseDir = project.getBasedir().getPath();
			Commandline commandline = new Commandline(sb.toString());
			String value = config.get(SONAR);
			String string = config.get(value);
			if(string != null) {
				List<Parameter> parameters = configuration.getParameters().getParameter();
				for (Parameter parameter : parameters) {
					if (parameter.getPluginParameter() != null && parameter.getPluginParameter().equals(PLUGIN_PARAMETER)) {
						List<MavenCommand> mavenCommands = parameter.getMavenCommands().getMavenCommand();
						for (MavenCommand mavenCommand : mavenCommands) {
							if (parameter.getValue().equals(value) || mavenCommand.getKey().equals(string)) {
								String mavenCommandValue = mavenCommand.getValue();
								sb.append(STR_SPACE);
								sb.append(mavenCommandValue);
								commandline = new Commandline(sb.toString());
							}
						}
					}
				}
			}

			if(value.equals("functional")) {
				String workingDir = project.getProperties().getProperty(Constants.POM_PROP_KEY_FUNCTEST_DIR);
				sb.append(STR_SPACE);
				sb.append("-Dsonar.branch=functional");
				commandline = new Commandline(sb.toString());
				if (StringUtils.isNotEmpty(workingDir)) {
					commandline.setWorkingDirectory(baseDir + workingDir);
				}
			}
			Process pb = commandline.execute();
			// Consume subprocess output and write to stdout for debugging
			InputStream is = new BufferedInputStream(pb.getInputStream());
			int singleByte = 0;
			while ((singleByte = is.read()) != -1) {
				//output.write(buffer, 0, bytesRead);
				System.out.write(singleByte);
			}
		} catch (CommandLineException e) {
			throw new PhrescoException(e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


	public void pack(Configuration configuration, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		// TODO Auto-generated method stub

	}

	public void deploy(Configuration configuration, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		// TODO Auto-generated method stub
	}

	public void startServer(Configuration configuration, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		// TODO Auto-generated method stub
	}

	public void stopServer(MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		// TODO Auto-generated method stub
	}
	
	public void performCIPreBuildStep(String jobName, MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		System.out.println("Just root method call ... ");
		// TODO Auto-generated method stub
	}
	
	private void generateMavenCommand(MavenProjectInfo mavenProjectInfo, String propertyTagName) throws PhrescoException {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(TEST_COMMAND);
			MavenProject project = mavenProjectInfo.getProject();
			String baseDir = project.getBasedir().getPath();
			String workingDirectory = project.getProperties().getProperty(propertyTagName);
			Commandline cl = new Commandline(sb.toString());

			if (StringUtils.isNotEmpty(workingDirectory)) {
				cl.setWorkingDirectory(baseDir + File.separator + workingDirectory);
			}
			Process pb = cl.execute();
			// Consume subprocess output and write to stdout for debugging
			InputStream is = new BufferedInputStream(pb.getInputStream());
			int singleByte = 0;
			while ((singleByte = is.read()) != -1) {
				//output.write(buffer, 0, bytesRead);
				System.out.write(singleByte);
			}
		} catch (CommandLineException e) {
			throw new PhrescoException(e);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void adaptTestConfig(File SelectedEnvFile, File resultConfigXml, String envName, String browser, String resolution) throws PhrescoException {
		try {
			ConfigManager configManager = new ConfigManagerImpl(SelectedEnvFile);
			List<com.photon.phresco.configuration.Configuration> configurations = configManager.getConfigurations(envName, "Server");
			for (com.photon.phresco.configuration.Configuration configuration : configurations) {
				updateTestConfiguration(envName, configuration, browser, resultConfigXml, resolution);
			}
        } catch (ConfigurationException e) {
			throw new PhrescoException(e);
		}
	}
	
	private void updateTestConfiguration(String envName, com.photon.phresco.configuration.Configuration configuration, String browser, File resultConfigXml, String resolution) throws PhrescoException {
	    try {
	    	ConfigManager configManager = new ConfigManagerImpl(resultConfigXml);
	    	Element createConfigElement = configManager.createConfigElement(configuration);
	    	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    	DocumentBuilder builder = factory.newDocumentBuilder();
	    	Document document = builder.parse(resultConfigXml);
	    	
	        Node configNode = getNode("environment", document);
	        Node node = getNode("environment/" + configuration.getType(), document);
	        Node browserNode = getNode("environment/Browser", document);
	        Node resolutionNode = getNode("environment/Resolution", document);
	        
	        if (node != null) {
	            configNode.removeChild(node);
	        }
	        
	        if (browserNode != null) {
	        	browserNode.setTextContent(browser);
	        } else {
	        	Element browserEle = document.createElement("Browser");
	        	browserEle.setTextContent(browser);
	        	configNode.appendChild(browserEle);
	        }
	        if (resolution != null) {
		        if (resolutionNode !=  null ) {
		        	resolutionNode.setTextContent(resolution);
		        } else {
		        	Element resolutiontag = document.createElement("Resolution");
		        	resolutiontag.setTextContent(resolution);
		        	configNode.appendChild(resolutiontag);
		        }
	        }
	        Node importNode = document.importNode(createConfigElement, Boolean.TRUE);
	        configNode.appendChild(importNode);
	        writeXml(new FileOutputStream(resultConfigXml), document);
        } catch (Exception e) {
        	e.printStackTrace();
            throw new PhrescoException("Configuration not found to delete");
        }
    }
	
	private Node getNode(String xpath, Document document) throws XPathExpressionException {
		XPathExpression xPathExpression = getXPath().compile(xpath);
		return (Node) xPathExpression.evaluate(document, XPathConstants.NODE);
	}
	
	private XPath getXPath() {
	    XPathFactory xPathFactory = XPathFactory.newInstance();
	    return xPathFactory.newXPath();	
	}
	
	protected void writeXml(OutputStream fos, Document document) throws PhrescoException, TransformerException ,IOException{
		try {
			TransformerFactory tFactory = TransformerFactory.newInstance();
			Transformer transformer = tFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

			Source src = new DOMSource(document);
			Result res = new StreamResult(fos);
			transformer.transform(src, res);
		} finally {
			if (fos != null) {
				fos.close();
			}
		}
	}
}
