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
YUI.add("selector-native",function(a){(function(e){e.namespace("Selector");var c="compareDocumentPosition",d="ownerDocument";var b={_foundCache:[],useNative:true,_compare:("sourceIndex" in e.config.doc.documentElement)?function(i,h){var g=i.sourceIndex,f=h.sourceIndex;if(g===f){return 0;}else{if(g>f){return 1;}}return -1;}:(e.config.doc.documentElement[c]?function(g,f){if(g[c](f)&4){return -1;}else{return 1;}}:function(j,i){var h,f,g;if(j&&i){h=j[d].createRange();h.setStart(j,0);f=i[d].createRange();f.setStart(i,0);g=h.compareBoundaryPoints(1,f);}return g;}),_sort:function(f){if(f){f=e.Array(f,0,true);if(f.sort){f.sort(b._compare);}}return f;},_deDupe:function(f){var g=[],h,j;for(h=0;(j=f[h++]);){if(!j._found){g[g.length]=j;j._found=true;}}for(h=0;(j=g[h++]);){j._found=null;j.removeAttribute("_found");}return g;},query:function(g,o,p,f){o=o||e.config.doc;var l=[],h=(e.Selector.useNative&&e.config.doc.querySelector&&!f),k=[[g,o]],m,q,j,n=(h)?e.Selector._nativeQuery:e.Selector._bruteQuery;if(g&&n){if(!f&&(!h||o.tagName)){k=b._splitQueries(g,o);}for(j=0;(m=k[j++]);){q=n(m[0],m[1],p);if(!p){q=e.Array(q,0,true);}if(q){l=l.concat(q);}}if(k.length>1){l=b._sort(b._deDupe(l));}}return(p)?(l[0]||null):l;},_splitQueries:function(h,l){var g=h.split(","),j=[],m="",k,f;if(l){if(l.tagName){l.id=l.id||e.guid();m='[id="'+l.id+'"] ';}for(k=0,f=g.length;k<f;++k){h=m+g[k];j.push([h,l]);}}return j;},_nativeQuery:function(f,g,h){if(e.UA.webkit&&f.indexOf(":checked")>-1&&(e.Selector.pseudos&&e.Selector.pseudos.checked)){return e.Selector.query(f,g,h,true);}try{return g["querySelector"+(h?"":"All")](f);}catch(i){return e.Selector.query(f,g,h,true);}},filter:function(g,f){var h=[],j,k;if(g&&f){for(j=0;(k=g[j++]);){if(e.Selector.test(k,f)){h[h.length]=k;}}}else{}return h;},test:function(h,k,p){var n=false,f=false,g,q,t,o,s,m,l,r;if(h&&h.tagName){if(typeof k=="function"){n=k.call(h,h);}else{g=k.split(",");if(!p&&!e.DOM.inDoc(h)){q=h.parentNode;if(q){p=q;}else{s=h[d].createDocumentFragment();s.appendChild(h);p=s;f=true;}}p=p||h[d];if(!h.id){h.id=e.guid();}for(m=0;(r=g[m++]);){r+='[id="'+h.id+'"]';o=e.Selector.query(r,p);for(l=0;t=o[l++];){if(t===h){n=true;break;}}if(n){break;}}if(f){s.removeChild(h);}}}return n;},ancestor:function(g,f,h){return e.DOM.ancestor(g,function(i){return e.Selector.test(i,f);},h);}};e.mix(e.Selector,b,true);})(a);},"3.4.1",{requires:["dom-base"]});