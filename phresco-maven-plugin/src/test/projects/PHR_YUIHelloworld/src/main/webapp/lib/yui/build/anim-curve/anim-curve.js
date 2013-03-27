/*
 * Phresco Maven Plugin
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
/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('anim-curve', function(Y) {

/**
 * Adds support for the <code>curve</code> property for the <code>to</code> 
 * attribute.  A curve is zero or more control points and an end point.
 * @module anim
 * @submodule anim-curve
 */

Y.Anim.behaviors.curve = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        from = from.slice.call(from);
        to = to.slice.call(to);
        var t = fn(elapsed, 0, 100, duration) / 100;
        to.unshift(from);
        anim._node.setXY(Y.Anim.getBezier(to, t));
    },

    get: function(anim, att) {
        return anim._node.getXY();
    }
};

/**
 * Get the current position of the animated element based on t.
 * Each point is an array of "x" and "y" values (0 = x, 1 = y)
 * At least 2 points are required (start and end).
 * First point is start. Last point is end.
 * Additional control points are optional.     
 * @for Anim
 * @method getBezier
 * @static
 * @param {Array} points An array containing Bezier points
 * @param {Number} t A number between 0 and 1 which is the basis for determining current position
 * @return {Array} An array containing int x and y member data
 */
Y.Anim.getBezier = function(points, t) {  
    var n = points.length;
    var tmp = [];

    for (var i = 0; i < n; ++i){
        tmp[i] = [points[i][0], points[i][1]]; // save input
    }
    
    for (var j = 1; j < n; ++j) {
        for (i = 0; i < n - j; ++i) {
            tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
            tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; 
        }
    }

    return [ tmp[0][0], tmp[0][1] ]; 

};


}, '3.4.1' ,{requires:['anim-xy']});
