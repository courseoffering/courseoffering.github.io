(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{224:function(t,e,r){var content=r(293);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(33).default)("48517564",content,!0,{sourceMap:!1})},248:function(t,e,r){"use strict";var n={name:"DefaultLayout",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[{icon:"mdi-apps",title:"Welcome",to:"/"}],miniVariant:!1,title:"KFU Course Offering"}}},o=r(86),c=r(112),l=r.n(c),d=r(361),f=r(365),v=r(362),_=r(366),h=r(363),m=r(364),x=r(245),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{dark:""}},[r("v-app-bar",{attrs:{"clipped-left":t.clipped,fixed:"",app:""}},[r("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),r("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),r("v-spacer")],1),t._v(" "),r("v-main",[r("v-container",[r("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;l()(component,{VApp:d.a,VAppBar:f.a,VAppBarNavIcon:v.a,VContainer:_.a,VMain:h.a,VSpacer:m.a,VToolbarTitle:x.a})},262:function(t,e,r){r(263),t.exports=r(264)},292:function(t,e,r){"use strict";r(224)},293:function(t,e,r){var n=r(32)(!1);n.push([t.i,"h1[data-v-6ffeedc3]{font-size:20px}",""]),t.exports=n},74:function(t,e,r){"use strict";var n={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(r(292),r(86)),c=r(112),l=r.n(c),d=r(361),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{dark:""}},[404===t.error.statusCode?r("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):r("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),r("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)}),[],!1,null,"6ffeedc3",null);e.a=component.exports;l()(component,{VApp:d.a})}},[[262,12,5,13]]]);