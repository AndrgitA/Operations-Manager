(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ee95061"],{"0a24":function(t,n,e){"use strict";n["a"]={functional:!0,render(t,n){const{_c:e,_v:a,data:i,children:o=[]}=n,{class:s,staticClass:r,style:c,staticStyle:l,attrs:u={},...p}=i;return e("svg",{class:[s,r],style:[c,l],attrs:Object.assign({width:"30",height:"30",fill:"none",xmlns:"http://www.w3.org/2000/svg"},u),...p},o.concat([e("path",{staticClass:"action-icon--",attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10 15a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z",fill:"gray"}})]))}}},"0a57":function(t,n,e){"use strict";var a=e("d954"),i=e.n(a);i.a},"11e9":function(t,n,e){var a=e("52a7"),i=e("4630"),o=e("6821"),s=e("6a99"),r=e("69a8"),c=e("c69a"),l=Object.getOwnPropertyDescriptor;n.f=e("9e1e")?l:function(t,n){if(t=o(t),n=s(n,!0),c)try{return l(t,n)}catch(e){}if(r(t,n))return i(!a.f.call(t,n),t[n])}},"23c1":function(t,n,e){"use strict";var a=e("a11a"),i=e.n(a);i.a},"2f21":function(t,n,e){"use strict";var a=e("79e5");t.exports=function(t,n){return!!t&&a((function(){n?t.call(null,(function(){}),1):t.call(null)}))}},"31a3":function(t,n,e){"use strict";var a=e("97e5"),i=e.n(a);i.a},"50af":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.isShowData?e("div",{staticClass:"scroll-containter overflow-hidden-auto back_cyan-1",attrs:{id:"page-scripts"}},[e("div",{staticClass:"width-window scripts__title"},[e("title-page",{staticClass:"back_cyan-10",attrs:{value:t.getTitleValue}})],1),e("div",{staticClass:"width-window scripts__content"},[e("div",{staticClass:"panel-container"},[e("div",{staticClass:"scripts__content-left inline-block"},[e("div",{staticClass:"scripts__section"},[e("blocks-component",{attrs:{value:t.material.blocks,optionsDraggable:t.optionsDraggable},on:{input:function(n){return t.handleInput("blocks",n)}}})],1)]),e("div",{staticClass:"scripts__content-right scripts__panel-control inline-block"},[e("scripts-panel",{attrs:{title:t.$t("$controls.scripts"),count:t.material.blocks.length,needSave:t.needSave},on:{onEmit:t.handleEmitControl}})],1)])])]):t._e()},i=[],o=(e("55dd"),function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"title-page"},[e("div",{staticClass:"panel-container"},[e("div",{staticClass:"title-page__inner flex-start"},[t._t("prepend"),e("div",{staticClass:"title-page__inner-info inline-block"},[t._t("prepend-content"),e("div",{staticClass:"title-page__inner-info-content inline-block"},[e("div",[e("p",{staticClass:"semi-bold font-title cyan-dark inline-block"},[t._v(t._s(t.value.titleText))]),t._t("append-content-top-line")],2),e("p",{staticClass:"regular font-desc cyan-30"},[t._v(t._s(t.value.titleInfo))])]),t._t("append-content")],2),t._t("append")],2)])])}),s=[],r={props:{value:{type:Object,required:!0,validator:function(t){return console.log("[TitlePage.vue]: validator(value): ",t),t.hasOwnProperty("titleText")&&t.hasOwnProperty("titleInfo")}}}},c=r,l=(e("31a3"),e("2877")),u=Object(l["a"])(c,o,s,!1,null,null,null),p=u.exports,f=e("3359"),d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"scripts-panel back_white"},[e("span",{staticClass:"scripts-panel__title semi-bold font-title black"},[t._v(t._s(t.title))]),e("div",{staticClass:"scripts-panel__row"},[e("p",{staticClass:"scripts-panel__row-left-p regular font-body"},[t._v(t._s(t.$t("$fields.need_save")))]),null!==t.needSave?e("p",{staticClass:"scripts-panel__row-right-p regular font-body"},[t._v(t._s(t.$t("$common."+(t.needSave?"yes":"no"))))]):t._e()]),e("div",{staticClass:"scripts-panel__row"},[e("p",{staticClass:"scripts-panel__row-left-p regular font-body"},[t._v(t._s(t.$t("$fields.all_scripts")))]),null!==t.count?e("p",{staticClass:"scripts-panel__row-right-p regular font-body"},[t._v(t._s(t.count))]):t._e()]),e("div",{staticClass:"scripts-panel__row"},[e("div",{staticClass:"scripts-panel__row-button btn-cyan text-center user-select-none",on:{click:function(n){return t.$emit("onEmit")}}},[t._v(t._s(t.$t("$buttons.save")))])])])},_=[],v=(e("c5f6"),{name:"ScriptsPanel",componentName:"ScriptsPanel",props:{title:{type:String,default:""},count:{type:Number,default:null},needSave:{type:Boolean,default:!1}}}),h=v,g=(e("23c1"),Object(l["a"])(h,d,_,!1,null,null,null)),b=g.exports,m={name:"PageScripts",componentName:"PageScripts",components:{TitlePage:p,BlocksComponent:f["default"],ScriptsPanel:b},data:function(){return{optionsDraggable:{handle:".head-block__handlebar",draggable:".script-block"},isShowData:!1,originalMaterial:null,material:{blocks:[]}}},computed:{getTitleValue:function(){return{titleText:"Скрипты для тестирования",titleInfo:"(OS) Ubuntu 18.04.3 LTS"}},needSave:function(){return!this.$panel.isEqual(this.material,this.originalMaterial)}},created:function(){this.fetchData()},methods:{handleInput:function(t,n){this.material[t]=n},handleEmitControl:function(){console.log("[Scripts.vue]: handleEmitControl: ");var t=this.setPositions(this.material.blocks);t.map((function(t){return"NOT_CHANGED"===t.status&&(t.status="UPDATE"),t})),console.log("POST DATA: ",t),this.putScripts(t)},putScripts:function(t){var n=this;console.log("[Scripts.vue]: putScripts: ",t),this.$store.state.axios.put("/scripts",t).then((function(t){console.log("[Scripts.vue]: putScripts(response): ",t),200===t.status&&(n.$store.commit("addNotification",{text:"".concat(n.$t("$notifications.update_success")),color:"green"}),n.fetchData())})).catch((function(t){console.log("[Scripts.vue]: putScripts(error): ",t)}))},setPositions:function(t){var n=0,e=t.map((function(t){return t.position=n++,t}));return e},getSortPosition:function(t){var n=this.$panel.clone(t);return n.sort((function(t,n){return t.position<n.position?-1:t.position>n.position?1:0})),n},fetchData:function(){var t=this;this.$store.state.axios.get("/scripts").then((function(n){if(console.log("[Scripts.vue]: fetchData(response): ",n),200===n.status){var e={blocks:t.getSortPosition(n.data)};e.blocks.map((function(t){return t.status="NOT_CHANGED",t})),t.material=e,t.originalMaterial=t.$panel.clone(t.material),t.isShowData=!0}})).catch((function(t){console.log("[Scripts.vue]: fetchData(error): ",t)}))}}},w=m,C=(e("0a57"),Object(l["a"])(w,a,i,!1,null,null,null));n["default"]=C.exports},"55dd":function(t,n,e){"use strict";var a=e("5ca1"),i=e("d8e8"),o=e("4bf8"),s=e("79e5"),r=[].sort,c=[1,2,3];a(a.P+a.F*(s((function(){c.sort(void 0)}))||!s((function(){c.sort(null)}))||!e("2f21")(r)),"Array",{sort:function(t){return void 0===t?r.call(o(this)):r.call(o(this),i(t))}})},"5dbc":function(t,n,e){var a=e("d3f4"),i=e("8b97").set;t.exports=function(t,n,e){var o,s=n.constructor;return s!==e&&"function"==typeof s&&(o=s.prototype)!==e.prototype&&a(o)&&i&&i(t,o),t}},"807f":function(t,n,e){"use strict";var a=e("8513"),i=e.n(a);i.a},8513:function(t,n,e){},"8b97":function(t,n,e){var a=e("d3f4"),i=e("cb7c"),o=function(t,n){if(i(t),!a(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,a){try{a=e("9b43")(Function.call,e("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),n=!(t instanceof Array)}catch(i){n=!0}return function(t,e){return o(t,e),n?t.__proto__=e:a(t,e),t}}({},!1):void 0),check:o}},9093:function(t,n,e){var a=e("ce10"),i=e("e11e").concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return a(t,i)}},"93a9":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"dropdown-component",class:{"is-active":t.dropdownActive}},[e("el-dropdown",{staticClass:"grey50",attrs:{trigger:"click"},on:{"visible-change":function(n){t.dropdownActive=n}}},[t._t("dropdown-slot-label"),e("el-dropdown-menu",{staticClass:"dropdown-component__drop-menu",attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.items,(function(n,a){return e("div",{on:{click:function(n){return t.$emit("onChange",a)}}},[e("el-dropdown-item",{staticClass:"regular font-body"},[t._v(t._s(n))])],1)})),0)],2)],1)},i=[],o=(e("c01d"),{name:"DropdownComponent",componentName:"DropdownComponent",props:{dropdown_title:String,items:Array},data:function(){return{dropdownActive:!1}}}),s=o,r=(e("807f"),e("2877")),c=Object(r["a"])(s,a,i,!1,null,null,null);n["a"]=c.exports},"97e5":function(t,n,e){},a11a:function(t,n,e){},aa77:function(t,n,e){var a=e("5ca1"),i=e("be13"),o=e("79e5"),s=e("fdef"),r="["+s+"]",c="​",l=RegExp("^"+r+r+"*"),u=RegExp(r+r+"*$"),p=function(t,n,e){var i={},r=o((function(){return!!s[t]()||c[t]()!=c})),l=i[t]=r?n(f):s[t];e&&(i[e]=l),a(a.P+a.F*r,"String",i)},f=p.trim=function(t,n){return t=String(i(t)),1&n&&(t=t.replace(l,"")),2&n&&(t=t.replace(u,"")),t};t.exports=p},c5f6:function(t,n,e){"use strict";var a=e("7726"),i=e("69a8"),o=e("2d95"),s=e("5dbc"),r=e("6a99"),c=e("79e5"),l=e("9093").f,u=e("11e9").f,p=e("86cc").f,f=e("aa77").trim,d="Number",_=a[d],v=_,h=_.prototype,g=o(e("2aeb")(h))==d,b="trim"in String.prototype,m=function(t){var n=r(t,!1);if("string"==typeof n&&n.length>2){n=b?n.trim():f(n,3);var e,a,i,o=n.charCodeAt(0);if(43===o||45===o){if(e=n.charCodeAt(2),88===e||120===e)return NaN}else if(48===o){switch(n.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+n}for(var s,c=n.slice(2),l=0,u=c.length;l<u;l++)if(s=c.charCodeAt(l),s<48||s>i)return NaN;return parseInt(c,a)}}return+n};if(!_(" 0o1")||!_("0b1")||_("+0x1")){_=function(t){var n=arguments.length<1?0:t,e=this;return e instanceof _&&(g?c((function(){h.valueOf.call(e)})):o(e)!=d)?s(new v(m(n)),e,_):m(n)};for(var w,C=e("9e1e")?l(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),y=0;C.length>y;y++)i(v,w=C[y])&&!i(_,w)&&p(_,w,u(v,w));_.prototype=h,h.constructor=_,e("2aba")(a,d,_)}},d954:function(t,n,e){},fdef:function(t,n){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-1ee95061-legacy.fc4d8392.js.map