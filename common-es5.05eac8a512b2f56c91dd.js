function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0Z1T":function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var o=n("748+"),i=n("FHFX"),a=n("fXoL"),c=n("ofXK"),r=n("1kSV");function s(e,t){if(1&e){var n=a.Ub();a.Tb(0,"a",19),a.fc("click",(function(e){a.Bc(n);var t=a.ic().$implicit;return a.ic(2).openModalAsignarRoles(t)})),a.Ob(1,"i",20),a.Sb()}}function l(e,t){if(1&e){var n=a.Ub();a.Tb(0,"a",21),a.fc("click",(function(e){a.Bc(n);var t=a.ic().$implicit;return a.ic(2).openModalVerDatosPaciente(t)})),a.Ob(1,"i",22),a.Sb()}}function d(e,t){if(1&e&&(a.Tb(0,"tr"),a.Tb(1,"td",13),a.Kc(2),a.Sb(),a.Tb(3,"td"),a.Tb(4,"div",14),a.Tb(5,"div",15),a.Tb(6,"p",16),a.Kc(7),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(8,"td"),a.Tb(9,"div",14),a.Tb(10,"div",15),a.Tb(11,"p",16),a.Kc(12),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(13,"td"),a.Tb(14,"div",14),a.Tb(15,"div",15),a.Tb(16,"p",16),a.Kc(17),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(18,"td"),a.Tb(19,"div",14),a.Tb(20,"div",15),a.Tb(21,"p",16),a.Kc(22),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(23,"td"),a.Tb(24,"div",14),a.Tb(25,"div",15),a.Tb(26,"p",16),a.Kc(27),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(28,"td"),a.Ic(29,s,2,0,"a",17),a.Ic(30,l,2,0,"a",18),a.Sb(),a.Sb()),2&e){var n=t.$implicit,o=t.index,i=a.ic(2);a.Ab(2),a.Mc(" ",o+1," "),a.Ab(5),a.Lc(n.name),a.Ab(5),a.Lc(n.lastname),a.Ab(5),a.Lc(n.email),a.Ab(5),a.Lc(n.ci),a.Ab(5),a.Lc(n.telefono),a.Ab(2),a.pc("ngIf",i.tableFor!==i.ROL_DOCTOR),a.Ab(1),a.pc("ngIf",i.tableFor===i.ROL_DOCTOR)}}function b(e,t){if(1&e&&(a.Rb(0),a.Tb(1,"div",8),a.Tb(2,"table",9),a.Tb(3,"thead"),a.Tb(4,"tr"),a.Tb(5,"th",10),a.Kc(6,"#"),a.Sb(),a.Tb(7,"th",11),a.Kc(8,"Nombre"),a.Sb(),a.Tb(9,"th",11),a.Kc(10,"Apellido"),a.Sb(),a.Tb(11,"th",11),a.Kc(12,"Correo"),a.Sb(),a.Tb(13,"th",11),a.Kc(14,"c\xe9dula"),a.Sb(),a.Tb(15,"th",11),a.Kc(16,"Tel\xe9fono"),a.Sb(),a.Tb(17,"th"),a.Kc(18," Acciones "),a.Sb(),a.Sb(),a.Sb(),a.Tb(19,"tbody"),a.Ic(20,d,31,8,"tr",12),a.Sb(),a.Sb(),a.Sb(),a.Qb()),2&e){var n=t.ngIf;a.Ab(20),a.pc("ngForOf",n)}}var u=function(){var e=function(){function e(t,n){_classCallCheck(this,e),this._userFacade=t,this._mainFacade=n,this.ROL_DOCTOR=o.h.DOCTOR,this.searchItem=""}return _createClass(e,[{key:"ngOnInit",value:function(){console.log(this.tableFor)}},{key:"getTitulo",value:function(){return this.tableFor==o.h.DOCTOR?"Pacientes":"Personal"}},{key:"getDescripcion",value:function(){return this.tableFor==o.h.DOCTOR?"Pacientes actuamente registrados":"Personal registrado, m\xe9dicos, directores y administradores."}},{key:"openModalCreateUpdate",value:function(e){this._userFacade.dispatchActionOpenModalCreateUpdateUser(e)}},{key:"openModalConfirm",value:function(e){}},{key:"openModalAsignarRoles",value:function(e){var t=this;this._mainFacade.getHospitalSesion().subscribe((function(n){var o=e.roles.find((function(e){return e.idHospital._id===n.idHospital._id}));t._userFacade.dispatchActionOpenModalAsignarRole(o,e._id)}))}},{key:"openModalSearchAddUsers",value:function(){this._userFacade.distpachActionOpenModalSearchUser()}},{key:"openModalVerDatosPaciente",value:function(e){this._userFacade.dispatchActionOpenModalDatosPaciente(e)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(a.Nb(i.c),a.Nb(i.a))},e.\u0275cmp=a.Hb({type:e,selectors:[["app-user-table"]],inputs:{tableFor:"tableFor",users$:"users$"},decls:12,vars:5,consts:[[1,"row"],[1,"col-12"],[1,"card","card-body"],[1,"card-title"],[1,"card-subtitle"],[1,"d-flex","mb-3","mt-3"],[1,"btn","btn-primary","ml-auto",3,"click"],[4,"ngIf"],[1,"table-responsive","table-bordered"],[1,"table","table-striped","mb-0","no-wrap","v-middle"],["scope","col",1,"text-center"],["scope","col"],[4,"ngFor","ngForOf"],[1,"text-center"],[1,"d-flex","align-items-center"],[1,"ml-3"],[1,"font-bold","mb-0"],["href","javascript: void(0);","class","link","placement","top","ngbTooltip","Asignar Roles",3,"click",4,"ngIf"],["href","javascript: void(0);","class","link","placement","top","ngbTooltip","Ver datos",3,"click",4,"ngIf"],["href","javascript: void(0);","placement","top","ngbTooltip","Asignar Roles",1,"link",3,"click"],[1,"mdi","mdi-city"],["href","javascript: void(0);","placement","top","ngbTooltip","Ver datos",1,"link",3,"click"],[1,"mdi","mdi-account"]],template:function(e,t){1&e&&(a.Tb(0,"div",0),a.Tb(1,"div",1),a.Tb(2,"div",2),a.Tb(3,"h4",3),a.Kc(4),a.Sb(),a.Tb(5,"h5",4),a.Kc(6),a.Sb(),a.Tb(7,"div",5),a.Tb(8,"button",6),a.fc("click",(function(e){return t.openModalSearchAddUsers()})),a.Kc(9,"Agregar usuarios"),a.Sb(),a.Sb(),a.Ic(10,b,21,1,"ng-container",7),a.jc(11,"async"),a.Sb(),a.Sb(),a.Sb()),2&e&&(a.Ab(4),a.Mc(" ",t.getTitulo()," "),a.Ab(2),a.Mc(" ",t.getDescripcion()," "),a.Ab(4),a.pc("ngIf",a.kc(11,3,t.users$)))},directives:[c.n,c.m,r.m],pipes:[c.b],styles:[""]}),e}()},EC2C:function(e,t,n){"use strict";n.r(t);var o=n("ofXK"),i=n("FtmO"),a=n("1kSV"),c=n("tyNb"),r=n("FHFX"),s=n("748+"),l=n("U43L"),d=n("o0su"),b=n("fXoL"),u=n("fNYS"),f=n("FUKR"),h=n("tUJ0");function m(e,t){1&e&&b.Ob(0,"div",8),2&e&&b.pc("id",t.$implicit)}function p(e,t){if(1&e){var n=b.Ub();b.Tb(0,"div",9),b.Tb(1,"input",10),b.fc("click",(function(e){return b.Bc(n),b.ic().terminarLlamada()})),b.Sb(),b.Sb()}}var g=function(){return["/doctor/seguimientos"]};function v(e,t){1&e&&(b.Tb(0,"div",11),b.Tb(1,"button",12),b.Kc(2," Volver a seguimientos"),b.Sb(),b.Sb()),2&e&&(b.Ab(1),b.pc("routerLink",b.sc(1,g)))}function S(e,t){1&e&&(b.Tb(0,"div"),b.Tb(1,"h3"),b.Kc(2,"Uniendose a la sala...."),b.Sb(),b.Sb())}function T(e,t){if(1&e&&b.Ob(0,"app-atender-seguimiento",20),2&e){var n=b.ic(2);b.pc("seguimiento",n.seguimientoPorAtender)}}function C(e,t){1&e&&(b.Tb(0,"div"),b.Kc(1,"cargando..."),b.Sb())}function y(e,t){if(1&e&&(b.Ob(0,"app-over-view",21),b.Ic(1,C,2,0,"div",7),b.jc(2,"async")),2&e){var n=b.ic(2);b.pc("userPerfil$",n.userProfile$),b.Ab(1),b.pc("ngIf",b.kc(2,2,n.isLoading$))}}function _(e,t){if(1&e&&b.Ob(0,"app-time-line",23),2&e){var n=b.ic(3);b.pc("idPaciente",n.seguimientoPorAtender.idPaciente._id)}}function k(e,t){if(1&e&&b.Ic(0,_,1,1,"app-time-line",22),2&e){var n=b.ic(2);b.pc("ngIf",n.showResumen)}}function O(e,t){if(1&e){var n=b.Ub();b.Rb(0),b.Tb(1,"div",13),b.Tb(2,"div",14),b.Tb(3,"ngb-tabset",15),b.fc("tabChange",(function(e){return b.Bc(n),b.ic().onChangeNav(e)})),b.Tb(4,"ngb-tab",16),b.Ic(5,T,1,1,"ng-template",17),b.Sb(),b.Tb(6,"ngb-tab",18),b.Ic(7,y,3,4,"ng-template",17),b.Sb(),b.Tb(8,"ngb-tab",19),b.Ic(9,k,1,1,"ng-template",17),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Qb()}}var I,A,w,P=((I=function(){function e(t,n,o,i){_classCallCheck(this,e),this._userFacade=t,this._toastService=n,this.route=o,this._ngxAgoraService=i,this.showResumen=!1,this.localCallId="agora_local",this.remoteCalls=[],this.cargandoLLamada=!0,this.isConected=!1,this.DOCTOR=s.h.DOCTOR,this.uid=Math.floor(100*Math.random())}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.userProfile$=this._userFacade.getPerfilUser(),this.isLoading$=this._userFacade.getLoadingPerfilUserStore(),this.seguimientoPorAtender=this.route.snapshot.data.seguimientoPorAtender,this.rolUser=this.route.snapshot.params.rol,this.client=this._ngxAgoraService.createClient({mode:"rtc",codec:"h264"}),this.assignClientHandlers(),this.localStream=this._ngxAgoraService.createStream({streamID:this.uid,audio:!0,video:!0,screen:!1}),this.assignLocalStreamHandlers(),this.initLocalStream((function(){return e.join((function(t){return e.publish()}),(function(t){e.cargandoLLamada=!1,e._toastService.showError("Error al unirse a la sala"),console.error(t)}))}))}},{key:"onChangeNav",value:function(e){var t=e.nextId;"datos-paciente"===t&&this._userFacade.loadPerfilUser({_id:this.seguimientoPorAtender.idPaciente._id}),"resumen"===t&&(this.showResumen=!0)}},{key:"join",value:function(e,t){this.client.join(null,this.seguimientoPorAtender._id,this.uid,e,t)}},{key:"publish",value:function(){this.client.publish(this.localStream,(function(e){return console.log("Publish local stream error: "+e)}))}},{key:"assignClientHandlers",value:function(){var e=this;this.client.on(l.a.LocalStreamPublished,(function(t){console.log("Publish local stream successfully"),e.cargandoLLamada=!1,e.isConected=!0,e._toastService.showInfo("Se ha unido a la sala con \xe9xito")})),this.client.on(l.a.Error,(function(t){console.log("Got error msg:",t.reason),"DYNAMIC_KEY_TIMEOUT"===t.reason&&e.client.renewChannelKey("",(function(){return console.log("Renewed the channel key successfully.")}),(function(e){return console.error("Renew channel key failed: ",e)}))})),this.client.on(l.a.RemoteStreamAdded,(function(t){e.client.subscribe(t.stream,{audio:!0,video:!0},(function(e){console.log("Subscribe stream failed",e)}))})),this.client.on(l.a.RemoteStreamSubscribed,(function(t){var n=t.stream,o=e.getRemoteId(n);e.remoteCalls.length||(e.remoteCalls.push(o),e._toastService.showSuccess("Se ha establecido comunicaci\xf3n con \xe9xito"),setTimeout((function(){return n.play(o)}),1e3))})),this.client.on(l.a.RemoteStreamRemoved,(function(t){e._toastService.showInfo("El usuario a salido de la sala");var n=t.stream;n&&(n.stop(),e.remoteCalls=[],e.remoteStreams=[],console.log("Remote stream is removed ".concat(n.getId())))})),this.client.on(l.a.PeerLeave,(function(t){var n=t.stream;n&&(n.stop(),e.remoteCalls=e.remoteCalls.filter((function(t){return t!=="".concat(e.getRemoteId(n))})),console.log("".concat(t.uid," left from this channel")))}))}},{key:"assignLocalStreamHandlers",value:function(){var e=this;this.localStream.on(l.d.MediaAccessAllowed,(function(){console.log("accessAllowed"),e._toastService.showInfo("Permisos de accesos a la c\xe1mara y micr\xf3fono otorgados exitosamente")})),this.localStream.on(l.d.MediaAccessDenied,(function(){console.log("accessDenied"),e._toastService.showError("No ha otorgados los accesos a la c\xe1mara ni al micr\xf3fono")}))}},{key:"initLocalStream",value:function(e){var t=this;this.localStream.init((function(){t.localStream.play(t.localCallId),e&&e()}),(function(e){return console.error("getUserMedia failed",e)}))}},{key:"getRemoteId",value:function(e){return"agora_remote-".concat(e.getId())}},{key:"terminarLlamada",value:function(){var e=this;this.client.leave((function(){e.localStream.stop(),e._toastService.showInfo("Usted a salido de la sala"),e.localStream.close(),e.isConected=!1,console.log("client leaves channel success")}),(function(e){console.log("channel leave failed"),console.error(e)}))}},{key:"ngOnDestroy",value:function(){this.terminarLlamada()}}]),e}()).\u0275fac=function(e){return new(e||I)(b.Nb(r.c),b.Nb(d.c),b.Nb(c.a),b.Nb(l.c))},I.\u0275cmp=b.Hb({type:I,selectors:[["app-video-chat-room"]],decls:9,vars:6,consts:[[1,"row","border","h-75","no-gutters"],[1,"col-8","bg-light","border","h-100","d-flex","justify-content-center","overlay-container"],["class","remote",3,"id",4,"ngFor","ngForOf"],["class","justify-content-center overlay-item",4,"ngIf"],[1,"row","flex-nowrap","room-members"],[1,"local",3,"id"],["style","padding: 100px;",4,"ngIf"],[4,"ngIf"],[1,"remote",3,"id"],[1,"justify-content-center","overlay-item"],["type","button","value","Terminar",1,"btn","btn-sm","btn-danger","ml-1",3,"click"],[2,"padding","100px"],[1,"btn","btn-info",3,"routerLink"],[1,"col-4","bg-light","border","scrollable","h-100"],[1,"card"],["type","pills",1,"custom-pills",3,"tabChange"],["title","Seguimiento","id","segumientos"],["ngbTabContent",""],["title","Datos usuario","id","datos-paciente"],["title","Resumen","id","resumen"],[3,"seguimiento"],[3,"userPerfil$"],[3,"idPaciente",4,"ngIf"],[3,"idPaciente"]],template:function(e,t){1&e&&(b.Tb(0,"div",0),b.Tb(1,"div",1),b.Ic(2,m,1,1,"div",2),b.Ic(3,p,2,0,"div",3),b.Tb(4,"div",4),b.Ob(5,"div",5),b.Sb(),b.Ic(6,v,3,2,"div",6),b.Ic(7,S,3,0,"div",7),b.Sb(),b.Ic(8,O,10,0,"ng-container",7),b.Sb()),2&e&&(b.Ab(2),b.pc("ngForOf",t.remoteCalls),b.Ab(1),b.pc("ngIf",t.isConected),b.Ab(2),b.pc("id",t.localCallId),b.Ab(1),b.pc("ngIf",!t.isConected&&t.rolUser===t.DOCTOR&&!t.cargandoLLamada),b.Ab(1),b.pc("ngIf",t.cargandoLLamada),b.Ab(1),b.pc("ngIf",t.rolUser===t.DOCTOR))},directives:[o.m,o.n,c.g,a.l,a.j,a.k,u.a,f.a,h.a],pipes:[o.b],styles:['.room-members[_ngcontent-%COMP%]{overflow-x:auto;white-space:nowrap}.room-members[_ngcontent-%COMP%] > .col[_ngcontent-%COMP%]{display:inline-block;float:none}.scrollable[_ngcontent-%COMP%]{overflow-y:auto}.overlay-container[_ngcontent-%COMP%]{position:relative}.tamanio[_ngcontent-%COMP%]{height:400px}.overlay-item[_ngcontent-%COMP%]{position:absolute;top:90%;bottom:0;left:0;right:0;text-align:center}.img-overlay[_ngcontent-%COMP%]:before{content:" ";display:block;height:50%}.border-video[_ngcontent-%COMP%]{height:400px}.local[_ngcontent-%COMP%]{position:fixed;right:1rem;bottom:1rem;width:20vw;height:20vh;border-radius:5px;overflow:hidden;z-index:1}.remote[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh}']}),I),L=n("jFXh"),M=n("IzEk"),R=n("5+tZ"),F=n("JIr8"),K=n("LRne"),j=n("EY2u"),D=n("JqCM"),x=[{resolve:{seguimientoPorAtender:(A=function(){function e(t,n,o){_classCallCheck(this,e),this._toastService=t,this._spinner=n,this._verSeguimientoDetalleUseCase=o}return _createClass(e,[{key:"resolve",value:function(e){var t=this;this._spinner.show();var n=e.paramMap.get("id");return console.log(n),this._verSeguimientoDetalleUseCase.execute(n).pipe(Object(M.a)(1),Object(R.a)((function(e){return t._spinner.hide(),console.log(e),e.estado&&e.estado===s.i.AGENDADO?(console.log("navega a video"),Object(K.a)(e)):(history.back(),t._toastService.showError("Esta cita ya fue atendida"),j.a)})),Object(F.a)((function(e){return t._spinner.hide(),history.back(),t._toastService.showError("Error al cargar cita"),Object(K.a)(e)})))}}]),e}(),A.\u0275fac=function(e){return new(e||A)(b.bc(d.c),b.bc(D.c),b.bc(L.h))},A.\u0275prov=b.Jb({token:A,factory:A.\u0275fac,providedIn:"root"}),A)},path:"llamada/:id/:rol",component:P}],U=((w=function e(){_classCallCheck(this,e)}).\u0275mod=b.Lb({type:w}),w.\u0275inj=b.Kb({factory:function(e){return new(e||w)},imports:[[c.j.forChild(x)],c.j]}),w);n.d(t,"VideoChatModule",(function(){return N}));var E,N=((E=function e(){_classCallCheck(this,e)}).\u0275mod=b.Lb({type:E}),E.\u0275inj=b.Kb({factory:function(e){return new(e||E)},imports:[[o.c,U,a.i,i.ProfileModule]]}),E)},WzrL:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("ofXK"),i=n("1kSV"),a=n("fXoL"),c=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=a.Lb({type:e}),e.\u0275inj=a.Kb({factory:function(t){return new(t||e)},imports:[[o.c,i.i]]}),e}()},oRDy:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("ofXK"),i=n("1kSV"),a=n("fXoL"),c=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=a.Lb({type:e}),e.\u0275inj=a.Kb({factory:function(t){return new(t||e)},imports:[[o.c,i.i]]}),e}()}}]);