(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pageProcesses"],{"0772":function(t,e,l){},"0a24":function(t,e,l){"use strict";e["a"]={functional:!0,render(t,e){const{_c:l,_v:a,data:s,children:o=[]}=e,{class:i,staticClass:n,style:r,staticStyle:c,attrs:d={},...p}=s;return l("svg",{class:[i,n],style:[r,c],attrs:Object.assign({width:"30",height:"30",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d),...p},o.concat([l("path",{staticClass:"action-icon--",attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10 15a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z",fill:"gray"}})]))}}},"185b":function(t,e,l){},"27d8":function(t,e,l){"use strict";var a=l("c15b"),s=l.n(a);s.a},"2f21":function(t,e,l){"use strict";var a=l("79e5");t.exports=function(t,e){return!!t&&a((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"543d":function(t,e,l){"use strict";var a=l("d46f"),s=l.n(a);s.a},"55dd":function(t,e,l){"use strict";var a=l("5ca1"),s=l("d8e8"),o=l("4bf8"),i=l("79e5"),n=[].sort,r=[1,2,3];a(a.P+a.F*(i((function(){r.sort(void 0)}))||!i((function(){r.sort(null)}))||!l("2f21")(n)),"Array",{sort:function(t){return void 0===t?n.call(o(this)):n.call(o(this),s(t))}})},5801:function(t,e,l){"use strict";var a=l("185b"),s=l.n(a);s.a},"6d0c":function(t,e,l){"use strict";var a=l("83b7"),s=l.n(a);s.a},"807f":function(t,e,l){"use strict";var a=l("8513"),s=l.n(a);s.a},"83b7":function(t,e,l){},8513:function(t,e,l){},"852a":function(t,e,l){"use strict";l.r(e);var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"select-component",class:[t.style_component&&t.style_component.class?t.style_component.class:"",{"is-disabled":t.disabled}]},[t.label?l("span",{staticClass:"regular font-body select-component__label",class:{error:!!t.isError&&t.getEmptyCheck}},[t._v(t._s(t.label))]):t._e(),l("el-select",t._b({staticClass:"select-component__general",class:{disabled:t.disabled},attrs:{multiple:t.multiple,"allow-create":t.multiple,"default-first-option":t.multiple,disabled:t.disabled,placeholder:t.getArrayCount,id:t.id_tag,noDataText:this.$t("$common.no_data"),filterable:t.getOptions.length>30||!!t.remoteOptions&&t.remoteOptions.hasOwnProperty("filterable")&&t.remoteOptions.filterable},on:{change:function(e){return t.update(e)}},model:{value:t.tmpValue,callback:function(e){t.tmpValue=e},expression:"tmpValue"}},"el-select",t.remoteOptions||{},!1),t._l(t.getOptions,(function(t,e){return l("el-option",{key:t.value,staticClass:"regular font-body select-component__general-option",attrs:{label:t.label,value:t.value,disabled:!!t.disabled&&t.disabled}})})),1)],1)},s=[],o=(l("ac6a"),l("55dd"),l("6b54"),{name:"SelectComponent",componentName:"SelectComponent",props:{value:[String,Array],options:Array,label:{type:String,default:null},style_component:{type:Object,default:null},isError:{type:Boolean,default:!1},placeholder:String,sortable:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},remoteOptions:{type:Object,default:null}},data(){return{tmpValue:null,select_options:[],id_tag:""}},computed:{getArrayCount(){return this.value&&"[object Array]"===Object.prototype.toString.call(this.value)?this.value.length+" "+this.$t("$fields.fields_selected"):this.placeholder||this.$t("$common.none")},getEmptyCheck(){return"[object Array]"===Object.prototype.toString.call(this.value)?0==this.value.length:""==this.value},getOptions(){let t=this.$panel.clone(this.select_options);if(this.sortable){t.sort((t,e)=>{let l="",a="";return l=t.label,a=e.label,l.toLowerCase().localeCompare(a.toLowerCase())});let e={};for(let l=0;l<t.length;l++)"fixed_index"in t[l]&&(e[l]=t[l]);if(0!==Object.keys(e).length){let l=this.$panel.clone(t);for(let t in e)l.splice(t,1);return Object.values(e).sort((t,e)=>{return t.fixed_index<e.fixed_index?-1:t.fixed_index>e.fixed_index?1:0}).forEach(t=>{l.splice(t.fixed_index,0,t)}),l}}return t}},created(){this.$store.commit("incObjectID"),this.id_tag=this.$store.getters.getObjectID},watch:{value:{handler:function(t,e){this.setSelectValue(t)},immediate:!0},options:{handler:function(t,e){this.initializeSelect()},immediate:!0}},methods:{setSelectValue(t){"[object Array]"===Object.prototype.toString.call(t)?(this.tmpValue=this.$panel.clone(t),setTimeout(()=>{let t=document.getElementById(this.id_tag);t&&t.setAttribute("placeholder",this.getArrayCount)},500)):this.tmpValue=t},initializeSelect(){console.log("INIT SELECT",this.options);let t=[];this.options&&this.options.forEach(e=>{t.push(e)}),console.log(t),this.select_options=t},update(t){this.$emit("input",t)}}}),i=o,n=(l("5801"),l("2877")),r=Object(n["a"])(i,a,s,!1,null,null,null);e["default"]=r.exports},"93a9":function(t,e,l){"use strict";var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"dropdown-component",class:{"is-active":t.dropdownActive}},[l("el-dropdown",{staticClass:"grey50",attrs:{trigger:"click"},on:{"visible-change":function(e){t.dropdownActive=e}}},[t._t("dropdown-slot-label"),l("el-dropdown-menu",{staticClass:"dropdown-component__drop-menu",attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.items,(function(e,a){return l("div",{on:{click:function(e){return t.$emit("onChange",a)}}},[l("el-dropdown-item",{staticClass:"regular font-body"},[t._v(t._s(e))])],1)})),0)],2)],1)},s=[],o=(l("c01d"),{name:"DropdownComponent",componentName:"DropdownComponent",props:{dropdown_title:String,items:Array},data(){return{dropdownActive:!1}}}),i=o,n=(l("807f"),l("2877")),r=Object(n["a"])(i,a,s,!1,null,null,null);e["a"]=r.exports},bde7:function(t,e,l){"use strict";l.r(e);var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"scroll-container overflow-hidden-auto back_white",attrs:{id:"page-processes"},on:{scroll:t.scrollFunction}},[l("div",{staticClass:"width-window"},[l("top-line-content",[l("div",{staticClass:"top-line__slot",attrs:{slot:"top-line-content__start"},slot:"top-line-content__start"},t._l(t.topLine.options,(function(e,a,s){return l("select-component",{key:a,staticClass:"top-line__select inline-block",attrs:{value:t.isUpdate?t.topLine[a]:"",options:e},on:{input:function(e){return t.handleTopSelect(a,e)}}})})),1),l("div",{staticClass:"top-line__slot",attrs:{slot:"top-line-content__end"},slot:"top-line-content__end"},[l("div",{staticClass:"top-line__button btn-cyan text-center",on:{click:t.handleClickTopButton}},[t._v(t._s(t.$t("$buttons.new")))])])])],1),l("div",{staticClass:"width-window material__title-names back_white",class:{"material__title-names-border-no":t.noBorder}},[l("material-title",{attrs:{value:t.currentSort,direction:t.currentSortDirection,materialTitle:t.materialTitle},on:{input:t.handleInputTitle}})],1),l("div",{staticClass:"width-window material-list"},[l("div",{staticClass:"panel-container"},t._l(t.curMaterials,(function(e,a){return l("material-process",{key:a,attrs:{data:e},on:{onSignal:function(e){return t.handleSignalElement(a,e)},onEdit:function(e){return t.handleEditElement(a)}}})})),1)])])},s=[],o=(l("55dd"),l("6b54"),l("ac6a"),function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"top-line-content back_cyan-5 cyan-30"},[l("div",{staticClass:"panel-container"},[l("div",{staticClass:"top-line-content__flex flex-start"},[l("div",{staticClass:"top-line-content__flex-start inline-block"},[t._t("top-line-content__start")],2),l("div",{staticClass:"top-line-content__flex-end inline-block"},[t._t("top-line-content__end")],2)])])])}),i=[],n={name:"TopLineContent",componentName:"TopLineContent"},r=n,c=(l("27d8"),l("2877")),d=Object(c["a"])(r,o,i,!1,null,null,null),p=d.exports,u=l("852a"),_=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"material-title",class:{"is-disabled":t.disabled}},[l("div",{staticClass:"panel-container"},[l("div",{staticClass:"material-title__inner cyan-30",class:"material-"+t.materialTitle.material+"-layout"},[t._l(t.materialTitle.elements,(function(e,a){return l("span",{staticClass:"regular font-desc material-title__inner-element pre-line inline-block-bottom",class:["pos"+a,e.class?e.class:"",{"is-disabled":!0===e.disabled},a!==t.value||t.disabled||e.disabled?"":t.direction?"sort-active-down":"sort-active-up"],attrs:{panel__tooltip:e.panel__tooltip?e.panel__tooltip:void 0},on:{click:function(e){return t.handleClick(a)}}},[t._v(t._s(e.value))])})),t._t("default")],2)])])},m=[],h={name:"MaterialTitle",componentName:"MaterialTitle",props:{value:{type:Number,default:null},direction:{type:Boolean,default:!1},materialTitle:Object,disabled:{type:Boolean,default:!1}},methods:{handleClick(t){this.disabled||this.materialTitle.elements[t].disabled||this.$emit("input",t)}}},b=h,v=(l("543d"),Object(c["a"])(b,_,m,!1,null,null,null)),f=v.exports,g=function(){var t=this,e=t.$createElement,l=t._self._c||e;return t.data?l("div",{staticClass:"material-line-process"},[l("div",{staticClass:"material-line-process__inner material-process-layout back_white"},[l("span",{staticClass:"pos0 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.user))]),l("span",{staticClass:"pos1 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.c))]),l("span",{staticClass:"pos2 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.mem))]),l("span",{staticClass:"pos3 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.pid))]),l("span",{staticClass:"pos4 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.pgid))]),l("span",{staticClass:"pos5 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.ppid))]),l("span",{staticClass:"pos6 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.psr))]),l("span",{staticClass:"pos7 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.rss))]),l("span",{staticClass:"pos8 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.sid))]),l("span",{staticClass:"pos9 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.start))]),l("span",{staticClass:"pos10 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.stat))]),l("span",{staticClass:"pos11 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.sz))]),l("span",{staticClass:"pos12 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.time))]),l("span",{staticClass:"pos13 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.tpgid))]),l("span",{staticClass:"pos14 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.tty))]),l("span",{staticClass:"pos15 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.uid))]),l("span",{staticClass:"pos16 regular font-body black inline-block limited-text-line"},[t._v(t._s(t.data.vsz))]),t.data.cmd&&t.data.cmd.length>146?[l("div",{staticClass:"pos17",attrs:{panel__tooltip:t.data.cmd}},[l("span",{staticClass:"regular font-body black limited-text-line"},[t._v(t._s(t.data.cmd))])])]:[l("span",{staticClass:"pos17 regular font-body black limited-text-line"},[t._v(t._s(t.data.cmd))])],l("dropdown-component",{staticClass:"material-line-process__dropdown inline-block",attrs:{items:t.dropdownItems},on:{onChange:t.handleDropdown}},[l("div",{staticClass:"material-line-process__dropdown-icon cursor-pointer",attrs:{slot:"dropdown-slot-label"},slot:"dropdown-slot-label"},[l("action-icon")],1)])],2)]):t._e()},$=[],k=l("93a9"),C=l("0a24"),y={name:"MaterialPromocode",componentName:"MaterialPromocode",components:{DropdownComponent:k["a"],ActionIcon:C["a"]},props:{data:{type:Object,default:null}},data(){return{codeSignal:{0:"EXIT",1:"STOP",2:"INTERRUPT",3:"KILL"}}},computed:{dropdownItems(){let t=[this.$t("$dropdown.exit"),this.$t("$dropdown.stop"),this.$t("$dropdown.interrupt"),this.$t("$dropdown.kill")];return t}},methods:{handleDropdown(t){console.log("[MaterialPromocode.vue]: handleDropdown: ",t),this.$emit("onSignal",this.codeSignal[t])}}},x=y,w=(l("6d0c"),Object(c["a"])(x,g,$,!1,null,null,null)),S=w.exports;const P=()=>l.e("MessageBox").then(l.bind(null,"4882")),E=()=>l.e("EditProcessModal").then(l.bind(null,"29eb"));var L={name:"PageProcesses",nameComponent:"PageProcesses",components:{TopLineContent:p,MaterialTitle:f,SelectComponent:u["default"],MaterialProcess:S},data(){return{curMaterials:[],materials:[],materialTitle:{elements:[{value:this.$t("$title_material.user"),panel__tooltip:"Имя владельца процесса",class:"panel__tooltip"},{value:this.$t("$title_material.c"),panel__tooltip:"Значение загрузки процессора",class:"panel__tooltip"},{value:this.$t("$title_material.mem"),panel__tooltip:"Часть реальной памяти (%), используемая процессом",class:"panel__tooltip"},{value:this.$t("$title_material.pid"),panel__tooltip:"Идентификатор процесса",class:"panel__tooltip"},{value:this.$t("$title_material.pgid"),panel__tooltip:"Индентификатор группы",class:"panel__tooltip"},{value:this.$t("$title_material.ppid"),panel__tooltip:"Идентификатор родительского процесса",class:"panel__tooltip"},{value:this.$t("$title_material.psr"),panel__tooltip:"Процесс, которому в данный момент назначен процесс",class:"panel__tooltip"},{value:this.$t("$title_material.rss"),panel__tooltip:"Размер резидентного набора (количество страниц памяти)",class:"panel__tooltip"},{value:this.$t("$title_material.sid"),panel__tooltip:"Идентификатор сеанса",class:"panel__tooltip"},{value:this.$t("$title_material.start"),panel__tooltip:"Время создания процесса",class:"panel__tooltip"},{value:this.$t("$title_material.stat"),panel__tooltip:"Текущий статус процесса:\n\tR — выполняется\n\tD — ожидает записи на диск\n\tS — неактивен (< 20 с)\n\tT — приостановлен\n\tZ — зомби\n\tДополнительные флаги:\n\tW — процесс выгружен на диск\n\t< — процесс имеет повышенный приоритет\n\tN — процесс имеет пониженный приоритет\n\tL — некоторые страницы блокированы в оперативной памяти\n\ts — процесс является лидером сеанса\n\tl — является многопоточным\n\t+ — находится на переднем плане процесса группы\n\tI — процесс в состоянии простоя",class:"panel__tooltip"},{value:this.$t("$title_material.sz"),panel__tooltip:"Размер в физических страницах основного образа процесса",class:"panel__tooltip"},{value:this.$t("$title_material.time"),panel__tooltip:"Количество времени ЦП, затраченное на выполнение процесса",class:"panel__tooltip"},{value:this.$t("$title_material.tpgid"),panel__tooltip:"Идентификатор группы процессов переднего плана на TTY (терминале), к которому подключен процесс, или -1 если процесс не связан с TTY",class:"panel__tooltip"},{value:this.$t("$title_material.tty"),panel__tooltip:"Идентификатор управляяющего терминала",class:"panel__tooltip"},{value:this.$t("$title_material.uid"),panel__tooltip:"Эффективный идентификатор пользователя",class:"panel__tooltip"},{value:this.$t("$title_material.vsz"),panel__tooltip:"Виртуальный размер процесса",class:"panel__tooltip"},{value:this.$t("$title_material.cmd"),panel__tooltip:"Имя и аргументы команды",class:"panel__tooltip"}],material:"process"},topLineDefault:{user:"ALL_USERS"},topLine:{options:{user:[{value:"ALL_USERS",label:this.$t("$common.all_users"),fixed_index:0}]},user:""},currentSort:0,currentSortDirection:!0,scrollTop:0,isUpdate:!1}},computed:{noBorder(){return this.scrollTop<100&&0!==this.materials.length}},created(){console.log("[Processes.vue]: created ",this.$route),this.initStart(),this.fetchData()},methods:{getStructModal(){let t={title:"",button:"",buttonNameEvent:"",sectionStruct:{options:null,fields:[{name:"cmd",type:"input",options:{label:this.$t("$fields.cmd"),maxLength:80}},{name:"attributes",type:"input",options:{label:this.$t("$fields.attributes"),passFillValid:!0}}]}};return t},handleInputTitle(t){this.currentSort===t?this.currentSortDirection=!this.currentSortDirection:(this.currentSort=t,this.currentSortDirection=!0),localStorage.setItem("sort_omanager_direction",this.currentSortDirection),localStorage.setItem("sort_omanager",t),this.clearData(),this.fetchData()},handleClickTopButton(t){console.log("[Processes.vue]: handleClickTopButton: ",t),this.showModal("create")},showModal(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,l=this.getStructModal(),a=null;"create"===t&&(l.title=this.$t("$fields.new_public_process"),l.button=this.$t("$buttons.start"),l.buttonNameEvent="create",a={cmd:"",attributes:""}),this.$store.commit("addModal",{value:a,options:{struct:l,callback:this.callbackModal,eventValue:null===e?null:e.index},component:E})},callbackModal(t){console.log("[Processes.vue]: callbackModal: ",t),t&&("close"===t.typeEvent?this.$store.commit("removeModal",t.indexModal):"create"===t.typeEvent&&(console.log("CREATE PROCESS"),this.postPromocode(t.value,t.indexModal)))},clearData(){this.materials=[]},handleTopSelect(t,e){this.topLine[t]=e,localStorage.setItem(`omanager-panel__${t}-processes`,e),this.clearData(),this.fetchData()},getLocalStorageValue(t,e){let l=localStorage.getItem(t);return l||(localStorage.setItem(t,e),e)},initStart(){console.log("[Processes.vue]: initStart");for(let l in this.topLineDefault)this.topLine[l]=this.getLocalStorageValue(`omanager-panel__${l}-processes`,this.topLineDefault[l]);let t=this.getLocalStorageValue("sort_omanager","0");this.currentSort=Number.parseInt(t,10)||0;let e=this.getLocalStorageValue("sort_omanager_direction","true");this.currentSortDirection="true"===e},scrollFunction(t){this.scrollTop=t.target.scrollTop},getQueryLine(t){let e=Object.keys(t).length;if(e<1)return"";{let e=Object.keys(t).map(e=>`${e}=${t[e]}`).join("&");return"?"+e}},handleSignalElement(t,e){console.log("[Promovodes.vue]: handleRemoveElement: ",t),this.$store.commit("addModal",{value:this.$t("$modals.message_box.question_leave"),options:{text:this.$t("$modals.message_box.cannot_undone"),callback:this.callbackMessageBox,buttonCancel:this.$t("$buttons.cancel"),buttonOk:this.$t("$buttons.ok"),type:"delete",eventValue:{index:t,data:{signal:e}}},component:P})},callbackMessageBox(t){console.log("[Processes.vue]: callbackMessageBox: ",t),this.$store.commit("removeModal",t.indexModal),t.value&&this.PostIdData(t.eventValue.index,t.eventValue.data)},PostIdData(t,e){console.log("[Processes.vue]: PostIdData: ",e),this.$store.state.axios.post(`/processes/${this.curMaterials[t].pid}`,e).then(t=>{console.log("[FeedId.vue]: PostIdData(response): ",t),200===t.status&&this.fetchData()}).catch(t=>{console.log("[FeedId.vue]: PostIdData(error): ",t)})},deleteData(t){console.log("[Processes.vue]: deleteData: ",t),this.$store.state.axios.delete(`/processes/${this.curMaterials[t].pid}`).then(t=>{console.log("[FeedId.vue]: deleteFeed(response): ",t),200===t.status&&this.fetchData()}).catch(t=>{console.log("[FeedId.vue]: deleteFeed(error): ",t)})},handleEditElement(t){console.log("[Promovodes.vue]: handleEditElement: ",t),this.showModal("edit",{index:t,material:this.materials[t]})},getFilterByUser(t){return console.log(this.topLine.user),"ALL_USERS"===this.topLine.user?t:t.filter(t=>t.user===this.topLine.user)},globalSort(){let t=this.$panel.clone(this.materials);t=this.getFilterByUser(t),t=this.sortByField(t,this.currentSort),this.curMaterials=t},sortByField(t,e){let l=this.$panel.clone(t);function a(t,l){let a=t,s=l;switch(e){case 0:a=t.user.toLowerCase(),s=l.user.toLowerCase();break;case 1:a=t.c,s=l.c;break;case 2:a=t.mem,s=l.mem;break;case 3:a=t.pid,s=l.pid;break;case 4:a=t.pgid,s=l.pgid;break;case 5:a=t.ppid,s=l.ppid;break;case 6:a=t.psr,s=l.psr;break;case 7:a=t.rss,s=l.rss;break;case 8:a=t.sid,s=l.sid;break;case 9:a=t.start,s=l.start;break;case 10:a=t.stat,s=l.stat;break;case 11:a=t.sz,s=l.sz;break;case 12:a=t.time,s=l.time;break;case 13:a=t.tpgid,s=l.tpgid;break;case 14:a=t.tty,s=l.tty;break;case 15:a=t.uid,s=l.uid;break;case 16:a=t.vsz,s=l.vsz;break;case 17:a=t.cmd.toLowerCase(),s=l.cmd.toLowerCase();break;default:a=t.toString().toLowerCase(),s=l.toString().toLowerCase()}return a<s?-1:a>s?1:0}return l.sort(a),this.currentSortDirection||(l=l.reverse()),l},updateSelect(t){let e=[];t.forEach(t=>{-1===e.indexOf(t.user)&&e.push(t.user)});let l=[{value:"ALL_USERS",label:this.$t("$common.all_users"),fixed_index:0}];e.forEach(t=>{l.push({value:t,label:t})}),this.topLine.options.user=l},postPromocode(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.$store.state.axios.post("/processes",t).then(t=>{console.log("[Processes.vue]: postPromocode(response): ",t),200===t.status&&(null!==this.index&&(this.$store.commit("removeModal",e),this.$store.commit("addNotification",{text:`${this.$t("$notifications.process_started")}`,color:"green"})),this.fetchData())}).catch(t=>{console.log("[Processes.vue]: postPromocode(error): ",t),this.$store.commit("addNotification",{text:`${this.$t("$notifications.process_started_failed")}`,color:"red"})})},putPromocode(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=t.id;delete t.id,null!==a&&this.$store.state.axios.post(`/processs/${a}`,t).then(t=>{if(console.log("[Processes.vue]: postPromocode(response): ",t),200===t.status&&(null!==this.index&&this.$store.commit("removeModal",e),null!==l&&l>=0&&l<this.materials.length)){let e=this.$panel.clone(this.materials);e[l]=t.data,this.materials=e}}).catch(t=>{console.log("[Processes.vue]: postPromocode(error): ",t)})},fetchData(){this.$store.state.axios.get("/processes").then(t=>{console.log("[Processes.vue]: fetchData(response): ",t),200===t.status&&(this.materials=t.data,this.updateSelect(this.materials),this.globalSort(),this.isUpdate=!0)}).catch(t=>{console.log("[Processes.vue]: fetchData(error): ",t)})}}},D=L,T=(l("cb83"),Object(c["a"])(D,a,s,!1,null,null,null));e["default"]=T.exports},c15b:function(t,e,l){},cb83:function(t,e,l){"use strict";var a=l("0772"),s=l.n(a);s.a},d46f:function(t,e,l){}}]);
//# sourceMappingURL=pageProcesses.5341db3e.js.map