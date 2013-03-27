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
(function(){var b,f=YUI.Env,d=YUI.config,g=d.doc,c=g&&g.documentElement,e="onreadystatechange",a=d.pollInterval||40;if(c.doScroll&&!f._ieready){f._ieready=function(){f._ready();};
/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(self!==self.top){b=function(){if(g.readyState=="complete"){f.remove(g,e,b);f.ieready();}};f.add(g,e,b);}else{f._dri=setInterval(function(){try{c.doScroll("left");clearInterval(f._dri);f._dri=null;f._ieready();}catch(h){}},a);}}})();YUI.add("event-base-ie",function(c){function h(){c.DOM2EventFacade.apply(this,arguments);}function i(n){var l=c.config.doc.createEventObject(n),m=i.prototype;l.hasOwnProperty=function(){return true;};l.init=m.init;l.halt=m.halt;l.preventDefault=m.preventDefault;l.stopPropagation=m.stopPropagation;l.stopImmediatePropagation=m.stopImmediatePropagation;c.DOM2EventFacade.apply(l,arguments);return l;}var a=c.config.doc&&c.config.doc.implementation,b=c.config.lazyEventFacade,j={0:1,4:2,2:3},d={mouseout:"toElement",mouseover:"fromElement"},k=c.DOM2EventFacade.resolve,f={init:function(){h.superclass.init.apply(this,arguments);var o=this._event,m,r,p,l,q,n;this.target=k(o.srcElement);if(("clientX" in o)&&(!m)&&(0!==m)){m=o.clientX;r=o.clientY;p=c.config.doc;l=p.body;q=p.documentElement;m+=(q.scrollLeft||(l&&l.scrollLeft)||0);r+=(q.scrollTop||(l&&l.scrollTop)||0);this.pageX=m;this.pageY=r;}if(o.type=="mouseout"){n=o.toElement;}else{if(o.type=="mouseover"){n=o.fromElement;}}this.relatedTarget=k(n||o.relatedTarget);if(o.button!==undefined){this.which=this.button=j[o.button]||o.button;}},stopPropagation:function(){this._event.cancelBubble=true;this._wrapper.stopped=1;this.stopped=1;},stopImmediatePropagation:function(){this.stopPropagation();this._wrapper.stopped=2;this.stopped=2;},preventDefault:function(e){this._event.returnValue=e||false;this._wrapper.prevented=1;this.prevented=1;}};c.extend(h,c.DOM2EventFacade,f);c.extend(i,c.DOM2EventFacade,f);i.prototype.init=function(){var l=this._event,m=this._wrapper.overrides,p=i._define,o=i._lazyProperties,n;this.altKey=l.altKey;this.ctrlKey=l.ctrlKey;this.metaKey=l.metaKey;this.shiftKey=l.shiftKey;this.type=(m&&m.type)||l.type;this.clientX=l.clientX;this.clientY=l.clientY;for(n in o){if(o.hasOwnProperty(n)){p(this,n,o[n]);}}if(this._touch){this._touch(l,this._currentTarget,this._wrapper);}};i._lazyProperties={charCode:function(){var l=this._event;return l.keyCode||l.charCode;},keyCode:function(){return this.charCode;},button:function(){var l=this._event;return(l.button!==undefined)?(j[l.button]||l.button):(l.which||l.charCode||this.charCode);},which:function(){return this.button;},target:function(){return k(this._event.srcElement);},relatedTarget:function(){var m=this._event,l=d[m.type]||"relatedTarget";return k(m[l]||m.relatedTarget);},currentTarget:function(){return k(this._currentTarget);},wheelDelta:function(){var l=this._event;if(l.type==="mousewheel"||l.type==="DOMMouseScroll"){return(l.detail)?(l.detail*-1):Math.round(l.wheelDelta/80)||((l.wheelDelta<0)?-1:1);}},pageX:function(){var n=this._event,p=n.pageX,m,o,l;if(p===undefined){m=c.config.doc;o=m.body&&m.body.scrollLeft;l=m.documentElement.scrollLeft;p=n.clientX+(l||o||0);}return p;},pageY:function(){var n=this._event,p=n.pageY,m,o,l;if(p===undefined){m=c.config.doc;o=m.body&&m.body.scrollTop;l=m.documentElement.scrollTop;p=n.clientY+(l||o||0);}return p;}};i._define=function(m,n,e){function l(o){var p=(arguments.length)?o:e.call(this);delete m[n];Object.defineProperty(m,n,{value:p,configurable:true,writable:true});return p;}Object.defineProperty(m,n,{get:l,set:l,configurable:true});};if(a&&(!a.hasFeature("Events","2.0"))){if(b){try{Object.defineProperty(c.config.doc.createEventObject(),"z",{});}catch(g){b=false;}}c.DOMEventFacade=(b)?i:h;}},"3.4.1",{after:["event-base"],requires:["node-base"]});