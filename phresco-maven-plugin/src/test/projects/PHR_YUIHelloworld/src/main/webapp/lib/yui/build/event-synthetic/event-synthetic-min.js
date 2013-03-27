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
YUI.add("event-synthetic",function(b){var j=b.Env.evt.dom_map,d=b.Array,i=b.Lang,l=i.isObject,c=i.isString,e=i.isArray,g=b.Selector.query,k=function(){};function h(n,m){this.handle=n;this.emitFacade=m;}h.prototype.fire=function(s){var t=d(arguments,0,true),q=this.handle,o=q.evt,m=q.sub,p=m.context,u=m.filter,n=s||{},r;if(this.emitFacade){if(!s||!s.preventDefault){n=o._getFacade();if(l(s)&&!s.preventDefault){b.mix(n,s,true);t[0]=n;}else{t.unshift(n);}}n.type=o.type;n.details=t.slice();if(u){n.container=o.host;}}else{if(u&&l(s)&&s.currentTarget){t.shift();}}m.context=p||n.currentTarget||o.host;r=o.fire.apply(o,t);m.context=p;return r;};function f(o,n,m){this.handles=[];this.el=o;this.key=m;this.domkey=n;}f.prototype={constructor:f,type:"_synth",fn:k,capture:false,register:function(m){m.evt.registry=this;this.handles.push(m);},unregister:function(p){var o=this.handles,n=j[this.domkey],m;for(m=o.length-1;m>=0;--m){if(o[m].sub===p){o.splice(m,1);break;}}if(!o.length){delete n[this.key];if(!b.Object.size(n)){delete j[this.domkey];}}},detachAll:function(){var n=this.handles,m=n.length;while(--m>=0){n[m].detach();}}};function a(){this._init.apply(this,arguments);}b.mix(a,{Notifier:h,SynthRegistry:f,getRegistry:function(s,r,p){var q=s._node,o=b.stamp(q),n="event:"+o+r+"_synth",m=j[o];if(p){if(!m){m=j[o]={};}if(!m[n]){m[n]=new f(q,o,n);}}return(m&&m[n])||null;},_deleteSub:function(n){if(n&&n.fn){var m=this.eventDef,o=(n.filter)?"detachDelegate":"detach";this.subscribers={};this.subCount=0;m[o](n.node,n,this.notifier,n.filter);this.registry.unregister(n);delete n.fn;delete n.node;delete n.context;}},prototype:{constructor:a,_init:function(){var m=this.publishConfig||(this.publishConfig={});this.emitFacade=("emitFacade" in m)?m.emitFacade:true;m.emitFacade=false;},processArgs:k,on:k,detach:k,delegate:k,detachDelegate:k,_on:function(s,t){var u=[],o=s.slice(),p=this.processArgs(s,t),q=s[2],m=t?"delegate":"on",n,r;n=(c(q))?g(q):d(q||b.one(b.config.win));if(!n.length&&c(q)){r=b.on("available",function(){b.mix(r,b[m].apply(b,o),true);},q);return r;}b.Array.each(n,function(w){var x=s.slice(),v;w=b.one(w);if(w){if(t){v=x.splice(3,1)[0];}x.splice(0,4,x[1],x[3]);if(!this.preventDups||!this.getSubs(w,s,null,true)){u.push(this._subscribe(w,m,x,p,v));}}},this);return(u.length===1)?u[0]:new b.EventHandle(u);},_subscribe:function(q,o,t,r,p){var v=new b.CustomEvent(this.type,this.publishConfig),s=v.on.apply(v,t),u=new h(s,this.emitFacade),n=a.getRegistry(q,this.type,true),m=s.sub;m.node=q;m.filter=p;if(r){this.applyArgExtras(r,m);}b.mix(v,{eventDef:this,notifier:u,host:q,currentTarget:q,target:q,el:q._node,_delete:a._deleteSub},true);s.notifier=u;n.register(s);this[o](q,m,u,p);return s;},applyArgExtras:function(m,n){n._extra=m;},_detach:function(o){var t=o[2],r=(c(t))?g(t):d(t),s,q,m,p,n;o.splice(2,1);for(q=0,m=r.length;q<m;++q){s=b.one(r[q]);if(s){p=this.getSubs(s,o);if(p){for(n=p.length-1;n>=0;--n){p[n].detach();}}}}},getSubs:function(o,u,n,q){var m=a.getRegistry(o,this.type),v=[],t,p,s,r;if(m){t=m.handles;if(!n){n=this.subMatch;}for(p=0,s=t.length;p<s;++p){r=t[p];if(n.call(this,r.sub,u)){if(q){return r;}else{v.push(t[p]);}}}}return v.length&&v;},subMatch:function(n,m){return !m[1]||n.fn===m[1];}}},true);b.SyntheticEvent=a;b.Event.define=function(o,n,q){var p,r,m;if(o&&o.type){p=o;q=n;}else{if(n){p=b.merge({type:o},n);}}if(p){if(q||!b.Node.DOM_EVENTS[p.type]){r=function(){a.apply(this,arguments);};b.extend(r,a,p);m=new r();o=m.type;b.Node.DOM_EVENTS[o]=b.Env.evt.plugins[o]={eventDef:m,on:function(){return m._on(d(arguments));},delegate:function(){return m._on(d(arguments),true);},detach:function(){return m._detach(d(arguments));}};}}else{if(c(o)||e(o)){b.Array.each(d(o),function(s){b.Node.DOM_EVENTS[s]=1;});}}return m;};},"3.4.1",{requires:["node-base","event-custom-complex"]});