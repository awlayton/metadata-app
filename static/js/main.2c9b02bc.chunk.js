(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t){},146:function(e,t,n){e.exports=n(329)},151:function(e,t,n){},166:function(e,t,n){},326:function(e,t){},327:function(e,t){},329:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"geolocation",function(){return qt}),n.d(r,"survey",function(){return Tt}),n.d(r,"gapiClient",function(){return Qt}),n.d(r,"googleappdata",function(){return Vt}),n.d(r,"googlesheets",function(){return Mt});var a={};n.r(a),n.d(a,"init",function(){return Mn}),n.d(a,"showDroneQRScanner",function(){return Hn}),n.d(a,"hideDroneQRScanner",function(){return Un}),n.d(a,"showSensorQRScanner",function(){return Bn}),n.d(a,"hideSensorQRScanner",function(){return Ln}),n.d(a,"showNavigation",function(){return Wn}),n.d(a,"hideNavigation",function(){return Fn}),n.d(a,"setSurveyData",function(){return $n}),n.d(a,"setAnswer",function(){return _n}),n.d(a,"setSurveyPage",function(){return Gn}),n.d(a,"setPages",function(){return Jn}),n.d(a,"goNextPage",function(){return zn}),n.d(a,"goPreviousPage",function(){return Yn}),n.d(a,"completeSurvey",function(){return Kn}),n.d(a,"setCurrentLocation",function(){return Xn}),n.d(a,"loadappdata",function(){return Zn}),n.d(a,"login",function(){return er}),n.d(a,"logout",function(){return tr}),n.d(a,"createSheet",function(){return nr}),n.d(a,"submitResults",function(){return rr});var o=n(1),c=n.n(o),u=n(24),i=n.n(u),s=(n(151),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function l(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var p=n(27),f=n(31),d=(n(330),n(3)),b=n(35),m=n(67),v=n(37),h=n(36),g=n(38),O=n(2),j=n(32),y=n(130),w=n.n(y),x=n(45),S=n.n(x),k=n(54),P=n.n(k),E=n(69),R=n.n(E),C=n(49),N=n.n(C),A=n(70),D=n.n(A),I=n(131),q=n.n(I),T=n(140),Q=n.n(T),V=n(142),M=n.n(V),H=n(141),U=n.n(H),B=n(132),L=n.n(B),W=n(137),F=n.n(W),$=n(138),_=n.n($),G=n(133),J=n.n(G),z=n(134),Y=n.n(z),K=n(135),X=n.n(K),Z=n(136),ee=n.n(Z),te=n(139),ne=n.n(te),re=n(122),ae=n.n(re),oe=(n(166),n(125)),ce=n.n(oe),ue=n(65),ie=n.n(ue),se=n(127),le=n.n(se),pe=n(123),fe=n.n(pe);var de=Object(f.connect)({},function(e){return c.a.createElement(ce.a,{fullScreen:!0,open:e.open},c.a.createElement(P.a,null,c.a.createElement(R.a,null,c.a.createElement(D.a,{color:"inherit",onClick:e.onClose,"aria-label":"Close"},c.a.createElement(le.a,null)),c.a.createElement(ie.a,{variant:"h6",color:"inherit"},"Scan QR code"))),c.a.createElement(fe.a,{style:{width:"100%"},onScan:function(t){t&&(e.onData(t),e.onClose())}}))}),be=n(145),me=n(128),ve=n.n(me),he=n(39),ge=(n(280),{model:null});function Oe(){var e=Object(d.a)(["setPages"]);return Oe=function(){return e},e}function je(){var e=Object(d.a)(["setSurveyPage"]);return je=function(){return e},e}function ye(){var e=Object(d.a)(["setSurveyData"]);return ye=function(){return e},e}function we(){var e=Object(d.a)(["surveyData"]);return we=function(){return e},e}function xe(){var e=Object(d.a)(["initSurvey"]);return xe=function(){return e},e}function Se(){var e=Object(d.a)(["questions"]);return Se=function(){return e},e}function ke(){var e=Object(d.a)(["",""]);return ke=function(){return e},e}function Pe(){var e=Object(d.a)(["pageNum"]);return Pe=function(){return e},e}function Ee(){var e=Object(d.a)(["surveyData"]);return Ee=function(){return e},e}function Re(){var e=Object(d.a)(["pageNum"]);return Re=function(){return e},e}function Ce(){var e=Object(d.a)(["pageNum"]);return Ce=function(){return e},e}function Ne(){var e=Object(d.a)(["surveyData"]);return Ne=function(){return e},e}he.JsonObject.metaData.addProperty("question",{name:"cerebralbutton"});var Ae=function(e){function t(){return Object(b.a)(this,t),Object(v.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props,n=t.get,r=t.theme.palette,a=he.StylesManager.ThemeColors.default;a["$main-color"]=r.primary.main,a["$main-hover-color"]=r.primary.dark,a["$text-color"]=r.text.primary,a["$header-color"]=r.secondary.main,a["$border-color"]=r.divider,a["$header-background-color"]=r.secondary.main,a["$body-background-color"]=r.background.paper,a["$body-container-background-color"]=r.background.paper,a["$inputs-background-color"]=r.background.default,a["$error-color"]=r.error.main,a["$error-background-color"]=r.error.light,he.StylesManager.applyTheme("default"),this.model=new he.Model(this.props.questions),ge.model=this.model;var o=n(Object(O.state)(Ne()));o&&(this.model.data=o);var c=n(Object(O.state)(Ce()));void 0!==c&&(this.model.currentPageNo=c),this.props.reaction("changePage",{pageNum:Object(O.state)(Re())},function(t){var n=t.pageNum;return e.model.currentPageNo=n}),this.props.reaction("changeData",{data:Object(O.state)(Ee())},function(t){var n=t.data;return e.model.data=n}),this.updatePages(this.model),this.props.setData({data:this.model.data})}},{key:"updatePages",value:function(e){this.props.setPages({pages:e.visiblePages.map(function(e){return{error:e.hasErrors(!1,!1),name:e.name,title:e.title}})})}},{key:"render",value:function(){var e=this,t=this.props,n=t.get,r=Object(be.a)(t,["get"]);return c.a.createElement(he.Survey,Object.assign({},r,{model:this.model,onCurrentPageChanged:function(e){n(Object(O.state)(Pe()))!==e.currentPageNo&&r.setPage({pageNum:e.currentPageNo})},onPageVisibleChanged:this.updatePages.bind(this),onPageAdded:this.updatePages.bind(this),onValueChanged:function(t,n){n.name,n.value;r.setData({data:t.data}),setTimeout(function(){return e.updatePages(t)})},completedHtml:ve.a.renderToString(r.completedHtml),onAfterRenderQuestion:function(e,t){var r=t.question,a=t.htmlElement;if(r.cerebralbutton){var o=n(Object(O.sequences)(ke(),r.cerebralbutton));i.a.render(c.a.createElement(N.a,{onClick:function(){return o()}},r.title),a)}}}))}}]),t}(o.Component),De=Object(f.connect)({questions:Object(O.state)(Se()),init:Object(O.sequences)(xe()),data:Object(O.state)(we()),setData:Object(O.sequences)(ye()),setPage:Object(O.sequences)(je()),setPages:Object(O.sequences)(Oe())},Object(j.withTheme)()(Ae)),Ie=n(129),qe=n.n(Ie);function Te(){var e=Object(d.a)(["submitResults"]);return Te=function(){return e},e}function Qe(){var e=Object(d.a)(["createSheet"]);return Qe=function(){return e},e}function Ve(){var e=Object(d.a)(["google"]);return Ve=function(){return e},e}function Me(){var e=Object(d.a)(["logout"]);return Me=function(){return e},e}function He(){var e=Object(d.a)(["login"]);return He=function(){return e},e}function Ue(){var e=Object(d.a)(["init"]);return Ue=function(){return e},e}function Be(){var e=Object(d.a)(["hideSensorQRScanner"]);return Be=function(){return e},e}function Le(){var e=Object(d.a)(["hideDroneQRScanner"]);return Le=function(){return e},e}function We(){var e=Object(d.a)(["showSensorQRScanner"]);return We=function(){return e},e}function Fe(){var e=Object(d.a)(["showDroneQRScanner"]);return Fe=function(){return e},e}function $e(){var e=Object(d.a)(["sensorQRScannerActive"]);return $e=function(){return e},e}function _e(){var e=Object(d.a)(["droneQRScannerActive"]);return _e=function(){return e},e}function Ge(){var e=Object(d.a)(["questions"]);return Ge=function(){return e},e}function Je(){var e=Object(d.a)(["completeSurvey"]);return Je=function(){return e},e}function ze(){var e=Object(d.a)(["goPreviousPage"]);return ze=function(){return e},e}function Ye(){var e=Object(d.a)(["goNextPage"]);return Ye=function(){return e},e}function Ke(){var e=Object(d.a)(["pageNum"]);return Ke=function(){return e},e}function Xe(){var e=Object(d.a)(["pages"]);return Xe=function(){return e},e}function Ze(){var e=Object(d.a)(["setSurveyPage"]);return Ze=function(){return e},e}function et(){var e=Object(d.a)(["hideNavigation"]);return et=function(){return e},e}function tt(){var e=Object(d.a)(["showNavigation"]);return tt=function(){return e},e}function nt(){var e=Object(d.a)(["navigationOpen"]);return nt=function(){return e},e}var rt=ae.a.parse(window.location.search),at=Object(j.createMuiTheme)({palette:{type:rt.theme||"dark",primary:qe.a}});window.addEventListener("beforeinstallprompt",function(e){e.preventDefault(),void 0!==rt.install&&e.prompt()});var ot=function(e){function t(){return Object(b.a)(this,t),Object(v.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentWillMount",value:function(){this.props.init()}},{key:"render",value:function(){var e=this.props,t=e.classes;return c.a.createElement(j.MuiThemeProvider,{theme:at},c.a.createElement(c.a.Fragment,null,c.a.createElement(w.a,null),c.a.createElement("div",{className:"App"},c.a.createElement(P.a,{position:"fixed",className:t.appBar},c.a.createElement(R.a,null,c.a.createElement(D.a,{className:t.menuButton,color:"inherit",onClick:function(){return e.showNavigation()},"aria-label":"Menu"},c.a.createElement(q.a,null)),c.a.createElement(N.a,{color:"inherit",disabled:e.pages.some(function(e){return e.error}),onClick:function(){return e.submit()}},"Submit",c.a.createElement(L.a,null)),c.a.createElement("div",{className:t.grow}),c.a.createElement("div",{className:"g-signin2","data-theme":"dark"}))),c.a.createElement(J.a,{open:e.navigationOpen,onOpen:function(){return e.showNavigation()},onClose:function(){return e.hideNavigation()}},c.a.createElement(Y.a,null,e.pages.map(function(t,n){var r=t.name,a=t.title,o=t.error;return c.a.createElement(X.a,{key:r,button:!0,selected:n===e.pageNum,className:o?"page-err":"page-complete",onClick:function(){return e.setSurveyPage({pageNum:n})}},c.a.createElement(ee.a,null,o?c.a.createElement(F.a,null):c.a.createElement(_.a,null)),c.a.createElement(ne.a,{primary:a}))}))),c.a.createElement(de,{open:e.droneQRScannerActive,onClose:e.hideDroneQRScanner}),c.a.createElement(de,{open:e.sensorQRScannerActive,onClose:e.hideSensorQRScanner}),c.a.createElement(S.a,{square:!0},c.a.createElement(De,{isSinglePage:void 0!==rt.singlePage,completedHtml:c.a.createElement("div",null," woo done!"),onComplete:function(t){t.data;return e.submitResults()}})),c.a.createElement(P.a,{position:"fixed",className:t.bottomBar},c.a.createElement(Q.a,{steps:e.pages.length,position:"static",activeStep:e.pageNum,className:t.mobileStepper,nextButton:c.a.createElement(N.a,{color:"primary",disabled:e.pageNum===e.pages.length-1,onClick:function(){return e.goNextPage()}},"Next",c.a.createElement(U.a,null)),backButton:c.a.createElement(N.a,{color:"primary",disabled:0===e.pageNum,onClick:function(){return e.goPreviousPage()}},c.a.createElement(M.a,null),"Previous")})))))}}]),t}(o.Component),ct=Object(f.connect)({navigationOpen:Object(O.state)(nt()),showNavigation:Object(O.sequences)(tt()),hideNavigation:Object(O.sequences)(et()),setSurveyPage:Object(O.sequences)(Ze()),pages:Object(O.state)(Xe()),pageNum:Object(O.state)(Ke()),goNextPage:Object(O.sequences)(Ye()),goPreviousPage:Object(O.sequences)(ze()),submit:Object(O.sequences)(Je()),questions:Object(O.state)(Ge()),droneQRScannerActive:Object(O.state)(_e()),sensorQRScannerActive:Object(O.state)($e()),showDroneQRScanner:Object(O.sequences)(Fe()),showSensorQRScanner:Object(O.sequences)(We()),hideDroneQRScanner:Object(O.sequences)(Le()),hideSensorQRScanner:Object(O.sequences)(Be()),init:Object(O.sequences)(Ue()),login:Object(O.sequences)(He()),logout:Object(O.sequences)(Me()),google:Object(O.state)(Ve()),createSheet:Object(O.sequences)(Qe()),submitResults:Object(O.sequences)(Te())},Object(j.withStyles)({root:{flexGrow:1},appBar:{top:0,bottom:"auto"},bottomBar:{bottom:0,top:"auto"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}})(ot)),ut=n(143),it=n(68),st=n(9),lt=n(71),pt=n.n(lt);function ft(){var e=Object(d.a)(["store.persistState"]);return ft=function(){return e},e}function dt(){var e=Object(d.a)(["",""]);return dt=function(){return e},e}function bt(){var e=Object(d.a)(["store.initialized"]);return bt=function(){return e},e}function mt(){var e=Object(d.a)(["val"]);return mt=function(){return e},e}function vt(){var e=Object(d.a)(["",""]);return vt=function(){return e},e}function ht(){var e=Object(d.a)(["val"]);return ht=function(){return e},e}function gt(){var e=Object(d.a)(["",""]);return gt=function(){return e},e}function Ot(){var e=Object(d.a)(["val"]);return Ot=function(){return e},e}function jt(){var e=Object(d.a)(["store.initialized"]);return jt=function(){return e},e}var yt,wt,xt=n(7),St=n.n(xt),kt=n(15),Pt=n(72),Et=n.n(Pt),Rt=n(144),Ct=n.n(Rt),Nt=n(55),At=n.n(Nt),Dt=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(v.a)(this,Object(h.a)(t).call(this,e))).name="GetLocationError",n}return Object(g.a)(t,e),t}(p.CerebralError),It=function(e){function t(e){var n;Object(b.a)(this,t);var r=e;return e.result&&r.result.error&&(r=e.result.error),(n=Object(v.a)(this,Object(h.a)(t).call(this,r.message))).name="GAPIError",n.result=r,n}return Object(g.a)(t,e),t}(p.CerebralError),qt={getCurrentLoc:function(){var e=Object(kt.a)(St.a.mark(function e(){var t;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new Et.a(function(e,t){return navigator.geolocation.getCurrentPosition(e,t)}).then(function(e){return e.coords});case 3:return e.abrupt("return",e.sent);case 6:e.prev=6,e.t0=e.catch(0),e.t1=e.t0.code,e.next=1===e.t1?11:2===e.t1?13:3===e.t1?15:17;break;case 11:return t="Permission denied",e.abrupt("break",18);case 13:return t="Position unavailable",e.abrupt("break",18);case 15:return t="Timeout obtaining position",e.abrupt("break",18);case 17:t="Unknown error";case 18:throw new Dt(t);case 19:case"end":return e.stop()}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}()},Tt={setAnswer:function(e,t){ge.model.setValue(e,t)},setPage:function(e){ge.model.currentPageNo=e},nextPage:function(){return ge.model.nextPage()},previousPage:function(){return ge.model.prevPage()},setData:function(e){ge.model.data=e},submit:function(){return ge.model.completeLastPage()}},Qt={init:function(){var e=Object(kt.a)(St.a.mark(function e(t){var n,r,a=this;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.login,r=t.logout,wt=Et.a.resolve(Ct()()).tap(function(e){var t=e.load;return new Et.a(function(e,n){return t("client",{callback:e,onerror:n,timeout:1e4,ontimeout:n})})}).tap(function(e){return e.client.init({discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest","https://sheets.googleapis.com/$discovery/rest?version=v4"]})}).tap(function(e){var t=e.auth2.getAuthInstance(),o=function(e){e?n&&a.context.get(n)():(yt=void 0,r&&a.context.get(r)())};t.isSignedIn.listen(o),o(t.isSignedIn.get())}),e.next=4,wt;case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),get:function(){var e=Object(kt.a)(St.a.mark(function e(){return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!yt){e.next=2;break}return e.abrupt("return",yt);case 2:return e.next=4,wt.tap(function(e){var t=e.auth2,n={scope:["https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive.appdata"].reduce(function(e,t){return"".concat(e," ").concat(t)})};return t.getAuthInstance().currentUser.get().grant(n)}).get("client");case 4:return yt=e.sent,e.abrupt("return",yt);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},Vt={getData:function(){var e=Object(kt.a)(St.a.mark(function e(){var t,n,r,a;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.gapiClient.get();case 2:return t=e.sent,n=t.drive,e.prev=4,e.next=7,n.files.list({spaces:"appDataFolder",q:"name='config.json'",fields:"files(id, appProperties)"});case 7:a=e.sent,r=a.result,e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(4),new It(e.t0);case 14:return e.abrupt("return",r.files[0].appProperties);case 15:case"end":return e.stop()}},e,this,[[4,11]])}));return function(){return e.apply(this,arguments)}}(),initData:function(){var e=Object(kt.a)(St.a.mark(function e(t){var n,r,a,o,c,u;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.body,r=void 0===n?{}:n,e.next=3,this.context.gapiClient.get();case 3:return a=e.sent,o=a.drive,e.prev=5,e.next=8,o.files.create({resource:{name:"config.json",mimeType:"application/json",parents:["appDataFolder"],appProperties:r}});case 8:return c=e.sent,u=c.result,e.abrupt("return",u);case 13:throw e.prev=13,e.t0=e.catch(5),new It(e.t0);case 16:case"end":return e.stop()}},e,this,[[5,13]])}));return function(t){return e.apply(this,arguments)}}()},Mt={createSheet:function(){var e=Object(kt.a)(St.a.mark(function e(){var t,n,r,a;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.gapiClient.get();case 2:return t=e.sent,n=t.sheets,e.prev=4,e.next=7,n.spreadsheets.create({},{});case 7:return r=e.sent,a=r.result,e.abrupt("return",a);case 12:throw e.prev=12,e.t0=e.catch(4),new It(e.t0);case 15:case"end":return e.stop()}},e,this,[[4,12]])}));return function(){return e.apply(this,arguments)}}(),getSheet:function(){var e=Object(kt.a)(St.a.mark(function e(t){var n,r,a,o,c;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.gapiClient.get();case 2:return n=e.sent,r=n.sheets,e.prev=4,e.next=7,r.spreadsheets.values.get({spreadsheetId:t,range:["Sheet1"]});case 7:o=e.sent,a=o.result,e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(4),new It(e.t0);case 14:if(a.values){e.next=16;break}return e.abrupt("return",[]);case 16:return c=At.a.utils.aoa_to_sheet(a.values),e.abrupt("return",At.a.utils.sheet_to_json(c));case 18:case"end":return e.stop()}},e,this,[[4,11]])}));return function(t){return e.apply(this,arguments)}}(),writeSheet:function(){var e=Object(kt.a)(St.a.mark(function e(t,n){var r,a,o,c,u,i;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.gapiClient.get();case 2:return r=e.sent,a=r.sheets,o=At.a.utils.json_to_sheet(n),c=At.a.utils.sheet_to_json(o,{header:1}),e.prev=6,e.next=9,a.spreadsheets.values.update({spreadsheetId:t,range:o["!ref"],valueInputOption:"USER_ENTERED",includeValuesInResponse:!1},{majorDimension:"ROWS",values:c});case 9:return u=e.sent,i=u.result,e.abrupt("return",i);case 14:throw e.prev=14,e.t0=e.catch(6),new It(e.t0);case 17:case"end":return e.stop()}},e,this,[[6,14]])}));return function(t,n){return e.apply(this,arguments)}}(),addRow:function(){var e=Object(kt.a)(St.a.mark(function e(t,n,r){var a,o;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.context.gapiClient.get();case 2:return a=e.sent,o=a.sheets,e.abrupt("return",o.spreadsheets.values.append({spreadsheetId:t,valueInputOption:"USER_ENTERED",insertDataOption:"INSERT_ROWS",includeValuesInResponse:!1},{majorDimension:"ROWS",values:[r]}));case 5:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}()};function Ht(e){var t=e.survey,n=e.props;return t.setAnswer(n.question,n.answer)}function Ut(){return(Ut=Object(kt.a)(St.a.mark(function e(t){var n,r;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.gapiClient,r=t.props,e.abrupt("return",n.init(r));case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function Bt(e){return Lt.apply(this,arguments)}function Lt(){return(Lt=Object(kt.a)(St.a.mark(function e(t){var n,r;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.googlesheets,e.next=3,n.createSheet();case 3:return r=e.sent,e.abrupt("return",{sheet:r});case 5:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function Wt(){return(Wt=Object(kt.a)(St.a.mark(function e(t){var n,r,a;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.props,r=n.results,a=r.map(function(e){var t={};return Object.keys(e).forEach(function(n){e[n]&&"object"===typeof e[n]?t["$$"+n]=JSON.stringify(e[n]):t[n]=e[n]}),t}),e.abrupt("return",{results:a});case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function Ft(){return(Ft=Object(kt.a)(St.a.mark(function e(t){var n,r,a;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.props,r=n.results,a=r.map(function(e){var t={};return Object.keys(e).forEach(function(n){n.startsWith("$$")?t[n.substring(2)]=JSON.parse(e[n]):t[n]=e[n]}),t}),e.abrupt("return",{results:a});case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function $t(){return($t=Object(kt.a)(St.a.mark(function e(t){var n,r,a,o;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.googlesheets,r=t.props,a=r.resultsId,e.next=4,n.getSheet(a);case 4:if(e.t0=e.sent,e.t0){e.next=7;break}e.t0=[];case 7:return o=e.t0,e.abrupt("return",{results:o});case 9:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function _t(){return(_t=Object(kt.a)(St.a.mark(function e(t){var n,r,a,o;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.googlesheets,r=t.props,a=r.results,o=r.resultsId,e.abrupt("return",n.writeSheet(o,a));case 3:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function Gt(){return(Gt=Object(kt.a)(St.a.mark(function e(t){var n,r,a;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.googleappdata,r=t.props,e.next=3,n.initData(r);case 3:return a=e.sent,e.abrupt("return",{result:a});case 5:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function Jt(){return(Jt=Object(kt.a)(St.a.mark(function e(t){var n,r,a;return St.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.googleappdata,r=t.path,e.next=3,n.getData();case 3:if(!(a=e.sent)){e.next=8;break}return e.abrupt("return",r.found({body:a}));case 8:return e.abrupt("return",r.notfound());case 9:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function zt(){var e=Object(d.a)(["resultsId"]);return zt=function(){return e},e}function Yt(){var e=Object(d.a)(["resultsId"]);return Yt=function(){return e},e}function Kt(){var e=Object(d.a)(["pastData"]);return Kt=function(){return e},e}function Xt(){var e=Object(d.a)(["results"]);return Xt=function(){return e},e}function Zt(){var e=Object(d.a)(["surveyData"]);return Zt=function(){return e},e}function en(){var e=Object(d.a)(["pastData"]);return en=function(){return e},e}function tn(){var e=Object(d.a)(["loggedin"]);return tn=function(){return e},e}function nn(){var e=Object(d.a)(["pastData"]);return nn=function(){return e},e}function rn(){var e=Object(d.a)(["loggedin"]);return rn=function(){return e},e}function an(){var e=Object(d.a)(["loggedin"]);return an=function(){return e},e}function on(){var e=Object(d.a)(["results"]);return on=function(){return e},e}function cn(){var e=Object(d.a)(["pastData"]);return cn=function(){return e},e}function un(){var e=Object(d.a)(["resultsId"]);return un=function(){return e},e}function sn(){var e=Object(d.a)(["resultsId"]);return sn=function(){return e},e}function ln(){var e=Object(d.a)(["body.resultsId"]);return ln=function(){return e},e}function pn(){var e=Object(d.a)(["resultsId"]);return pn=function(){return e},e}function fn(){var e=Object(d.a)(["sheet.spreadsheetId"]);return fn=function(){return e},e}function dn(){var e=Object(d.a)(["body.resultsId"]);return dn=function(){return e},e}function bn(){var e=Object(d.a)(["body"]);return bn=function(){return e},e}function mn(){var e=Object(d.a)(["locations"]);return mn=function(){return e},e}function vn(){var e=Object(d.a)(["answer"]);return vn=function(){return e},e}function hn(){var e=Object(d.a)(["question"]);return hn=function(){return e},e}function gn(){var e=Object(d.a)(["surveyData.locations"]);return gn=function(){return e},e}function On(){var e=Object(d.a)(["locations"]);return On=function(){return e},e}function jn(){var e=Object(d.a)(["pages"]);return jn=function(){return e},e}function yn(){var e=Object(d.a)(["pages"]);return yn=function(){return e},e}function wn(){var e=Object(d.a)(["pageNum"]);return wn=function(){return e},e}function xn(){var e=Object(d.a)(["pageNum"]);return xn=function(){return e},e}function Sn(){var e=Object(d.a)(["data"]);return Sn=function(){return e},e}function kn(){var e=Object(d.a)(["surveyData"]);return kn=function(){return e},e}function Pn(){var e=Object(d.a)(["navigationOpen"]);return Pn=function(){return e},e}function En(){var e=Object(d.a)(["navigationOpen"]);return En=function(){return e},e}function Rn(){var e=Object(d.a)(["sensorQRScannerActive"]);return Rn=function(){return e},e}function Cn(){var e=Object(d.a)(["sensorQRScannerActive"]);return Cn=function(){return e},e}function Nn(){var e=Object(d.a)(["droneQRScannerActive"]);return Nn=function(){return e},e}function An(){var e=Object(d.a)(["droneQRScannerActive"]);return An=function(){return e},e}function Dn(){var e=Object(d.a)(["store.init"]);return Dn=function(){return e},e}function In(){var e=Object(d.a)(["logout"]);return In=function(){return e},e}function qn(){var e=Object(d.a)(["logout"]);return qn=function(){return e},e}function Tn(){var e=Object(d.a)(["login"]);return Tn=function(){return e},e}function Qn(){var e=Object(d.a)(["login"]);return Qn=function(){return e},e}var Vn,Mn=[Object(st.c)(Object(O.props)(Qn()),Object(O.sequences)(Tn())),Object(st.c)(Object(O.props)(qn()),Object(O.sequences)(In())),function(e){return Ut.apply(this,arguments)},function(e){return(0,e.get)(Object(O.sequences)(Dn()))()}],Hn=[Object(st.c)(Object(O.state)(An()),!0)],Un=[Object(st.c)(Object(O.state)(Nn()),!1)],Bn=[Object(st.c)(Object(O.state)(Cn()),!0)],Ln=[Object(st.c)(Object(O.state)(Rn()),!1)],Wn=[Object(st.c)(Object(O.state)(En()),!0)],Fn=[Object(st.c)(Object(O.state)(Pn()),!1)],$n=[Object(st.c)(Object(O.state)(kn()),Object(O.props)(Sn()))],_n=[Ht],Gn=[Object(st.c)(Object(O.state)(xn()),Object(O.props)(wn()))],Jn=[Object(st.c)(Object(O.state)(yn()),Object(O.props)(jn()))],zn=[function(e){return{error:e.survey.nextPage()}}],Yn=[function(e){return{error:e.survey.previousPage()}}],Kn=[function(e){var t=e.survey;return e.props,{done:t.submit()}}],Xn=[function(e){return e.geolocation.getCurrentLoc().then(function(e){return{currentLoc:{latitude:e.latitude,longitude:e.longitude}}})},Object(st.c)(Object(O.props)(On()),Object(O.state)(gn())),function(e){var t=e.props;return{locations:t.locations.concat(t.currentLoc)}},Object(st.c)(Object(O.props)(hn()),"locations"),Object(st.c)(Object(O.props)(vn()),Object(O.props)(mn())),Ht],Zn=[function(e){return Jt.apply(this,arguments)},{found:[],notfound:[Bt,Object(st.c)(Object(O.props)(bn()),{}),Object(st.c)(Object(O.props)(dn()),Object(O.props)(fn())),function(e){return Gt.apply(this,arguments)}]},Object(st.c)(Object(O.state)(pn()),Object(O.props)(ln()))],er=[Zn,Object(st.c)(Object(O.props)(sn()),Object(O.state)(un())),function(e){return $t.apply(this,arguments)},function(e){return Ft.apply(this,arguments)},Object(st.c)(Object(O.state)(cn()),Object(O.props)(on())),Object(st.c)(Object(O.state)(an()),!0)],tr=[Object(st.c)(Object(O.state)(rn()),!1),Object(st.c)(Object(O.state)(nn()),[])],nr=[Bt],rr=[Object(st.d)(Object(O.state)(tn())),{true:[],false:er},Object(st.b)(Object(O.state)(en()),Object(O.state)(Zt())),Object(st.c)(Object(O.props)(Xt()),Object(O.state)(Kt())),function(e){return Wt.apply(this,arguments)},Object(st.c)(Object(O.props)(Yt()),Object(O.state)(zt())),function(e){return _t.apply(this,arguments)}],ar=(Vn=["pageNum","surveyData"],{providers:{localstore:{get:function(e){return pt.a.get(e)},set:function(e,t){return pt.a.set(e,t)},clear:function(){return pt.a.clear()}}},state:{initialized:!1},sequences:{persistState:[Object(st.d)(Object(O.state)(jt())),{true:function(e){var t=e.localstore,n=e.props,r=n.key,a=n.val;return{success:t.set(r,a)}},false:[]}],init:[Vn.map(function(e){return[function(t){return{val:t.localstore.get(e)}},Object(st.d)(Object(O.props)(Ot()),function(e){return e&&"object"===typeof e}),{true:[Object(st.a)(Object(O.state)(gt(),e),Object(O.props)(ht()))],false:[Object(st.c)(Object(O.state)(vt(),e),Object(O.props)(mt()))]}]}),Object(st.c)(Object(O.state)(bt()),!0)]},reactions:Vn.map(function(e){return Object(it.a)({},e,Object(p.Reaction)({val:Object(O.state)(dt(),e)},function(t){var n=t.val;return(0,t.get)(Object(O.sequences)(ft()))({key:e,val:n})}))}).reduce(function(e,t){return Object.assign(e,t)},{})}),or={sequences:a,state:{resultsId:null,navigationOpen:!0,droneQRScannerActive:!1,sensorQRScannerActive:!1,surveyData:null,pastData:[],pages:[],pageNum:0,questions:{showNavigationButtons:!1,goNextPageAutomatic:!0,clearInvisibleValues:"onHidden",checkErrorsMode:"onValueChanged",pages:[{name:"general",title:"General",elements:[{name:"purpose",title:"Purpose",type:"dropdown",choices:["UAV","Planting","Spraying","Tilling","Harvest"],defaultValue:"UAV"},{name:"datetime",title:"Date/Time of data",type:"text",inputType:"datetime-local",defaultValue:ut.DateTime.local().toFormat("yyyy-MM-dd'T'HH:mm:ss")},{type:"panel",elements:[{name:"locations",title:"Collection locations",type:"paneldynamic",panelCount:1,minPanelCount:1,panelAddText:"Add Location",panelRemoveText:"Remove Location",templateTitle:"Location #{panelIndex}",templateElements:[{name:"latitude",title:"Latitude",type:"text",isRequired:!0},{name:"longitude",title:"Longitude",type:"text",isRequired:!0}]},{name:"location-button",title:"Add current location",type:"html",cerebralbutton:"setCurrentLocation"}]},{name:"notes",title:"Notes or comments",type:"comment"}]},{name:"place",title:"Place",visibleIf:'{purpose} == "UAV"',elements:[{name:"client",title:"Grower (or Client)",type:"text",placeHolder:"Farmer Frank"},{name:"operation",title:"Farm (or Operation)",type:"text",placeHolder:"Frank Farms"},{name:"site",title:"Field (or Site)",type:"text",placeHolder:"East Field"},{name:"crop",title:"Crop",type:"text",placeHolder:"corn"},{name:"prev-crop",title:"Previous Crop",type:"text",placeHolder:"beans"},{name:"weather",title:"Weather",type:"panel",elements:[{name:"weather-button",title:"Get Current Weather",type:"html",cerebralbutton:"setCurrentWeather"},{name:"temperature",title:"Temperature",type:"text",placeHolder:"60 F"},{name:"windspeed",title:"Wind Speed",type:"text",placeHolder:"10 mph"},{name:"winddirection",title:"Wind Direction",type:"text",placeHolder:"35 deg"}]}]},{name:"uav-operator",title:"UAV Operator",visibleIf:'{purpose} == "UAV"',elements:[{name:"remote-pics",title:"Remote Pilot in Command (PIC)",description:"remote PIC - A person who holds a remote pilot certificate with an sUAS rating and has the final authority and responsibility for the operation and safety of an sUAS operation conducted under part 107.",type:"paneldynamic",panelCount:1,minPanelCount:1,panelAddText:"Add Remote PIC",panelRemoveText:"Remove Remote PIC",templateTitle:"Remote PIC #{panelIndex}",templateElements:[{name:"remote-pic-name",title:"Name",type:"text",isRequired:!0,placeHolder:"Rusty Shackleford"},{name:"remote-pic-certificate",title:"Certificate Number or equivalent",type:"text",isRequired:!0,placeHolder:"1234567",validators:[{type:"regex",regex:/^[0-9]{7}$/,text:"Invalid license number"}]}]},{name:"observer",title:"Visual Observer (VO)",description:"VO - A person acting as a flightcrew member who assists the small UA remote PIC and the person manipulating the controls to see and avoid other air traffic or objects aloft or on the ground.",type:"paneldynamic",panelCount:0,panelAddText:"Add VO",panelRemoveText:"Remove VO",templateTitle:"VO #{panelIndex}",templateElements:[{name:"observer-name",title:"Name",type:"text",isRequired:!0,placeHolder:"John Doe"}]}]},{name:"uav-drone",title:"Drone Info",visibleIf:'{purpose} == "UAV"',elements:[{name:"drone-screenshots",title:"DroneDeploy Screenshots",type:"panel",elements:[{name:"drone-flight-planning",title:"Screenshot of Flight Planning",type:"file",allowMultiple:!1},{name:"drone-advanced-flight-planning",title:"Screenshot of Advanced Flight Planning",type:"file",allowMultiple:!1}]},{name:"drone-qr",title:"Scan drone QR code",type:"html",cerebralbutton:"showDroneQRScanner"},{name:"uav-drone-type",title:"Type",type:"dropdown",isRequired:!0,defaultValue:"Fixed wing",hasOther:!0,choices:["Fixed wing","Multi-rotor","Helicopter"]},{name:"uav-drone",title:"Drone",type:"dropdown",hideIfChoicesEmpty:!0,choices:[{make:"Test",model:"testtest",type:"Fixed wing"}].map(function(e,t){return{text:e.make+" "+e.model,value:e.make+" "+e.model,visibleIf:'{uav-drone-type} == "'.concat(e.type,'"')}})},{name:"uav-drone-make",title:"Make",type:"text",enableIf:"{uav-drone} empty"},{name:"uav-drone-model",title:"Model",type:"text",enableIf:"{uav-drone} empty"}]},{name:"uav-sensors",title:"Sensors",visibleIf:'{purpose} == "UAV"',elements:[{name:"sensor-qr",type:"html",cerebralbutton:"showSensorQRScanner"},{name:"sensors",title:"Sensors",type:"paneldynamic",panelCount:0,panelAddText:"Add Sensor",panelRemoveText:"Remove Sensor",templateTitle:"Sensor #{panelIndex}",templateElements:[{name:"uav-sensor-type",valueName:"type",title:"Type",type:"dropdown",isRequired:!0,hasOther:!0,choices:["RGB","Multispectral","Hyperspectral","LiDAR","Thermal"]},{name:"uav-sensor",valueName:"sensor",title:"Sensor",type:"dropdown",hideIfChoicesEmpty:!0,choices:[{make:"Sony",model:"A6000",type:"RGB"},{make:"Parrot",model:"Sequoia",type:"Multispectral"}].map(function(e,t){return{text:e.make+" "+e.model,value:e.make+" "+e.model,visibleIf:'{panel.type} == "'.concat(e.type,'"')}})},{name:"uav-sensor-make",valueName:"sensor.make",title:"Make",type:"text",enableIf:"{panel.sensor} empty"},{name:"uav-sensor-model",valueName:"model",title:"Model",type:"text",enableIf:"{panel.sensor} empty"}]}]},{name:"b4ufly",title:"B4UFLY Status",visibleIf:'{purpose} == "UAV"',elements:[{name:"b4ufly-status",title:"Status",type:"dropdown",isRequired:!0,choices:["proceed with caution","flying in controlled airspace (class B/C/D/E)","other"]},{name:"b4ufly-extra",title:"",type:"panel",visibleIf:'{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)" or {b4ufly-status} == "other"',elements:[{name:"b4ufly-airport-operator",title:"Airport Operator Contact",type:"text",requiredIf:'{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"'},{name:"b4ufly-control-tower",title:"Control Tower Contact",type:"text",requiredIf:'{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"'},{name:"b4ufly-prior-authorization",title:"Prior Authorization",type:"text",requiredIf:'{b4ufly-status} == "flying in controlled airspace (class B/C/D/E)"'}]},{name:"b4ufly-options",title:"Options",type:"checkbox",isRequired:!0,choices:["checked NOTAMS","checked flight restrictions","checked local restrictions","checked upcoming restrictions","checked national parks"]},{name:"b4ufly-certificate",title:"COW or COA #",type:"text"}]},{name:"planting",visibleIf:'!({purpose} == "UAV")',elements:[{name:"nyi",type:"html",html:"Not yet implemented"}]}]}},catch:[[Error,function(e){var t=e.error;return console.error(t)}]],providers:r,modules:{store:ar}},cr=Object(p.default)(or,{devtools:null});i.a.render(c.a.createElement(f.Container,{app:cr},c.a.createElement(ct,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/metadata-app",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/metadata-app","/service-worker.js");s?(function(e,t){fetch(e).then(function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):l(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):l(t,e)})}}()}},[[146,2,1]]]);
//# sourceMappingURL=main.2c9b02bc.chunk.js.map