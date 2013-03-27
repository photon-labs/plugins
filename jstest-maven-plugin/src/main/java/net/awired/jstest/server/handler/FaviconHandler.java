/**
 * JsTest Maven Plugin
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
package net.awired.jstest.server.handler;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Request;
import com.google.common.io.ByteStreams;

public class FaviconHandler {

    private static final String FAVICON = "/favicon.ico";
    private static final String FAVICON_SUCCESS = "/favicon-success.ico";
    private static final String FAVICON_ERROR = "/favicon-error.ico";
    private static final String FAVICON_FAIL = "/favicon-fail.ico";
    private static final String[] FAVICONS = new String[] { FAVICON, FAVICON_ERROR, FAVICON_FAIL, FAVICON_SUCCESS };

    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        for (String favicons : FAVICONS) {
            if (favicons.equals(target)) {
                response.setStatus(HttpServletResponse.SC_OK);
                baseRequest.setHandled(true);
                ByteStreams.copy(getClass().getResourceAsStream(favicons), response.getOutputStream());
            }
        }
    }
}
