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
YUI.add("dataschema-array",function(c){var a=c.Lang,b={apply:function(f,g){var d=g,e={results:[],meta:{}};if(a.isArray(d)){if(f&&a.isArray(f.resultFields)){e=b._parseResults.call(this,f.resultFields,d,e);}else{e.results=d;}}else{e.error=new Error("Array schema parse failure");}return e;},_parseResults:function(h,m,d){var g=[],q,p,k,l,o,n,f,e;for(f=m.length-1;f>-1;f--){q={};p=m[f];k=(a.isObject(p)&&!a.isFunction(p))?2:(a.isArray(p))?1:(a.isString(p))?0:-1;if(k>0){for(e=h.length-1;e>-1;e--){l=h[e];o=(!a.isUndefined(l.key))?l.key:l;n=(!a.isUndefined(p[o]))?p[o]:p[e];q[o]=c.DataSchema.Base.parse.call(this,n,l);}}else{if(k===0){q=p;}else{q=null;}}g[f]=q;}d.results=g;return d;}};c.DataSchema.Array=c.mix(b,c.DataSchema.Base);},"3.4.1",{requires:["dataschema-base"]});