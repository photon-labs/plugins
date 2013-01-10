package com.photon.phresco.plugins.wordpress;

import java.io.File;
import java.io.IOException;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.logging.Log;
import org.codehaus.plexus.util.FileUtils;

import com.photon.phresco.exception.PhrescoException;
import com.photon.phresco.plugin.commons.MavenProjectInfo;
import com.photon.phresco.plugins.PhrescoBasePlugin;
import com.photon.phresco.plugins.model.Mojos.Mojo.Configuration;

public class WordPressPlugin extends PhrescoBasePlugin {

	public WordPressPlugin(Log log) {
		super(log);
	}

	@Override
	public void pack(Configuration configuration,
			MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		Package pack = new Package();
		pack.pack(configuration, mavenProjectInfo, getLog());
	}

	@Override
	public void compile(MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		try {
			File targetDir = new File(mavenProjectInfo.getBaseDir() + DO_NOT_CHECKIN_FOLDER + File.separator + TARGET);
			if (targetDir.exists()) {
				FileUtils.deleteDirectory(targetDir);
				log.info("Target Folder Deleted Successfully");
			}
			WordPressCompile wordpresscompile = new WordPressCompile();
			wordpresscompile.compile(mavenProjectInfo, getLog());
		} catch (IOException e) {
			throw new PhrescoException(e);
		} catch (MojoExecutionException e) {
			throw new PhrescoException(e);
		}
	}

	@Override
	public void deploy(Configuration configuration,
			MavenProjectInfo mavenProjectInfo) throws PhrescoException {
		Deploy deploy = new Deploy();
		deploy.deploy(configuration, mavenProjectInfo, getLog());
	}
}
