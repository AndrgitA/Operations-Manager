(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pageLogin"],{"0864":function(t,o,n){},"206d":function(t,o,n){"use strict";var i=n("99bd"),e=n.n(i);e.a},"99bd":function(t,o,n){},a55b:function(t,o,n){"use strict";n.r(o);var i=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"flex-center-start scroll-container overflow-hidden-scroll back_grey5",attrs:{id:"page-login"}},[n("login-component")],1)},e=[],s=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"component-login back_white"},[n("div",{staticClass:"blank-login m-row-1 inline-block"},[n("span",{staticClass:"medium font-title black blank-login__title"},[t._v(t._s(t.$t("$login.title_login")))]),n("img",{staticClass:"blank-login__image events-none",attrs:{src:"/images/favicons/favicon.png"}})]),n("div",{staticClass:"blank-login m-row-1 inline-block"},[n("div",{staticClass:"blank-login-form"},[n("span",{staticClass:"regular font-body field-title"},[t._v(t._s(t.$t("$fields.login")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.login,expression:"login"}],staticClass:"blank-login-input m-10",domProps:{value:t.login},on:{keyup:t.keyUp,input:function(o){o.target.composing||(t.login=o.target.value)}}}),n("div",{staticClass:"regular font-body field-title"},[t._v(t._s(t.$t("$fields.password")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.pass,expression:"pass"}],staticClass:"blank-login-input m-row-3",attrs:{type:"password"},domProps:{value:t.pass},on:{keyup:t.keyUp,input:function(o){o.target.composing||(t.pass=o.target.value)}}}),n("button",{staticClass:"btn-black blank-login-button inline-block",on:{click:t.onButton}},[t._v(t._s(t.$t("$login.login")))])])])])},a=[],l=n("5118"),c={name:"LoginComponent",componentName:"LoginComponent",data:function(){return{pass:"",login:""}},methods:{keyUp:function(t){console.log("[LoginComponent.vue]: keyUp: ",t),"Enter"===t.key&&this.onButton()},setToken:function(t){var o=this,n={login:t.login,role:t.role,id:t.id};this.$cookie.set("omanager-panel__token",t.token),this.$store.commit("setUserData",n),this.$store.commit("Login",{token:t.token,router:this.$router});var i={text:this.$t("$notifications.welcome"),color:"cyan"};this.$store.commit("removeAllNotification"),Object(l["setTimeout"])((function(){o.$store.commit("addNotification",i)}),500)},onButton:function(){var t=this;""!=this.pass?this.$store.state.axios.post("/login",{login:this.login,password:this.pass}).then((function(o){console.log("[LoginComponent.vue]: onButton(response): ",o),t.setToken(o.data)})).catch((function(o){console.log("[LoginComponent.vue]: onButton(error): ",o,o.response),401===o.response.status&&t.$store.commit("addNotification",{text:t.$t("$notifications.login_failed"),color:"white"})})):this.$store.commit("addNotification",{text:this.$t("$notifications.fill_all_fields"),color:"white"})}}},r=c,u=(n("eb3a"),n("2877")),g=Object(u["a"])(r,s,a,!1,null,null,null),p=g.exports,m={name:"PageLogin",componentName:"PageLogin",components:{LoginComponent:p}},d=m,f=(n("206d"),Object(u["a"])(d,i,e,!1,null,null,null));o["default"]=f.exports},eb3a:function(t,o,n){"use strict";var i=n("0864"),e=n.n(i);e.a}}]);
//# sourceMappingURL=pageLogin-legacy.67d661c1.js.map