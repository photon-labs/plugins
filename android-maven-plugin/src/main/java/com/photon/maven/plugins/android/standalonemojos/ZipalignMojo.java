/**
 * Android Maven Plugin - android-maven-plugin
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
package com.photon.maven.plugins.android.standalonemojos;

import com.photon.maven.plugins.android.AbstractZipalignMojo;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;

/**
 * ZipalignMojo can run the zipalign command against the apk.
 *
 * @goal zipalign
 * @requiresProject false
 */
public class ZipalignMojo extends AbstractZipalignMojo {

    public void execute() throws MojoExecutionException, MojoFailureException {
    	
    	/* ZipalignMojo should not be called when we running any tests.
    	 * This if condition will skip the ZipalignMojo,
		 * When we are running the unit,functional and performance tests
		 * Added By - Hari - May, 20 , 2013
		 */
    	if (!baseDir.getPath().endsWith("unit")
				&& !baseDir.getPath().endsWith("functional")
				&& !baseDir.getPath().endsWith("performance")) {
    		
    		zipalign();
    	}
    }


}
