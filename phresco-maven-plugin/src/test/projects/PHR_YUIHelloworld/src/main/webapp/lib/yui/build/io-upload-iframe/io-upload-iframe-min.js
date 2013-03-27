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
YUI.add("io-upload-iframe",function(g){var b=g.config.win,f=g.config.doc,c=(f.documentMode&&f.documentMode>=8),a=decodeURIComponent;function h(j,l,k){var d=g.Node.create('<iframe id="io_iframe'+j.id+'" name="io_iframe'+j.id+'" />');d._node.style.position="absolute";d._node.style.top="-1000px";d._node.style.left="-1000px";g.one("body").appendChild(d);g.on("load",function(){k._uploadComplete(j,l);},"#io_iframe"+j.id);}function e(d){g.Event.purgeElement("#io_iframe"+d,false);g.one("body").removeChild(g.one("#io_iframe"+d));}g.mix(g.IO.prototype,{_addData:function(p,n){if(g.Lang.isObject(n)){n=g.QueryString.stringify(n);}var q=[],d=n.split("="),k,j;for(k=0,j=d.length-1;k<j;k++){q[k]=f.createElement("input");q[k].type="hidden";q[k].name=a(d[k].substring(d[k].lastIndexOf("&")+1));q[k].value=(k+1===j)?a(d[k+1]):a(d[k+1].substring(0,(d[k+1].lastIndexOf("&"))));p.appendChild(q[k]);}return q;},_removeData:function(k,m){var j,d;for(j=0,d=m.length;j<d;j++){k.removeChild(m[j]);}},_setAttrs:function(i,j,d){i.setAttribute("action",d);i.setAttribute("method","POST");i.setAttribute("target","io_iframe"+j);i.setAttribute(g.UA.ie&&!c?"encoding":"enctype","multipart/form-data");},_resetAttrs:function(i,d){g.Object.each(d,function(j,k){if(j){i.setAttribute(k,j);}else{i.removeAttribute(k);}});},_startTimeout:function(d,j){var i=this;i._timeout[d.id]=b.setTimeout(function(){d.status=0;d.statusText="timeout";i.complete(d,j);i.end(d,j);},j.timeout);},_clearTimeout:function(i){var d=this;b.clearTimeout(d._timeout[i]);delete d._timeout[i];},_uploadComplete:function(m,q){var n=this,l=g.one("#io_iframe"+m.id).get("contentWindow.document"),i=l.one("body"),k;if(q.timeout){n._clearTimeout(m.id);}try{if(i){k=i.one("pre:first-child");m.c.responseText=k?k.get("text"):i.get("text");}else{m.c.responseXML=l._node;}}catch(j){m.e="upload failure";}n.complete(m,q);n.end(m,q);b.setTimeout(function(){e(m.id);},0);},_upload:function(l,j,n){var m=this,k=(typeof n.form.id==="string")?f.getElementById(n.form.id):n.form.id,i={action:k.getAttribute("action"),target:k.getAttribute("target")},d;m._setAttrs(k,l.id,j);if(n.data){d=m._addData(k,n.data);}if(n.timeout){m._startTimeout(l,n);}k.submit();m.start(l,n);if(n.data){m._removeData(k,d);}m._resetAttrs(k,i);return{id:l.id,abort:function(){l.status=0;l.statusText="abort";if(g.one("#io_iframe"+l.id)){e(l.id);m.complete(l,n);m.end(l,n);}else{return false;}},isInProgress:function(){return g.one("#io_iframe"+l.id)?true:false;},io:m};},upload:function(i,d,j){h(i,j,this);return this._upload(i,d,j);}});},"3.4.1",{requires:["io-base","node-base"]});