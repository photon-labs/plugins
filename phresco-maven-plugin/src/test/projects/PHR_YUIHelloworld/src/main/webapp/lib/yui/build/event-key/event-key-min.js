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
YUI.add("event-key",function(g){var e="+alt",c="+ctrl",d="+meta",b="+shift",a=g.Lang.trim,f={KEY_MAP:{enter:13,esc:27,backspace:8,tab:9,pageup:33,pagedown:34},_typeRE:/^(up|down|press):/,_keysRE:/^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,processArgs:function(m){var p=m.splice(3,1)[0],o=g.Array.hash(p.match(/\+(?:alt|ctrl|meta|shift)\b/g)||[]),j={type:this._typeRE.test(p)?RegExp.$1:null,mods:o,keys:null},n=p.replace(this._keysRE,""),k,q,h,l;if(n){n=n.split(",");j.keys={};for(l=n.length-1;l>=0;--l){k=a(n[l]);if(!k){continue;}if(+k==k){j.keys[k]=o;}else{h=k.toLowerCase();if(this.KEY_MAP[h]){j.keys[this.KEY_MAP[h]]=o;if(!j.type){j.type="down";}}else{q=k.charAt(0).toUpperCase();h=h.charAt(0);j.keys[q.charCodeAt(0)]=(h!==q&&k===q)?g.merge(o,{"+shift":true}):o;}}}}if(!j.type){j.type="press";}return j;},on:function(n,k,m,j){var h=k._extra,i="key"+h.type,l=h.keys,o=(j)?"delegate":"on";k._detach=n[o](i,function(q){var p=l?l[q.keyCode]:h.mods;if(p&&(!p[e]||(p[e]&&q.altKey))&&(!p[c]||(p[c]&&q.ctrlKey))&&(!p[d]||(p[d]&&q.metaKey))&&(!p[b]||(p[b]&&q.shiftKey))){m.fire(q);}},j);},detach:function(j,h,i){h._detach.detach();}};f.delegate=f.on;f.detachDelegate=f.detach;g.Event.define("key",f,true);},"3.4.1",{requires:["event-synthetic"]});