(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0Z1T":function(e,t,i){"use strict";i.d(t,"a",(function(){return d}));var o=i("748+"),n=i("FHFX"),a=i("fXoL"),s=i("ofXK"),c=i("1kSV");function r(e,t){if(1&e){const e=a.Ub();a.Tb(0,"tr"),a.Tb(1,"td",15),a.Kc(2),a.Sb(),a.Tb(3,"td"),a.Tb(4,"div",16),a.Tb(5,"div",17),a.Tb(6,"p",18),a.Kc(7),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(8,"td"),a.Tb(9,"div",16),a.Tb(10,"div",17),a.Tb(11,"p",18),a.Kc(12),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(13,"td"),a.Tb(14,"div",16),a.Tb(15,"div",17),a.Tb(16,"p",18),a.Kc(17),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(18,"td"),a.Tb(19,"div",16),a.Tb(20,"div",17),a.Tb(21,"p",18),a.Kc(22),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(23,"td"),a.Tb(24,"div",16),a.Tb(25,"div",17),a.Tb(26,"p",18),a.Kc(27),a.Sb(),a.Sb(),a.Sb(),a.Sb(),a.Tb(28,"td"),a.Tb(29,"a",19),a.fc("click",(function(i){a.Bc(e);const o=t.$implicit;return a.ic(2).openModalCreateUpdate(o)})),a.Ob(30,"i",20),a.Sb(),a.Tb(31,"a",21),a.fc("click",(function(i){a.Bc(e);const o=t.$implicit;return a.ic(2).openModalConfirm(o)})),a.Ob(32,"i",22),a.Sb(),a.Tb(33,"a",23),a.fc("click",(function(i){a.Bc(e);const o=t.$implicit;return a.ic(2).openModalAsignarRoles(o)})),a.Ob(34,"i",24),a.Sb(),a.Sb(),a.Sb()}if(2&e){const e=t.$implicit,i=t.index;a.Ab(2),a.Mc(" ",i+1," "),a.Ab(5),a.Lc(e.name),a.Ab(5),a.Lc(e.lastname),a.Ab(5),a.Lc(e.email),a.Ab(5),a.Lc(e.ci),a.Ab(5),a.Lc(e.telefono)}}function l(e,t){if(1&e){const e=a.Ub();a.Rb(0),a.Tb(1,"div",8),a.Tb(2,"table",9),a.Tb(3,"thead"),a.Tb(4,"tr"),a.Tb(5,"th",10),a.Kc(6,"#"),a.Sb(),a.Tb(7,"th",11),a.Kc(8,"Nombre"),a.Sb(),a.Tb(9,"th",11),a.Kc(10,"Apellido"),a.Sb(),a.Tb(11,"th",11),a.Kc(12,"Correo"),a.Sb(),a.Tb(13,"th",11),a.Kc(14,"c\xe9dula"),a.Sb(),a.Tb(15,"th",11),a.Kc(16,"Tel\xe9fono"),a.Sb(),a.Tb(17,"th"),a.Kc(18," Acciones "),a.Sb(),a.Sb(),a.Sb(),a.Tb(19,"tbody"),a.Ic(20,r,35,6,"tr",12),a.Sb(),a.Sb(),a.Sb(),a.Tb(21,"div",13),a.Tb(22,"ngb-pagination",14),a.fc("pageChange",(function(t){return a.Bc(e),a.ic().page=t})),a.Sb(),a.Sb(),a.Qb()}if(2&e){const e=t.ngIf,i=a.ic();a.Ab(20),a.pc("ngForOf",e),a.Ab(2),a.pc("page",i.page)("pageSize",i.pageSize)("collectionSize",e.length)}}let d=(()=>{class e{constructor(e,t){this._userFacade=e,this._mainFacade=t,this.searchItem=""}ngOnInit(){}getTitulo(){return this.tableFor==o.h.PACIENTE?"Pacientes":"Personal"}getDescripcion(){return this.tableFor==o.h.PACIENTE?"Pacientes actuamente registrados":"Personal registrado, m\xe9dicos, directore y administradores."}openModalCreateUpdate(e){this._userFacade.dispatchActionOpenModalCreateUpdateUser(e)}openModalConfirm(e){}openModalAsignarRoles(e){this._mainFacade.getHospitalSesion().subscribe(t=>{let i=e.roles.find(e=>e.idHospital._id===t.idHospital._id);this._userFacade.dispatchActionOpenModalAsignarRole(i,e._id)})}openModalSearchAddUsers(){this._userFacade.distpachActionOpenModalSearchUser()}}return e.\u0275fac=function(t){return new(t||e)(a.Nb(n.c),a.Nb(n.a))},e.\u0275cmp=a.Hb({type:e,selectors:[["app-user-table"]],inputs:{tableFor:"tableFor",users$:"users$"},decls:12,vars:5,consts:[[1,"row"],[1,"col-12"],[1,"card","card-body"],[1,"card-title"],[1,"card-subtitle"],[1,"d-flex","mb-3","mt-3"],[1,"btn","btn-primary","ml-auto",3,"click"],[4,"ngIf"],[1,"table-responsive","table-bordered"],[1,"table","table-striped","mb-0","no-wrap","v-middle"],["scope","col",1,"text-center"],["scope","col"],[4,"ngFor","ngForOf"],[1,"d-flex","justify-content-center","mt-5"],[3,"page","pageSize","collectionSize","pageChange"],[1,"text-center"],[1,"d-flex","align-items-center"],[1,"ml-3"],[1,"font-bold","mb-0"],["href","javascript: void(0);","placement","top","ngbTooltip","Editar",1,"link","mr-2",3,"click"],[1,"mdi","mdi-pencil"],["href","javascript: void(0);","placement","top","ngbTooltip","Eliminar",1,"link",3,"click"],[1,"mdi","mdi-delete"],["href","javascript: void(0);","placement","top","ngbTooltip","Asignar Roles",1,"link",3,"click"],[1,"mdi","mdi-city"]],template:function(e,t){1&e&&(a.Tb(0,"div",0),a.Tb(1,"div",1),a.Tb(2,"div",2),a.Tb(3,"h4",3),a.Kc(4),a.Sb(),a.Tb(5,"h5",4),a.Kc(6),a.Sb(),a.Tb(7,"div",5),a.Tb(8,"button",6),a.fc("click",(function(e){return t.openModalSearchAddUsers()})),a.Kc(9,"Agregar usuarios"),a.Sb(),a.Sb(),a.Ic(10,l,23,4,"ng-container",7),a.jc(11,"async"),a.Sb(),a.Sb(),a.Sb()),2&e&&(a.Ab(4),a.Mc(" ",t.getTitulo()," "),a.Ab(2),a.Mc(" ",t.getDescripcion()," "),a.Ab(4),a.pc("ngIf",a.kc(11,3,t.users$)))},directives:[s.n,s.m,c.j,c.n],pipes:[s.b],styles:[""]}),e})()},EC2C:function(e,t,i){"use strict";i.r(t);var o=i("ofXK"),n=i("FtmO"),a=i("1kSV"),s=i("tyNb"),c=i("FHFX"),r=i("748+"),l=i("U43L"),d=i("o0su"),b=i("fXoL"),h=i("fNYS"),u=i("FUKR"),m=i("tUJ0");function p(e,t){1&e&&b.Ob(0,"div",8),2&e&&b.pc("id",t.$implicit)}function g(e,t){if(1&e){const e=b.Ub();b.Tb(0,"div",9),b.Tb(1,"input",10),b.fc("click",(function(t){return b.Bc(e),b.ic().terminarLlamada()})),b.Sb(),b.Sb()}}const f=function(){return["/doctor/seguimientos"]};function S(e,t){1&e&&(b.Tb(0,"div",11),b.Tb(1,"button",12),b.Kc(2," Volver a seguimientos"),b.Sb(),b.Sb()),2&e&&(b.Ab(1),b.pc("routerLink",b.sc(1,f)))}function v(e,t){1&e&&(b.Tb(0,"div"),b.Tb(1,"h3"),b.Kc(2,"Uniendose a la sala...."),b.Sb(),b.Sb())}function T(e,t){if(1&e&&b.Ob(0,"app-atender-seguimiento",20),2&e){const e=b.ic(2);b.pc("seguimiento",e.seguimientoPorAtender)}}function C(e,t){1&e&&(b.Tb(0,"div"),b.Kc(1,"cargando..."),b.Sb())}function _(e,t){if(1&e&&(b.Ob(0,"app-over-view",21),b.Ic(1,C,2,0,"div",7),b.jc(2,"async")),2&e){const e=b.ic(2);b.pc("userPerfil$",e.userProfile$),b.Ab(1),b.pc("ngIf",b.kc(2,2,e.isLoading$))}}function A(e,t){if(1&e&&b.Ob(0,"app-time-line",23),2&e){const e=b.ic(3);b.pc("idPaciente",e.seguimientoPorAtender.idPaciente._id)}}function y(e,t){if(1&e&&b.Ic(0,A,1,1,"app-time-line",22),2&e){const e=b.ic(2);b.pc("ngIf",e.showResumen)}}function I(e,t){if(1&e){const e=b.Ub();b.Rb(0),b.Tb(1,"div",13),b.Tb(2,"div",14),b.Tb(3,"ngb-tabset",15),b.fc("tabChange",(function(t){return b.Bc(e),b.ic().onChangeNav(t)})),b.Tb(4,"ngb-tab",16),b.Ic(5,T,1,1,"ng-template",17),b.Sb(),b.Tb(6,"ngb-tab",18),b.Ic(7,_,3,4,"ng-template",17),b.Sb(),b.Tb(8,"ngb-tab",19),b.Ic(9,y,1,1,"ng-template",17),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Qb()}}let w=(()=>{class e{constructor(e,t,i,o){this._userFacade=e,this._toastService=t,this.route=i,this._ngxAgoraService=o,this.showResumen=!1,this.localCallId="agora_local",this.remoteCalls=[],this.cargandoLLamada=!0,this.isConected=!1,this.DOCTOR=r.h.DOCTOR,this.uid=Math.floor(100*Math.random())}ngOnInit(){this.userProfile$=this._userFacade.getPerfilUser(),this.isLoading$=this._userFacade.getLoadingPerfilUserStore(),this.seguimientoPorAtender=this.route.snapshot.data.seguimientoPorAtender,this.rolUser=this.route.snapshot.params.rol,this.client=this._ngxAgoraService.createClient({mode:"rtc",codec:"h264"}),this.assignClientHandlers(),this.localStream=this._ngxAgoraService.createStream({streamID:this.uid,audio:!0,video:!0,screen:!1}),this.assignLocalStreamHandlers(),this.initLocalStream(()=>this.join(e=>this.publish(),e=>{this.cargandoLLamada=!1,this._toastService.showError("Error al unirse a la sala"),console.error(e)}))}onChangeNav({nextId:e}){"datos-paciente"===e&&this._userFacade.loadPerfilUser({_id:this.seguimientoPorAtender.idPaciente._id}),"resumen"===e&&(this.showResumen=!0)}join(e,t){this.client.join(null,this.seguimientoPorAtender._id,this.uid,e,t)}publish(){this.client.publish(this.localStream,e=>console.log("Publish local stream error: "+e))}assignClientHandlers(){this.client.on(l.a.LocalStreamPublished,e=>{console.log("Publish local stream successfully"),this.cargandoLLamada=!1,this.isConected=!0,this._toastService.showInfo("Se ha unido a la sala con \xe9xito")}),this.client.on(l.a.Error,e=>{console.log("Got error msg:",e.reason),"DYNAMIC_KEY_TIMEOUT"===e.reason&&this.client.renewChannelKey("",()=>console.log("Renewed the channel key successfully."),e=>console.error("Renew channel key failed: ",e))}),this.client.on(l.a.RemoteStreamAdded,e=>{this.client.subscribe(e.stream,{audio:!0,video:!0},e=>{console.log("Subscribe stream failed",e)})}),this.client.on(l.a.RemoteStreamSubscribed,e=>{const t=e.stream,i=this.getRemoteId(t);this.remoteCalls.length||(this.remoteCalls.push(i),this._toastService.showSuccess("Se ha establecido comunicaci\xf3n con \xe9xito"),setTimeout(()=>t.play(i),1e3))}),this.client.on(l.a.RemoteStreamRemoved,e=>{this._toastService.showInfo("El usuario a salido de la sala");const t=e.stream;t&&(t.stop(),this.remoteCalls=[],this.remoteStreams=[],console.log(`Remote stream is removed ${t.getId()}`))}),this.client.on(l.a.PeerLeave,e=>{const t=e.stream;t&&(t.stop(),this.remoteCalls=this.remoteCalls.filter(e=>e!==`${this.getRemoteId(t)}`),console.log(`${e.uid} left from this channel`))})}assignLocalStreamHandlers(){this.localStream.on(l.d.MediaAccessAllowed,()=>{console.log("accessAllowed"),this._toastService.showInfo("Permisos de accesos a la c\xe1mara y micr\xf3fono otorgados exitosamente")}),this.localStream.on(l.d.MediaAccessDenied,()=>{console.log("accessDenied"),this._toastService.showError("No ha otorgados los accesos a la c\xe1mara ni al micr\xf3fono")})}initLocalStream(e){this.localStream.init(()=>{this.localStream.play(this.localCallId),e&&e()},e=>console.error("getUserMedia failed",e))}getRemoteId(e){return`agora_remote-${e.getId()}`}terminarLlamada(){this.client.leave(()=>{this.localStream.stop(),this._toastService.showInfo("Usted a salido de la sala"),this.localStream.close(),this.isConected=!1,console.log("client leaves channel success")},e=>{console.log("channel leave failed"),console.error(e)})}ngOnDestroy(){this.terminarLlamada()}}return e.\u0275fac=function(t){return new(t||e)(b.Nb(c.c),b.Nb(d.c),b.Nb(s.a),b.Nb(l.c))},e.\u0275cmp=b.Hb({type:e,selectors:[["app-video-chat-room"]],decls:9,vars:6,consts:[[1,"row","border","h-75","no-gutters"],[1,"col-8","bg-light","border","h-100","d-flex","justify-content-center","overlay-container"],["class","remote",3,"id",4,"ngFor","ngForOf"],["class","justify-content-center overlay-item",4,"ngIf"],[1,"row","flex-nowrap","room-members"],[1,"local",3,"id"],["style","padding: 100px;",4,"ngIf"],[4,"ngIf"],[1,"remote",3,"id"],[1,"justify-content-center","overlay-item"],["type","button","value","Terminar",1,"btn","btn-sm","btn-danger","ml-1",3,"click"],[2,"padding","100px"],[1,"btn","btn-info",3,"routerLink"],[1,"col-4","bg-light","border","scrollable","h-100"],[1,"card"],["type","pills",1,"custom-pills",3,"tabChange"],["title","Seguimiento","id","segumientos"],["ngbTabContent",""],["title","Datos usuario","id","datos-paciente"],["title","Resumen","id","resumen"],[3,"seguimiento"],[3,"userPerfil$"],[3,"idPaciente",4,"ngIf"],[3,"idPaciente"]],template:function(e,t){1&e&&(b.Tb(0,"div",0),b.Tb(1,"div",1),b.Ic(2,p,1,1,"div",2),b.Ic(3,g,2,0,"div",3),b.Tb(4,"div",4),b.Ob(5,"div",5),b.Sb(),b.Ic(6,S,3,2,"div",6),b.Ic(7,v,3,0,"div",7),b.Sb(),b.Ic(8,I,10,0,"ng-container",7),b.Sb()),2&e&&(b.Ab(2),b.pc("ngForOf",t.remoteCalls),b.Ab(1),b.pc("ngIf",t.isConected),b.Ab(2),b.pc("id",t.localCallId),b.Ab(1),b.pc("ngIf",!t.isConected&&t.rolUser===t.DOCTOR&&!t.cargandoLLamada),b.Ab(1),b.pc("ngIf",t.cargandoLLamada),b.Ab(1),b.pc("ngIf",t.rolUser===t.DOCTOR))},directives:[o.m,o.n,s.g,a.m,a.k,a.l,h.a,u.a,m.a],pipes:[o.b],styles:['.room-members[_ngcontent-%COMP%]{overflow-x:auto;white-space:nowrap}.room-members[_ngcontent-%COMP%] > .col[_ngcontent-%COMP%]{display:inline-block;float:none}.scrollable[_ngcontent-%COMP%]{overflow-y:auto}.overlay-container[_ngcontent-%COMP%]{position:relative}.tamanio[_ngcontent-%COMP%]{height:400px}.overlay-item[_ngcontent-%COMP%]{position:absolute;top:90%;bottom:0;left:0;right:0;text-align:center}.img-overlay[_ngcontent-%COMP%]:before{content:" ";display:block;height:50%}.border-video[_ngcontent-%COMP%]{height:400px}.local[_ngcontent-%COMP%]{position:fixed;right:1rem;bottom:1rem;width:20vw;height:20vh;border-radius:5px;overflow:hidden;z-index:1}.remote[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh}']}),e})();var O=i("jFXh"),P=i("IzEk"),L=i("5+tZ"),M=i("JIr8"),k=i("LRne"),K=i("EY2u"),F=i("JqCM");const R=[{resolve:{seguimientoPorAtender:(()=>{class e{constructor(e,t,i){this._toastService=e,this._spinner=t,this._verSeguimientoDetalleUseCase=i}resolve(e){this._spinner.show();const t=e.paramMap.get("id");return console.log(t),this._verSeguimientoDetalleUseCase.execute(t).pipe(Object(P.a)(1),Object(L.a)(e=>(this._spinner.hide(),console.log(e),e.estado&&e.estado===r.i.AGENDADO?(console.log("navega a video"),Object(k.a)(e)):(history.back(),this._toastService.showError("Esta cita ya fue atendida"),K.a))),Object(M.a)(e=>(this._spinner.hide(),history.back(),this._toastService.showError("Error al cargar cita"),Object(k.a)(e))))}}return e.\u0275fac=function(t){return new(t||e)(b.bc(d.c),b.bc(F.c),b.bc(O.h))},e.\u0275prov=b.Jb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},path:"llamada/:id/:rol",component:w}];let x=(()=>{class e{}return e.\u0275mod=b.Lb({type:e}),e.\u0275inj=b.Kb({factory:function(t){return new(t||e)},imports:[[s.j.forChild(R)],s.j]}),e})();i.d(t,"VideoChatModule",(function(){return U}));let U=(()=>{class e{}return e.\u0275mod=b.Lb({type:e}),e.\u0275inj=b.Kb({factory:function(t){return new(t||e)},imports:[[o.c,x,a.i,n.ProfileModule]]}),e})()},WzrL:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var o=i("ofXK"),n=i("1kSV"),a=i("fXoL");let s=(()=>{class e{}return e.\u0275mod=a.Lb({type:e}),e.\u0275inj=a.Kb({factory:function(t){return new(t||e)},imports:[[o.c,n.i]]}),e})()},oRDy:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var o=i("ofXK"),n=i("1kSV"),a=i("fXoL");let s=(()=>{class e{}return e.\u0275mod=a.Lb({type:e}),e.\u0275inj=a.Kb({factory:function(t){return new(t||e)},imports:[[o.c,n.i]]}),e})()}}]);