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
YUI.add("widget-child",function(c){var b=c.Lang;function a(){c.after(this._syncUIChild,this,"syncUI");c.after(this._bindUIChild,this,"bindUI");}a.ATTRS={selected:{value:0,validator:b.isNumber},index:{readOnly:true,getter:function(){var e=this.get("parent"),d=-1;if(e){d=e.indexOf(this);}return d;}},parent:{readOnly:true},depth:{readOnly:true,getter:function(){var e=this.get("parent"),d=this.get("root"),f=-1;while(e){f=(f+1);if(e==d){break;}e=e.get("parent");}return f;}},root:{readOnly:true,getter:function(){var d=function(h){var e=h.get("parent"),f=h.ROOT_TYPE,g=e;if(f){g=(e&&c.instanceOf(e,f));}return(g?d(e):h);};return d(this);}}};a.prototype={ROOT_TYPE:null,_getUIEventNode:function(){var d=this.get("root"),e;if(d){e=d.get("boundingBox");}return e;},next:function(f){var e=this.get("parent"),d;if(e){d=e.item((this.get("index")+1));}if(!d&&f){d=e.item(0);}return d;},previous:function(g){var f=this.get("parent"),d=this.get("index"),e;if(f&&d>0){e=f.item([(d-1)]);}if(!e&&g){e=f.item((f.size()-1));}return e;},remove:function(d){var e,f;if(b.isNumber(d)){f=c.WidgetParent.prototype.remove.apply(this,arguments);}else{e=this.get("parent");if(e){f=e.remove(this.get("index"));}}return f;},isRoot:function(){return(this==this.get("root"));},ancestor:function(f){var d=this.get("root"),e;if(this.get("depth")>f){e=this.get("parent");while(e!=d&&e.get("depth")>f){e=e.get("parent");}}return e;},_uiSetChildSelected:function(e){var f=this.get("boundingBox"),d=this.getClassName("selected");if(e===0){f.removeClass(d);}else{f.addClass(d);}},_afterChildSelectedChange:function(d){this._uiSetChildSelected(d.newVal);},_syncUIChild:function(){this._uiSetChildSelected(this.get("selected"));},_bindUIChild:function(){this.after("selectedChange",this._afterChildSelectedChange);}};c.WidgetChild=a;},"3.4.1",{requires:["base-build","widget"]});