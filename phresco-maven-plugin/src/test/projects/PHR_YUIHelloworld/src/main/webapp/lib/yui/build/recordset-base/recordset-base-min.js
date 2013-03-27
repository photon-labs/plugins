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
YUI.add("recordset-base",function(e){var a=e.Base.create("record",e.Base,[],{_setId:function(){return e.guid();},initializer:function(){},destructor:function(){},getValue:function(f){if(f===undefined){return this.get("data");}else{return this.get("data")[f];}return null;}},{ATTRS:{id:{valueFn:"_setId"},data:{value:null}}});e.Record=a;var b=e.ArrayList,c=e.Lang,d=e.Base.create("recordset",e.Base,[],{initializer:function(){if(!this._items){this._items=[];}this.publish({add:{defaultFn:this._defAddFn},remove:{defaultFn:this._defRemoveFn},empty:{defaultFn:this._defEmptyFn},update:{defaultFn:this._defUpdateFn}});this._buildHashTable(this.get("key"));this.after(["recordsChange","add","remove","update","empty"],this._updateHash);},getRecord:function(f){if(c.isString(f)){return this.get("table")[f];}else{if(c.isNumber(f)){return this._items[f];}}return null;},getRecordByIndex:function(f){return this._items[f];},getRecordsByIndex:function(h,g){var j=0,f=[];g=(c.isNumber(g)&&(g>0))?g:1;for(;j<g;j++){f.push(this._items[h+j]);}return f;},getLength:function(){return this.size();},getValuesByKey:function(h){var g=0,f=this._items.length,j=[];for(;g<f;g++){j.push(this._items[g].getValue(h));}return j;},add:function(k,g){var j=[],f,h=0;f=(c.isNumber(g)&&(g>-1))?g:this._items.length;if(c.isArray(k)){for(;h<k.length;h++){j[h]=this._changeToRecord(k[h]);}}else{if(c.isObject(k)){j[0]=this._changeToRecord(k);}}this.fire("add",{added:j,index:f});return this;},remove:function(g,f){var h=[];g=(g>-1)?g:(this._items.length-1);f=(f>0)?f:1;h=this._items.slice(g,(g+f));this.fire("remove",{removed:h,range:f,index:g});return this;},empty:function(){this.fire("empty",{});return this;},update:function(j,g){var k,f,h=0;f=(!(c.isArray(j)))?[j]:j;k=this._items.slice(g,g+f.length);for(;h<f.length;h++){f[h]=this._changeToRecord(f[h]);}this.fire("update",{updated:f,overwritten:k,index:g});return this;},_defAddFn:function(f){this._items.splice.apply(this._items,[f.index,0].concat(f.added));},_defRemoveFn:function(f){this._items.splice(f.index,f.range||1);},_defUpdateFn:function(g){for(var f=0;f<g.updated.length;f++){this._items[g.index+f]=this._changeToRecord(g.updated[f]);}},_defEmptyFn:function(f){this._items=[];},_updateHash:function(i){var g="_hash",f=i.type.replace(/.*:/,""),h;g+=f.charAt(0).toUpperCase()+f.slice(1);h=this[g]&&this[g](this.get("table"),this.get("key"),i);if(h){this.set("table",h);}},_hashRecordsChange:function(h,f,g){return this._buildHashTable(f);},_buildHashTable:function(f){return this._hashAdd({},f,{added:this._items});},_hashAdd:function(l,j,k){var g=k.added,h,f;for(h=0,f=k.added.length;h<f;++h){l[g[h].get(j)]=g[h];}return l;},_hashRemove:function(j,g,h){for(var f=h.removed.length-1;f>=0;--f){delete j[h.removed[f].get(g)];}return j;},_hashUpdate:function(h,f,g){if(g.overwritten&&g.overwritten.length){h=this._hashRemove(h,f,{removed:g.overwritten});}return this._hashAdd(h,f,{added:g.updated});},_hashEmpty:function(){return{};},_initHashTable:function(){return this._hashAdd({},this.get("key"),{added:this._items||[]});},_changeToRecord:function(f){return(f instanceof e.Record)?f:new e.Record({data:f});},_setRecords:function(h){if(!e.Lang.isArray(h)){return e.Attribute.INVALID_VALUE;}var g=[],j,f;for(j=0,f=h.length;j<f;++j){g[j]=this._changeToRecord(h[j]);}return(this._items=g);}},{ATTRS:{records:{lazyAdd:false,getter:function(){return e.Array(this._items);},setter:"_setRecords"},table:{valueFn:"_initHashTable"},key:{value:"id",readOnly:true}}});e.augment(d,b);e.Recordset=d;},"3.4.1",{requires:["base","arraylist"]});