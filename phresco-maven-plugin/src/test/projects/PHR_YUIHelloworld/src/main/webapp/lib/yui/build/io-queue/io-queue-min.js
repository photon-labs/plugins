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
YUI.add("io-queue",function(b){var c=b.io._map["io:0"]||new b.IO();b.mix(b.IO.prototype,{_q:new b.Queue(),_qActiveId:null,_qInit:false,_qState:1,_qShift:function(){var e=this,d=e._q.next();e._qActiveId=d.id;e._qState=0;e.send(d.uri,d.cfg,d.id);},queue:function(d,g){var f=this,e={uri:d,cfg:g,id:this._id++};if(!f._qInit){b.on("io:complete",function(i,h){f._qNext(i);},f);f._qInit=true;}f._q.add(e);if(f._qState===1){f._qShift();}return e;},_qNext:function(e){var d=this;d._qState=1;if(d._qActiveId===e&&d._q.size()>0){d._qShift();}},qPromote:function(d){this._q.promote(d);},qRemove:function(d){this._q.remove(d);},qStart:function(){var d=this;d._qState=1;if(d._q.size()>0){d._qShift();}},qStop:function(){this._qState=0;},qSize:function(){return this._q.size();}},true);function a(d,e){return c.queue.apply(c,[d,e]);}a.start=function(){c.qStart();};a.stop=function(){c.qStop();};a.promote=function(d){c.qPromote(d);};a.remove=function(d){c.qRemove(d);};a.size=function(){c.qSize();};b.io.queue=a;},"3.4.1",{requires:["io-base","queue-promote"]});