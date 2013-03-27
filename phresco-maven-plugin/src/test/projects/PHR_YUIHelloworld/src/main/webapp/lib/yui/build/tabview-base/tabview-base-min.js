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
YUI.add("tabview-base",function(b){var c=b.ClassNameManager.getClassName,f="tabview",k="tab",l="content",j="panel",g="selected",h={},i=".",d={tabview:c(f),tabviewPanel:c(f,j),tabviewList:c(f,"list"),tab:c(k),tabLabel:c(k,"label"),tabPanel:c(k,j),selectedTab:c(k,g),selectedPanel:c(k,j,g)},e={tabview:i+d.tabview,tabviewList:"> ul",tab:"> ul > li",tabLabel:"> ul > li > a ",tabviewPanel:"> div",tabPanel:"> div > div",selectedTab:"> ul > "+i+d.selectedTab,selectedPanel:"> div "+i+d.selectedPanel},a=function(m){this.init.apply(this,arguments);};a.NAME="tabviewBase";a._queries=e;a._classNames=d;b.mix(a.prototype,{init:function(m){m=m||h;this._node=m.host||b.one(m.node);this.refresh();},initClassNames:function(m){b.Object.each(e,function(p,o){if(d[o]){var n=this.all(p);if(m!==undefined){n=n.item(m);}if(n){n.addClass(d[o]);}}},this._node);this._node.addClass(d.tabview);},_select:function(n){var q=this._node,r=q.one(e.selectedTab),p=q.one(e.selectedPanel),o=q.all(e.tab).item(n),m=q.all(e.tabPanel).item(n);if(r){r.removeClass(d.selectedTab);}if(p){p.removeClass(d.selectedPanel);}if(o){o.addClass(d.selectedTab);}if(m){m.addClass(d.selectedPanel);}},initState:function(){var n=this._node,o=n.one(e.selectedTab),m=o?n.all(e.tab).indexOf(o):0;this._select(m);},_scrubTextNodes:function(){this._node.one(e.tabviewList).get("childNodes").each(function(m){if(m.get("nodeType")===3){m.remove();}});},refresh:function(){this._scrubTextNodes();this.initClassNames();this.initState();this.initEvents();},tabEventName:"click",initEvents:function(){this._node.delegate(this.tabEventName,this.onTabEvent,e.tab,this);},onTabEvent:function(m){m.preventDefault();this._select(this._node.all(e.tab).indexOf(m.currentTarget));},destroy:function(){this._node.detach(this.tabEventName);}});b.TabviewBase=a;},"3.4.1",{requires:["node-event-delegate","classnamemanager","skin-sam-tabview"]});