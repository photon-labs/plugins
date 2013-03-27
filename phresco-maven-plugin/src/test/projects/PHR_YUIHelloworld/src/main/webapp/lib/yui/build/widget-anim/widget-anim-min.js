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
YUI.add("widget-anim",function(c){var p="boundingBox",o="host",s="node",l="opacity",r="",k="visible",q="destroy",n="hidden",b="rendered",m="start",f="end",i="duration",d="animShow",j="animHide",a="_uiSetVisible",g="animShowChange",h="animHideChange";function e(t){e.superclass.constructor.apply(this,arguments);}e.NS="anim";e.NAME="pluginWidgetAnim";e.ANIMATIONS={fadeIn:function(){var v=this.get(o),t=v.get(p),u=new c.Anim({node:t,to:{opacity:1},duration:this.get(i)});if(!v.get(k)){t.setStyle(l,0);}u.on(q,function(){this.get(s).setStyle(l,(c.UA.ie)?1:r);});return u;},fadeOut:function(){return new c.Anim({node:this.get(o).get(p),to:{opacity:0},duration:this.get(i)});}};e.ATTRS={duration:{value:0.2},animShow:{valueFn:e.ANIMATIONS.fadeIn},animHide:{valueFn:e.ANIMATIONS.fadeOut}};c.extend(e,c.Plugin.Base,{initializer:function(t){this._bindAnimShow();this._bindAnimHide();this.after(g,this._bindAnimShow);this.after(h,this._bindAnimHide);this.beforeHostMethod(a,this._uiAnimSetVisible);},destructor:function(){this.get(d).destroy();this.get(j).destroy();},_uiAnimSetVisible:function(t){if(this.get(o).get(b)){if(t){this.get(j).stop();this.get(d).run();}else{this.get(d).stop();this.get(j).run();}return new c.Do.Prevent();}},_uiSetVisible:function(u){var t=this.get(o),v=t.getClassName(n);t.get(p).toggleClass(v,!u);},_bindAnimShow:function(){this.get(d).on(m,c.bind(function(){this._uiSetVisible(true);},this));},_bindAnimHide:function(){this.get(j).after(f,c.bind(function(){this._uiSetVisible(false);},this));}});c.namespace("Plugin").WidgetAnim=e;},"3.4.1",{requires:["plugin","anim-base","widget"]});