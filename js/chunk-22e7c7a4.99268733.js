(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22e7c7a4"],{"0921":function(e,t,i){"use strict";var s=i("3115"),a=i("025e"),o=(i("5bc0"),i("c320")),n=i("9d47"),r=i("21bc"),l=i("0af5"),d=i("a2e1"),h=i("5eee"),c=i("a2c7"),p=i("256f"),u=i("480c"),m=i("3e6b"),g=i("5831"),w=i("d0e9"),f=(i("1399"),i("0417")),y=i("3900");class v{constructor(){this.createHtml(),this.loading=0,this.loaded=0}addLoading(){this.loading++,this.update()}addLoaded(){this.loaded++,this.update()}update(){var e=(this.loaded/this.loading*100).toFixed(1)+"%";this.label.innerText="Loading Tiles ("+e+")",this.progressBarInner.style.width=e,this.loading===this.loaded&&(this.loading=0,this.loaded=0),this.el.style.opacity=this.show()?1:0}show(){return this.loading>0&&this.loaded<=this.loading}createHtml(){this.el=document.createElement("div"),this.el.className="ol-unselectable ol-progress-control",this.progressBar=document.createElement("div"),this.progressBar.className="progress-bar",this.progressBarInner=document.createElement("div"),this.progressBarInner.className="progress-bar-inner",this.progressBar.appendChild(this.progressBarInner),this.label=document.createElement("div"),this.label.className="progress-label",this.el.appendChild(this.progressBar),this.el.appendChild(this.label)}getControl(){var e=new y["a"]({element:this.el});return e}}var b,L,x={mixins:[s["a"]],props:{id:{type:String,required:!0},center:{type:Array,default:()=>[0,0]},zoom:{type:Number,default:1},show:{type:Boolean,default:!0},editable:{type:Boolean,default:!0},removableLayers:{type:Boolean,default:!1}},data(){return{map:null,baseLayer:null,osm:null,progress:null,fitOptions:{padding:[30,30,30,30]}}},watch:{show(){this.showMap()}},mounted(){this.showMap()},methods:{showMap(){this.show&&this.$nextTick(()=>this.renderMap())},createMap(e=!1,t="EPSG:3857"){if(null!==this.map)return this.map.updateSize(),void this.map.render();this.progress=new v,this.osm=new w["a"],this.baseLayer=new u["a"]({source:this.trackTileProgress(this.osm),baseLayer:!0,title:"OpenStreetMap",noSwitcherDelete:!0});var i=[new o["a"],new n["a"],this.progress.getControl()];e&&i.push(new f["a"]({trash:this.removableLayers}));let s=[this.center[1],this.center[0]];var a={target:this.id,layers:[this.baseLayer],view:new c["a"]({center:"EPSG:3857"===t?Object(p["d"])(s):s,zoom:this.zoom,showFullExtent:!0,projection:t})};this.editable?a.controls=Object(r["a"])().extend(i):(a.interactions=[],a.controls=i),this.map=new h["a"](a),this.listen("windowResized",this.updateMapSize)},fromLonLat(e){return this.map&&"EPSG:3857"===this.map.getView().getProjection().getCode()?Object(p["d"])(e):e},onShow(){this.listen("windowResized",this.updateMapSize)},onHide(){this.unlisten("windowResized")},renderMap(){this.createMap()},async updateMapSize(){this.map&&(await this.$nextTick(),this.map.updateSize())},getVisibleLayers(){let e=[],t=this.map.getLayers().getArray();for(let i of t)i.get("userLayer")&&i.getVisible()&&e.push(i);return e},addGeoJson(e){var t={};a["a"].detectGeoJson(e)&&(t.features=(new d["a"]).readFeatures(e,{featureProjection:this.osm.getProjection()}));var i=new g["a"](t),s=new m["a"]({title:"GeoJSON",source:i});this.map.addLayer(s);var o=i.getExtent();return Object(l["G"])(o)||this.map.getView().fit(o,this.fitOptions),s},trackTileProgress(e){return e.on("tileloadstart",()=>{this.progress.addLoading()}),e.on("tileloadend",()=>{this.progress.addLoaded()}),e.on("tileloaderror",()=>{this.progress.addLoaded()}),e}}},M=x,S=i("2877"),C=Object(S["a"])(M,b,L,!1,null,null,null);t["a"]=C.exports},2930:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"modal",style:{"z-index":e.zIndex},on:{mousedown:e.backgroundClose}},[i("div",{ref:"container",staticClass:"modal-container",style:e.style},[i("header",{staticClass:"modal-header",on:{mousedown:function(t){return t.preventDefault(),t.stopPropagation(),e.startMove.apply(null,arguments)}}},[e._t("header",(function(){return[i("h2",[e._v(e._s(e.title))]),i("span",{staticClass:"close",on:{click:e.close}},[i("i",{staticClass:"fa fa-times",attrs:{"aria-hidden":"true"}})])]}))],2),i("main",{staticClass:"modal-content"},[e._t("default")],2),i("footer",{staticClass:"modal-footer"},[e._t("footer")],2)])])},a=[],o=i("3115"),n=i("025e"),r={name:"Modal",mixins:[o["a"]],props:{title:{type:String,default:null},minWidth:{type:String,default:"30%"},maxWidth:{type:String,default:"85%"},minHeight:{type:String,default:"auto"},show:{type:Boolean,default:!0}},data(){return{zIndex:1e3,position:null,dragPosition:null}},computed:{...n["a"].mapState("editor",["hightestModalZIndex"]),style(){let e={"min-width":this.minWidth,"max-width":this.maxWidth,"min-height":this.minHeight};return Array.isArray(this.position)&&(e.position="absolute",e.left=this.position[0]+"px",e.top=this.position[1]+"px"),e}},watch:{show:{immediate:!0,handler(e){e?this.open():this.close()}}},methods:{...n["a"].mapMutations("editor",["openModal","closeModal"]),open(){this.openModal(),this.zIndex=this.hightestModalZIndex,window.addEventListener("keydown",this.escCloseListener),this.$emit("shown")},close(){window.removeEventListener("keydown",this.escCloseListener),this.closeModal(),this.$emit("closed")},startMove(e){this.dragPosition=[e.clientX,e.clientY],document.addEventListener("mousemove",this.move),document.addEventListener("mouseup",this.stopMove)},stopMove(){document.removeEventListener("mousemove",this.move),document.removeEventListener("mouseup",this.stopMove)},move(e){e.preventDefault(),this.position=[this.$refs.container.offsetLeft-(this.dragPosition[0]-e.clientX),this.$refs.container.offsetTop-(this.dragPosition[1]-e.clientY)],this.dragPosition=[e.clientX,e.clientY]},escCloseListener(e){if("Escape"==e.key)return this.close(),e.preventDefault(),e.stopPropagation(),!1},backgroundClose(e){e.target===this.$el&&this.close()}}},l=r,d=(i("8781"),i("2877")),h=Object(d["a"])(l,s,a,!1,null,null,null);t["a"]=h.exports},"2f8f":function(e,t,i){"use strict";i("af41")},"6b1e":function(e,t,i){},8295:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("Modal",{attrs:{minWidth:"80%",title:e.collection.id},on:{closed:function(t){return e.$emit("closed")}}},[i("div",{staticClass:"docgen"},[i("Collection",{attrs:{data:e.collection},scopedSlots:e._u([{key:"spatial-extents",fn:function(t){return[t.worldwide?i("span",{staticClass:"worldwide"},[i("i",{staticClass:"fas fa-globe"}),e._v(" Worldwide")]):i("MapViewer",{staticClass:"map",attrs:{id:"collectionMap",show:e.showMap,extents:t.extents}})]}}])}),e.currentItems?i("section",[i("Items",{attrs:{items:e.currentItems},scopedSlots:e._u([{key:"item-location",fn:function(e){return[i("MapViewer",{attrs:{id:String(Date.now()),geoJson:e.geometry}})]}}],null,!1,3894742568)}),i("div",{staticClass:"pagination"},[i("button",{attrs:{title:"Previous page",disabled:!e.hasPrevItems},on:{click:function(t){return e.paginate(-1)}}},[i("i",{staticClass:"fas fa-arrow-left"}),e._v(" Previous Page")]),i("button",{attrs:{title:"Next page",disabled:!e.hasNextItems},on:{click:function(t){return e.paginate(1)}}},[e._v("Next Page "),i("i",{staticClass:"fas fa-arrow-right"})])])],1):e._e()],1)])},a=[],o=i("a5c1"),n=i("2930"),r=i("47ed"),l=i("025e"),d={name:"CollectionModal",components:{MapViewer:o["default"],Modal:n["a"],Collection:r["default"],Items:()=>i.e("chunk-27a37ce8").then(i.bind(null,"d25f"))},data(){return{showMap:!1,items:[],itemsPage:0,itemsIterator:null}},props:{collection:{type:Object}},computed:{...l["a"].mapState(["connection"]),...l["a"].mapGetters(["supports"]),bbox(){try{return this.collection.extent.spatial.bbox[0]}catch(e){return null}},currentItems(){return this.items.length>=this.itemsPage?this.items[this.itemsPage]:null},hasPrevItems(){return this.itemsPage>0},hasNextItems(){return this.itemsPage<this.items.length-1}},async mounted(){this.$nextTick(()=>{this.showMap=!0}),this.supports("listCollectionItems")&&(await this.nextItems(),this.nextItems())},methods:{async paginate(e){if(e>0)await this.nextItems();else if(0===this.itemsPage&&e<0)return;this.itemsPage+=e},async nextItems(){this.itemsIterator||(this.itemsIterator=await this.connection.listCollectionItems(this.collection.id));let e=await this.itemsIterator.next();e&&e.value&&!e.done&&this.items.push(e.value)}}},h=d,c=(i("2f8f"),i("2877")),p=Object(c["a"])(h,s,a,!1,null,null,null);t["default"]=p.exports},8781:function(e,t,i){"use strict";i("6b1e")},"90b4":function(e,t,i){},"991b":function(e,t,i){"use strict";i("90b4")},a5c1:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:e.id}})},a=[],o=i("0921"),n=i("025e"),r=i("e300"),l=i("4cdf"),d=i("9c78"),h=i("5bc3"),c=i("480c"),p=i("6cf3"),u=i("3e6b"),m=i("5831"),g=i("2ef1"),w=i("2278"),f=i("d510"),y=(i("7505"),i("cfd3")),v=(i("6601"),i("457f")),b={name:"MapViewer",mixins:[o["a"]],props:{extents:{type:Array,default:()=>null},geoJson:{type:Object,default:()=>null}},data(){return{WMTSCapabilities:{},swipe:{control:null,left:null,right:null},timeline:null}},methods:{renderMap(){let e=Array.isArray(this.extents)&&this.extents.length>0;if(this.createMap(!e),e)for(let s of this.extents){var t=n["a"].extentToBBox(s);this.addRectangle(t.west,t.east,t.north,t.south)}n["a"].isObject(this.geoJson)&&(this.geoJsonLayer=this.addGeoJson(this.geoJson));let i=this.map.getLayers();i.on("add",()=>this.toggleSwipeControl()),i.on("remove",()=>this.toggleSwipeControl()),this.$listeners&&this.$listeners.drop&&(this.map.getViewport().addEventListener("dragover",e=>e.preventDefault()),this.map.getViewport().addEventListener("drop",this.$listeners.drop))},addRectangle(e,t,i,s){let a=[...this.fromLonLat([e,s]),...this.fromLonLat([t,i])],o=new u["a"]({title:"Extent",displayInLayerSwitcher:!1,source:new m["a"]({features:[new l["a"](Object(h["c"])(a))],projection:"EPSG:4326",wrapX:!1})});this.map.addLayer(o),this.map.getView().fit(a,this.fitOptions)},async showWebService(e){switch(e.type.toLowerCase()){case"xyz":this.updateXYZLayer(e);break;case"wmts":await this.updateWMTSLayer(e);break;default:n["a"].error(this,"Sorry, the service type is not supported by the map.")}},toggleSwipeControl(){var e=this.getVisibleLayers();2===e.length?(null===this.swipe.control&&(this.swipe.control=new y["a"],this.map.addControl(this.swipe.control)),this.swipe.left!==e[0]&&(this.swipe.control.addLayer(e[0]),this.swipe.left=e[0]),this.swipe.right!==e[1]&&(this.swipe.control.addLayer(e[1],!0),this.swipe.right=e[1])):(this.map.removeControl(this.swipe.control),this.swipe.control=null,this.swipe.left=null,this.swipe.right=null)},addLayerToMap(e){e.set("userLayer",!0),this.map.addLayer(e),e.on("change",()=>this.toggleSwipeControl()),e.on("change:visible",()=>this.toggleSwipeControl()),e.on("change:zIndex",()=>this.toggleSwipeControl())},removeLayerFromMap(e){let t=this.getLayerFromMap(e);t&&this.map.removeLayer(t)},getLayerFromMap(e){let t=this.map.getLayers().getArray();for(let i of t)if(i.get("id")===e)return i;return null},updateGeoTiffLayer(e,t=null){var i=new c["a"]({id:e,title:t||"GeoTiff",source:new p["a"]({url:"http://tiles.rdnt.io/tiles?url="+encodeURIComponent(e),crossOrigin:"anonymous"})});return this.addLayerToMap(i),i},async addCollection(e){let t=n["a"].getPreviewLinkFromSTAC(e);t||n["a"].error(this,"No visualizations found for collection");let i,s={id:e.id,url:t.href,title:e.title||e.id};switch(this.map.getLayers().forEach(e=>{e.get("previewLayer")&&e.get("id")!==s.id&&this.map.removeLayer(e)}),t.rel.toLowerCase()){case"xyz":i=this.updateXYZLayer(s);break;case"wmts":let e=[];t["wmts:layer"]&&e.push(t["wmts:layer"]),i=await this.updateWMTSLayer(s,e);break;default:return void n["a"].error(this,"Sorry, the service type is not supported by the map.")}i.set("previewLayer",!0);try{let t=n["a"].extentToBBox(e.extent.spatial.bbox[0]),s=[...this.fromLonLat([t.west,t.south]),...this.fromLonLat([t.east,t.north])],a=new u["a"]({title:"Extent",noSwitcherDelete:!0,source:new m["a"]({features:[new l["a"](Object(h["c"])(s))],projection:"EPSG:4326",wrapX:!1})}),o=a.getStyle();"function"===typeof o&&(o=o()[0]),o.setFill(null),i.getLayers().push(a),this.map.getView().fit(s,this.fitOptions)}catch(a){console.log(a)}},getWMTSTimes(e,t){const i=e.Contents.Layer||[];let s=i.find(e=>e.Identifier==t);if(!s||!s.Dimension)return[];let a=s.Dimension.find(e=>"TIME"===e.Identifier);return a?a.Value.sort():[]},async updateWMTSLayer(e,t=[],i,s="Service"){if(this.removeLayerFromMap(e.id),!this.WMTSCapabilities[e.url]){let t=new URL(e.url);t.searchParams.set("service","wmts"),t.searchParams.set("request","GetCapabilities");let i=await axios.get(t.toString(),{responseType:"text"});var a=new w["a"];this.WMTSCapabilities[e.url]=a.read(i.data)}let o=this.WMTSCapabilities[e.url],l=null,h=null,p=null,u=null,m=n["a"].getResourceTitle(e,s),g=new r["a"];for(let r of t){let e=Object(f["b"])(o,{layer:r,matrixSet:"EPSG:3857"});p||(p=new Date(e.dimensions.TIME));let t=this.getWMTSTimes(o,r);if(t.length){let e=new Date(t[0]),i=new Date(t[t.length-1]);(!l||e<l)&&(l=e),(!h||i>h)&&(h=i)}i&&(n["a"].isObject(e.dimensions)||(e.dimensions={}),e.dimensions.time=i),u=new f["a"](e);var y=new c["a"]({title:m,source:this.trackTileProgress(u),noSwitcherDelete:!0});g.push(y)}if(l&&h){let e;this.timeline=new v["a"]({className:"ol-pointer",graduation:"day",minDate:l,maxDate:h}),this.timeline.on("scroll",(function(t){!t.date||t.date>h||t.date<l||(e&&window.clearTimeout(e),e=window.setTimeout(()=>{try{let e=t.date.toISOString().substr(0,10);u.updateDimensions({TIME:e});let i=document.getElementsByClassName("timeline-date-label");i[0].innerText=e,i[0].disabled=!0}catch(i){console.log(i)}e=null},500))})),this.map.addControl(this.timeline),this.timeline.addButton({className:"timeline-date-label",title:`The date that is shown on the map for the collection '${m}'`,html:"No date"}),this.timeline.setDate(p)}let b=new d["a"]({id:e.id,title:m,layers:g});return this.addLayerToMap(b),this.timeline&&this.map.getLayers().on("remove",e=>{e.element===b&&(this.map.removeControl(this.timeline),this.timeline=null)}),b},updateXYZLayer(e,t="Service"){this.removeLayerFromMap(e.id);let i=n["a"].replaceParam(e.url,"__editorSessionId",(new Date).getTime()).replace(/%7B/g,"{").replace(/%7D/g,"}"),s=n["a"].getResourceTitle(e,t),a=new c["a"]({title:s,source:this.trackTileProgress(new g["a"]({url:i})),noSwitcherDelete:!0}),o=new d["a"]({id:e.id,title:s,layers:[a]});return this.addLayerToMap(o),o}}},L=b,x=(i("991b"),i("2877")),M=Object(x["a"])(L,s,a,!1,null,null,null);t["default"]=M.exports},af41:function(e,t,i){}}]);
//# sourceMappingURL=chunk-22e7c7a4.99268733.js.map