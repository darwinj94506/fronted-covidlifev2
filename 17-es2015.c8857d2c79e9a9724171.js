(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{aT7B:function(e,t,i){"use strict";i.r(t);var a=i("ofXK"),n=i("tyNb"),s=i("3Pt+"),o=i("fXoL");let c=(()=>{class e{}return e.\u0275mod=o.Nb({type:e}),e.\u0275inj=o.Mb({factory:function(t){return new(t||e)},imports:[[a.c]]}),e})();var r=i("XNiG");let l=(()=>{class e{constructor(){this._data=new r.a,this._dataStream$=this._data.asObservable(),this._subscriptions=new Map,this._dataStream$.subscribe(e=>this._onEvent(e))}notifyDataChanged(e,t){this._data[e]!==t&&(this._data[e]=t,this._data.next({event:e,data:this._data[e]}))}subscribe(e,t){const i=this._subscriptions.get(e)||[];i.push(t),this._subscriptions.set(e,i)}_onEvent(e){(this._subscriptions.get(e.event)||[]).forEach(t=>{t.call(null,e.data)})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o.Lb({token:e,factory:e.\u0275fac}),e})();var b=i("1kSV");class d{constructor(e,t,i,a,n,s,o,c,r,l,b,d,m,u){this.id=e,this.sender=t,this.senderMail=i,this.subject=a,this.date=n,this.body=s,this.attachment=o,this.attachments=c,this.unread=r,this.sent=l,this.starred=b,this.draft=d,this.trash=m,this.selected=u}}const m=[new d(1,"Seth Wright","info@wrappixel.com","Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","6:08 PM","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!0,!1,!1,!1,!1,!1),new d(2,"Leo Jons","info@wrappixel.com","Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","12:55 PM","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!0,["assets/images/product/chair.png","assets/images/product/chair2.png"],!0,!1,!0,!1,!1,!1),new d(3,"Aron Shaur","info@wrappixel.com","consectetuer adipiscing elit.","01.11.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!1,!1,!1,!1),new d(4,"Emily Rhodes","info@wrappixel.com","Aenean commodo ligula eget dolor. Aenean massa.","21.07.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!0,!1,!1,!1,!1,!1),new d(5,"Draft","","no subject","2:14 PM","",!1,[],!1,!1,!1,!0,!1,!1),new d(6,"Draft","","Please confirm your account for furthur process","Jan 7","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum interdum ex, sed aliquet nisl maximus imperdiet. ",!1,[],!1,!1,!1,!0,!1,!1),new d(7,"Kendra","info@wrappixel.com","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.","27.05.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!1,!1,!1,!1),new d(8,"Jimmy Fallon","info@wrappixel.com","consectetuer adipiscing elit.","14.05.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!0,!1,!1,!1),new d(9,"Sam Tighe","info@wrappixel.com","Aenean commodo ligula eget dolor. Aenean massa.","03.05.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!1,!1,!1,!1),new d(10,"Saul","info@wrappixel.com","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.","30.04.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!0,!1,!1,!1,!1),new d(11,"Nathan James","info@wrappixel.com","Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","24.04.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!1,!1,!1,!1),new d(12,"Mia Green","info@wrappixel.com","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.","11.04.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!1,!1,!1,!1),new d(13,"Mario Gomez","info@wrappixel.com","Download the freebies from the site wrappixel.com all the admin template for free","24.02.2018","<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>",!1,[],!1,!1,!1,!1,!1,!1)],u=Promise.resolve(m);let p=(()=>{class e{getInboxMails(){return u.then(e=>e.filter(e=>!1===e.sent&&!1===e.draft&&!1===e.trash))}getStarredMails(){return u.then(e=>e.filter(e=>!0===e.starred))}getSentMails(){return u.then(e=>e.filter(e=>!0===e.sent))}getDraftMails(){return u.then(e=>e.filter(e=>!0===e.draft))}getTrashMails(){return u.then(e=>e.filter(e=>!0===e.trash))}getMail(e){return u.then(t=>t.find(t=>t.id===+e))}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o.Lb({token:e,factory:e.\u0275fac}),e})();function h(e,t){if(1&e){const e=o.Wb();o.Vb(0,"div",40),o.Vb(1,"button",9),o.hc("click",(function(t){return o.Fc(e),o.lc().trash()})),o.Qb(2,"i",41),o.Ub(),o.Ub()}}const g=function(){return["mail-compose"]},f=function(){return["mail-list/inbox"]},U=function(){return["mail-list/starred"]},V=function(){return["mail-list/sent"]},v=function(){return["mail-list/drafts"]},A=function(){return["mail-list/trash"]};let w=(()=>{class e{constructor(e,t,i,a){this.service=e,this.route=t,this.router=i,this.state=a,this.markAsRead=!1,this.markAsUnRead=!1,this.deleteChecked=!1,this.status=!1,this.router.events.subscribe(e=>{e instanceof n.c&&(this.id=this.route.snapshot.firstChild.params.id,this.type=this.route.snapshot.firstChild.params.type,setTimeout(()=>{}))})}getBack(){this.router.navigate(this.type?["apps/email/mail-list/"+this.type]:["apps/email/mail-list/inbox"])}trash(){this.service.getMail(this.id).then(e=>{e.trash=!0,e.sent=!1,e.draft=!1,e.starred=!1}),this.router.navigate(["apps/email/mail-list/inbox"])}setAsRead(){this.markAsRead=!this.markAsRead,this.state.notifyDataChanged("markAsRead",this.markAsRead)}setAsUnRead(){this.markAsUnRead=!this.markAsUnRead,this.state.notifyDataChanged("markAsUnRead",this.markAsUnRead)}deleteCheckedMail(){this.deleteChecked=!this.deleteChecked,this.state.notifyDataChanged("deleteChecked",this.deleteChecked)}openClleft(){this.status=!this.status}}return e.\u0275fac=function(t){return new(t||e)(o.Pb(p),o.Pb(n.a),o.Pb(n.f),o.Pb(l))},e.\u0275cmp=o.Jb({type:e,selectors:[["app-mail"]],features:[o.zb([p])],decls:83,vars:21,consts:[[1,"email-container","pr-3","pl-3"],[1,"row"],[1,"col-sm-3","col-md-2","bg-info"],[1,"mb-0","mt-3","text-white"],["href","javascript:void(0)",1,"text-white","float-right","custom-control-button",3,"click"],[1,"ti-menu"],[1,"col-sm-9","col-md-10","bg-info"],[1,"pb-3","pt-3","d-flex","align-items-center"],["data-toggle","tooltip","data-placement","top","data-animation","false",1,"b-btn","mr-1",3,"title"],["type","button",1,"btn","btn-dark","btn-sm",3,"click"],[1,"fa","fa-arrow-left"],["class","b-btn mr-1","data-toggle","tooltip","data-placement","top","data-animation","false","title","Delete",4,"ngIf"],["data-toggle","tooltip","data-placement","top","data-animation","false","title","Refresh",1,"b-btn","mr-1"],["type","button",1,"btn","btn-dark","btn-sm"],[1,"fas","fa-sync-alt"],["ngbDropdown","",1,"btn-group"],["type","button","ngbDropdownToggle","","aria-controls","dropdown-basic",1,"btn","btn-warning","btn-sm"],["id","dropdown-basic","ngbDropdownMenu","",1,""],["href","javascript:void(0);",1,"dropdown-item",3,"click"],[1,"ml-auto"],[1,"mr-1","text-white"],[1,"btn-group","btn-group-sm"],["type","button",1,"btn","btn-dark"],[1,"fa","fa-chevron-left"],[1,"fa","fa-chevron-right"],[1,"col-md-2","bg-white","border-right"],[1,"inbox-panel",3,"ngClass"],["role","button",1,"btn","btn-danger","btn-sm","btn-block","mt-3",3,"routerLink"],[1,"list-group","mt-3","custom-group"],[1,"list-group-item","d-flex","justify-content-between","align-items-center"],[3,"routerLink"],[1,"badge","badge-info","badge-pill"],[1,"list-group-item"],[1,"list-group","custom-group"],[1,"fa","fa-circle","text-danger","mr-1"],["href","#"],[1,"fa","fa-circle","text-warning","mr-1"],[1,"fa","fa-circle","text-info","mr-1"],[1,"col-md-10","bg-light"],[1,"inbox-right-panel"],["data-toggle","tooltip","data-placement","top","data-animation","false","title","Delete",1,"b-btn","mr-1"],[1,"fa","fa-trash"]],template:function(e,t){1&e&&(o.Vb(0,"div",0),o.Vb(1,"div",1),o.Vb(2,"div",2),o.Vb(3,"h3",3),o.Pc(4," Mailbox "),o.Vb(5,"a",4),o.hc("click",(function(e){return t.openClleft()})),o.Qb(6,"i",5),o.Ub(),o.Ub(),o.Ub(),o.Vb(7,"div",6),o.Vb(8,"div",7),o.Vb(9,"div",8),o.Vb(10,"button",9),o.hc("click",(function(e){return t.getBack()})),o.Qb(11,"i",10),o.Ub(),o.Ub(),o.Nc(12,h,3,0,"div",11),o.Vb(13,"div",12),o.Vb(14,"button",13),o.Qb(15,"span",14),o.Ub(),o.Ub(),o.Vb(16,"div",15),o.Vb(17,"button",16),o.Pc(18," More "),o.Ub(),o.Vb(19,"div",17),o.Vb(20,"a",18),o.hc("click",(function(e){return t.setAsRead()})),o.Pc(21,"Mark as read"),o.Ub(),o.Vb(22,"a",18),o.hc("click",(function(e){return t.setAsUnRead()})),o.Pc(23,"Mark as unread"),o.Ub(),o.Vb(24,"a",18),o.hc("click",(function(e){return t.deleteCheckedMail()})),o.Pc(25,"Delete"),o.Ub(),o.Ub(),o.Ub(),o.Vb(26,"div",19),o.Vb(27,"span",20),o.Vb(28,"b"),o.Pc(29,"1"),o.Ub(),o.Pc(30,"\u2013"),o.Vb(31,"b"),o.Pc(32,"50"),o.Ub(),o.Pc(33," of "),o.Vb(34,"b"),o.Pc(35,"50"),o.Ub(),o.Ub(),o.Vb(36,"div",21),o.Vb(37,"button",22),o.Qb(38,"span",23),o.Ub(),o.Vb(39,"button",22),o.Qb(40,"span",24),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Vb(41,"div",1),o.Vb(42,"div",25),o.Vb(43,"div",26),o.Vb(44,"a",27),o.Pc(45,"COMPOSE"),o.Ub(),o.Vb(46,"ul",28),o.Vb(47,"li",29),o.Vb(48,"a",30),o.Pc(49," Inbox "),o.Ub(),o.Vb(50,"span",31),o.Pc(51,"3"),o.Ub(),o.Ub(),o.Vb(52,"li",32),o.Vb(53,"a",30),o.Pc(54,"Starred"),o.Ub(),o.Ub(),o.Vb(55,"li",32),o.Vb(56,"a",30),o.Pc(57,"Sent Mail"),o.Ub(),o.Ub(),o.Vb(58,"li",29),o.Vb(59,"a",30),o.Pc(60,"Drafts"),o.Ub(),o.Vb(61,"span",31),o.Pc(62,"2"),o.Ub(),o.Ub(),o.Vb(63,"li",32),o.Vb(64,"a",30),o.Pc(65,"Trash"),o.Ub(),o.Ub(),o.Ub(),o.Qb(66,"hr"),o.Vb(67,"ul",33),o.Vb(68,"li",32),o.Qb(69,"span",34),o.Vb(70,"a",35),o.Pc(71,"Notes"),o.Ub(),o.Ub(),o.Vb(72,"li",32),o.Qb(73,"span",36),o.Vb(74,"a",35),o.Pc(75,"Personal"),o.Ub(),o.Ub(),o.Vb(76,"li",32),o.Qb(77,"span",37),o.Vb(78,"a",35),o.Pc(79,"Travel"),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Vb(80,"div",38),o.Vb(81,"div",39),o.Qb(82,"router-outlet"),o.Ub(),o.Ub(),o.Ub(),o.Ub()),2&e&&(o.Ab(9),o.Mc("display",t.id||!t.type?"inline-block":"none"),o.uc("title","Back to ",t.type,""),o.Ab(3),o.sc("ngIf",t.id),o.Ab(1),o.Mc("display","/apps/email/mail-compose"==t.router.url||t.id?"none":"inline-block"),o.Ab(3),o.Mc("display","/apps/email/mail-compose"==t.router.url?"none":"block"),o.Ab(27),o.sc("ngClass",t.status?"showlpanel":""),o.Ab(1),o.sc("routerLink",o.vc(15,g)),o.Ab(4),o.sc("routerLink",o.vc(16,f)),o.Ab(5),o.sc("routerLink",o.vc(17,U)),o.Ab(3),o.sc("routerLink",o.vc(18,V)),o.Ab(3),o.sc("routerLink",o.vc(19,v)),o.Ab(5),o.sc("routerLink",o.vc(20,A)))},directives:[a.o,b.o,b.r,b.q,a.m,n.i,n.k],styles:[".email-container{overflow:hidden}.email-container .unread{font-weight:800}.email-container .mail-star .fa-star{color:#f9a913}.email-container .inbox-panel,.email-container .inbox-right-panel{min-height:calc(100vh - 300px)}.email-container .inbox-right-panel{margin:0 -10px}.email-container .inbox-right-panel .table tr{cursor:pointer}.email-container .sender,.email-container .subject{max-width:350px;overflow:hidden;text-overflow:ellipsis}.email-container .sender{max-width:150px}.email-container .custom-control-button{display:none}.email-container .width-50{width:50px}.email-container .custom-group .list-group-item{border:0;padding:.75rem .25rem}.email-container .custom-group .list-group-item a{color:#3e556a}@media (max-width:767px){.email-container .inbox-panel{position:absolute;width:200px;min-height:100%;height:100%;background:#fff;left:-202px;z-index:10;box-shadow:0 2px 20px rgba(0,0,0,.1);padding:0 10px}.email-container .inbox-panel.showlpanel{left:0}.email-container .custom-control-button{display:block}}"],encapsulation:2}),e})();const k=function(){return["../mail-list/inbox"]};let x=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Jb({type:e,selectors:[["app-mail-compose"]],decls:15,vars:2,consts:[[1,"card-body","compose"],["method","get","action","#"],[1,"form-group"],["type","text","placeholder","To",1,"form-control"],["type","text","placeholder","Cc / Bcc",1,"form-control"],["type","text","placeholder","Subject",1,"form-control"],["placeholder","Message","rows","10",1,"form-control"],[1,"form-group","float-right"],[1,"btn","btn-secondary",3,"routerLink"],["type","submit",1,"btn","btn-main"]],template:function(e,t){1&e&&(o.Vb(0,"div",0),o.Vb(1,"form",1),o.Vb(2,"div",2),o.Qb(3,"input",3),o.Ub(),o.Vb(4,"div",2),o.Qb(5,"input",4),o.Ub(),o.Vb(6,"div",2),o.Qb(7,"input",5),o.Ub(),o.Vb(8,"div",2),o.Qb(9,"textarea",6),o.Ub(),o.Vb(10,"div",7),o.Vb(11,"a",8),o.Pc(12,"Cancel"),o.Ub(),o.Vb(13,"button",9),o.Pc(14,"Send"),o.Ub(),o.Ub(),o.Ub(),o.Ub()),2&e&&(o.Ab(11),o.sc("routerLink",o.vc(1,k)))},directives:[s.D,s.r,s.s,n.i],encapsulation:2}),e})();var M=i("HDdC"),y=i("eIep");M.a.prototype.switchMap=function(e){return Object(y.a)(e)(this)};let P=(()=>{class e{transform(e,t){const i=new RegExp(t,"ig");if(e)return e.filter(e=>{if((e.sender||e.subject)&&(-1!==e.sender.search(i)||-1!==e.subject.search(i)))return!0})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=o.Ob({name:"MailSearch",type:e,pure:!0}),e})();const C=function(e,t){return{fas:e,far:t}};function L(e,t){if(1&e){const e=o.Wb();o.Vb(0,"td",20),o.Vb(1,"i",21),o.hc("click",(function(t){o.Fc(e);const i=o.lc().$implicit;return o.lc().changeStarStatus(i)})),o.Ub(),o.Ub()}if(2&e){const e=o.lc().$implicit;o.Ab(1),o.sc("ngClass",o.xc(1,C,e.starred,!e.starred))}}function S(e,t){1&e&&o.Qb(0,"i",22)}const R=function(e,t){return{unread:e,selected:t}};function D(e,t){if(1&e){const e=o.Wb();o.Vb(0,"tr",9),o.Vb(1,"td",10),o.Vb(2,"div",11),o.Vb(3,"input",12),o.hc("ngModelChange",(function(i){return o.Fc(e),t.$implicit.selected=i}))("ngModelChange",(function(t){return o.Fc(e),o.lc().toggleOne()})),o.Ub(),o.Qb(4,"label",13),o.Ub(),o.Ub(),o.Nc(5,L,2,4,"td",14),o.Vb(6,"td",15),o.hc("click",(function(i){o.Fc(e);const a=t.$implicit;return o.lc().goToDetail(a)})),o.Pc(7),o.Ub(),o.Vb(8,"td",16),o.hc("click",(function(i){o.Fc(e);const a=t.$implicit;return o.lc().goToDetail(a)})),o.Ub(),o.Vb(9,"td",17),o.hc("click",(function(i){o.Fc(e);const a=t.$implicit;return o.lc().goToDetail(a)})),o.Nc(10,S,1,0,"i",18),o.Ub(),o.Vb(11,"td",19),o.hc("click",(function(i){o.Fc(e);const a=t.$implicit;return o.lc().goToDetail(a)})),o.Pc(12),o.Ub(),o.Ub()}if(2&e){const e=t.$implicit,i=o.lc();o.sc("ngClass",o.xc(9,R,e.unread,e.selected)),o.Ab(3),o.uc("id","checkbox",e.id,""),o.sc("ngModel",e.selected),o.Ab(1),o.Cb("for","checkbox",e.id,""),o.Ab(1),o.sc("ngIf","/pages/mail/mail-list/trash"!=i.router.url),o.Ab(2),o.Qc(e.sender),o.Ab(1),o.sc("innerHTML",e.subject,o.Gc),o.Ab(2),o.sc("ngIf",e.attachment),o.Ab(2),o.Qc(e.date)}}let Q=(()=>{class e{constructor(e,t,i,a){this.service=e,this.route=t,this.router=i,this.state=a,this.router.events.subscribe(e=>{e instanceof n.c&&(this.unSelectAll(),this.searchText="")}),this.state.subscribe("markAsRead",e=>{this.markAllAsRead()}),this.state.subscribe("markAsUnRead",e=>{this.markAllAsUnRead()}),this.state.subscribe("deleteChecked",e=>{this.deleteAllCheckedMail()})}ngOnInit(){this.getMails()}getMails(){this.mails=this.route.params.switchMap(e=>{switch(this.type=e.type,this.type){case"inbox":return this.service.getInboxMails();case"starred":return this.service.getStarredMails();case"sent":return this.service.getSentMails();case"drafts":return this.service.getDraftMails();case"trash":return this.service.getTrashMails();default:return this.service.getInboxMails()}})}toggleAll(){const e=!this.isAllSelected;this.mails.subscribe(t=>{t.forEach(t=>{t.selected=e})})}toggleOne(){this.mails.subscribe(e=>{this.isAllSelected=e.every(e=>!0===e.selected)})}unSelectAll(){this.isAllSelected=!1,this.mails&&this.mails.subscribe(e=>{e.forEach(e=>{e.selected=!1})})}markAllAsRead(){this.mails.subscribe(e=>{e.forEach(e=>{e.selected&&(e.unread=!1)})})}markAllAsUnRead(){this.mails.subscribe(e=>{e.forEach(e=>{e.selected&&(e.unread=!0)})})}deleteAllCheckedMail(){this.mails.subscribe(e=>{e.forEach(e=>{e.selected&&(e.trash=!0,e.sent=!1,e.draft=!1,e.starred=!1)})}),this.getMails(),this.isAllSelected=!1}goToDetail(e){e.unread=!1,this.router.navigate(["apps/email/mail-list/"+this.type,e.id])}changeStarStatus(e){e.starred=!e.starred}}return e.\u0275fac=function(t){return new(t||e)(o.Pb(p),o.Pb(n.a),o.Pb(n.f),o.Pb(l))},e.\u0275cmp=o.Jb({type:e,selectors:[["app-inbox-list"]],decls:13,vars:8,consts:[[1,"d-flex","mailbox-header-bar","p-3","bg-white","border-bottom","align-items-center"],[1,"custom-control","custom-checkbox"],["id","toggle-all","type","checkbox",1,"custom-control-input",3,"ngModel","ngModelChange","click"],["for","toggle-all",1,"custom-control-label"],[1,"ml-auto"],["id","table-search-input","type","text","placeholder","Search mail...",1,"form-control","form-control-sm",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"table","table-hover","no-wrap"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[1,"mail-checkbox","pl-3","width-50"],[1,"custom-control","custom-checkbox","mycustomcheckbox"],["type","checkbox",1,"custom-control-input",3,"id","ngModel","ngModelChange"],[1,"custom-control-label"],["class","mail-star width-50",4,"ngIf"],[1,"sender",3,"click"],[1,"subject",3,"innerHTML","click"],[1,"attachment",3,"click"],["class","fa fa-paperclip",4,"ngIf"],[1,"date",3,"click"],[1,"mail-star","width-50"],[1,"fa-star",3,"ngClass","click"],[1,"fa","fa-paperclip"]],template:function(e,t){1&e&&(o.Vb(0,"div",0),o.Vb(1,"div",1),o.Vb(2,"input",2),o.hc("ngModelChange",(function(e){return t.isAllSelected=e}))("click",(function(e){return t.toggleAll()})),o.Ub(),o.Vb(3,"label",3),o.Pc(4,"Check all"),o.Ub(),o.Ub(),o.Vb(5,"div",4),o.Vb(6,"input",5),o.hc("ngModelChange",(function(e){return t.searchText=e})),o.Ub(),o.Ub(),o.Ub(),o.Vb(7,"div",6),o.Vb(8,"table",7),o.Vb(9,"tbody"),o.Nc(10,D,13,12,"tr",8),o.mc(11,"MailSearch"),o.mc(12,"async"),o.Ub(),o.Ub(),o.Ub()),2&e&&(o.Ab(2),o.sc("ngModel",t.isAllSelected),o.Ab(4),o.sc("ngModel",t.searchText),o.Ab(4),o.sc("ngForOf",o.oc(11,3,o.nc(12,6,t.mails),t.searchText)))},directives:[s.a,s.q,s.t,s.b,a.n,a.m,a.o],pipes:[P,a.b],encapsulation:2}),e})();function T(e,t){if(1&e&&(o.Vb(0,"span",14),o.Pc(1),o.Ub()),2&e){const e=o.lc(2);o.Ab(1),o.Rc("<",e.mail.senderMail,">")}}function I(e,t){if(1&e&&(o.Vb(0,"section",20),o.Qb(1,"img",21),o.Vb(2,"h5",22),o.Pc(3),o.Ub(),o.Vb(4,"p"),o.Pc(5," 457K \xa0\xa0 "),o.Vb(6,"a",18),o.Pc(7,"View"),o.Ub(),o.Pc(8," \xa0\xa0 "),o.Vb(9,"a",18),o.Pc(10,"Download"),o.Ub(),o.Ub(),o.Ub()),2&e){const e=t.$implicit,i=t.index;o.Ab(1),o.tc("src",e,o.Hc),o.Ab(2),o.Rc("image-",i+1,".jpg")}}function j(e,t){if(1&e&&(o.Vb(0,"div",15),o.Qb(1,"hr"),o.Vb(2,"div",16),o.Vb(3,"div",17),o.Vb(4,"p"),o.Vb(5,"strong"),o.Pc(6),o.Ub(),o.Pc(7," \xa0-\xa0 "),o.Vb(8,"a",18),o.Pc(9,"Download all attachments"),o.Ub(),o.Pc(10,"\xa0\xa0\xa0 "),o.Vb(11,"a",18),o.Pc(12,"View all Images"),o.Ub(),o.Ub(),o.Nc(13,I,11,2,"section",19),o.Ub(),o.Ub(),o.Ub()),2&e){const e=o.lc(2);o.Ab(6),o.Rc("",e.mail.attachments.length," attachments"),o.Ab(7),o.sc("ngForOf",e.mail.attachments)}}function F(e,t){if(1&e&&(o.Vb(0,"div"),o.Vb(1,"div",1),o.Vb(2,"h4",2),o.Pc(3),o.Ub(),o.Vb(4,"div",3),o.Vb(5,"div",4),o.Qb(6,"i",5),o.Ub(),o.Vb(7,"div",6),o.Vb(8,"span",7),o.Pc(9),o.Ub(),o.Nc(10,T,2,1,"span",8),o.Vb(11,"span",9),o.Pc(12,"to me"),o.Ub(),o.Ub(),o.Vb(13,"div",10),o.Vb(14,"span",11),o.Pc(15),o.Ub(),o.Ub(),o.Ub(),o.Qb(16,"div",12),o.Nc(17,j,14,2,"div",13),o.Ub(),o.Ub()),2&e){const e=o.lc();o.Ab(3),o.Qc(e.mail.subject),o.Ab(6),o.Qc(e.mail.sender),o.Ab(1),o.sc("ngIf",e.mail.senderMail),o.Ab(5),o.Rc(" ",e.mail.date," "),o.Ab(1),o.sc("innerHTML",e.mail.body,o.Gc),o.Ab(1),o.sc("ngIf",e.mail.attachments.length>0)}}let N=(()=>{class e{constructor(e,t,i){this.service=e,this.route=t,this.router=i,this.replyMessage=new o.n}ngOnInit(){this.route.params.switchMap(e=>this.service.getMail(+e.id)).subscribe(e=>this.mail=e)}goToReply(e){this.replyMessage.emit(e)}trash(e){this.service.getMail(e).then(e=>{e.trash=!0,e.sent=!1,e.draft=!1,e.starred=!1}),this.router.navigate(["apps/email/mail-list/inbox"])}}return e.\u0275fac=function(t){return new(t||e)(o.Pb(p),o.Pb(n.a),o.Pb(n.f))},e.\u0275cmp=o.Jb({type:e,selectors:[["app-mail-detail"]],outputs:{replyMessage:"replyMessage"},decls:1,vars:1,consts:[[4,"ngIf"],[1,"card-body"],[1,"mb-3"],[1,"d-flex","mt-4","mb-4"],[1,"round","mr-2","flex-shrink-0"],["aria-hidden","true",1,"fa","fa-user"],[1,""],[1,"font-bold"],["class","email text-truncate d-block w-75",4,"ngIf"],[1,"receiver"],[1,"ml-auto"],[1,"mail-date"],[1,"mailbox-body",3,"innerHTML"],["class","mail-attachments",4,"ngIf"],[1,"email","text-truncate","d-block","w-75"],[1,"mail-attachments"],[1,"row"],[1,"col-sm-6"],["href","#"],["class","attachment",4,"ngFor","ngForOf"],[1,"attachment"],["alt","",3,"src"],[1,"title"]],template:function(e,t){1&e&&o.Nc(0,F,18,6,"div",0),2&e&&o.sc("ngIf",t.mail)},directives:[a.o,a.n],encapsulation:2}),e})();i.d(t,"routes",(function(){return _})),i.d(t,"MailModule",(function(){return O}));const _=[{path:"",component:w,children:[{path:"",redirectTo:"mail-list/inbox",pathMatch:"full"},{path:"mail-list/:type",component:Q},{path:"mail-compose",component:x},{path:"mail-list/:type/:id",component:N}]}];let O=(()=>{class e{}return e.\u0275mod=o.Nb({type:e}),e.\u0275inj=o.Mb({factory:function(t){return new(t||e)},providers:[l],imports:[[a.c,s.l,c,b.w,n.j.forChild(_)]]}),e})()}}]);