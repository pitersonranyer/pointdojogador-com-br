(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{QMHv:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),i=function(){return function(){}}(),a=u("9AJC"),o=u("pMnS"),s=u("gIcY"),e=u("Ip0R"),c=u("1Epc"),r=u("on2l"),b=u("PSD3"),d=u.n(b),g=function(){function l(l,n,u,t,i,a){var o=this;this.router=l,this.listarLigasAdms=n,this.cadastrarLiga=u,this.excluirLigaCartola=t,this.usuarioService=i,this.toastr=a,this.ligas=[],this.totalParticipantes=0,this.premiacaoTotal=0,this.premiacaoPercentual=0,this.premiacaoFinal=0,this.premiacaoFinalFormat="",this.liga={},this.usuario$=i.getUsuario(),this.usuario$.subscribe((function(l){return o.usuario=l}))}return l.prototype.ngOnInit=function(){var l=this;this.listarLigasAdms.listarLigasAdms(this.usuario.id).subscribe((function(n){l.ligas=n;for(var u=0;u<l.ligas.length;u++)l.count=0,l.ligas[u].totalParticipantes=10,l.premiacaoTotal=l.ligas[u].totalParticipantes*l.ligas[u].valorLiga,l.premiacaoPercentual=10*l.premiacaoTotal/100,l.premiacaoFinal=l.premiacaoTotal-l.premiacaoPercentual,l.ligas[u].premiacaoFinalFormat=l.premiacaoFinal.toLocaleString("pt-br",{minimumFractionDigits:2}),l.ligas[u].dataFim=l.ligas[u].dtFimInscricao.substring(0,5),l.ligas[u].horaFim=l.ligas[u].hrFimInscricao.substring(0,5)}))},l.prototype.onSubmit=function(){var l=this;d()({title:"Cadastrar",text:"Deseja cadastrar essa Liga?",type:"warning",showCancelButton:!0,confirmButtonText:"Sim",cancelButtonText:"N\xe3o",confirmButtonClass:"btn btn-success",cancelButtonClass:"btn btn-danger",buttonsStyling:!1}).then((function(n){n.value?(l.liga.anoTemporada=2020,l.liga.idUsuarioAdmLiga=l.usuario.id,l.liga.tipoLiga="Tiro Curto",l.cadastrarLiga.cadastrarLiga(l.liga).subscribe((function(){l.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Liga Cadastrada com sucesso!',"",{timeOut:8e3,closeButton:!0,enableHtml:!0,toastClass:"alert alert-success alert-with-icon",positionClass:"toast-top-right"}),l.ngOnInit()}),(function(l){l.status&&409===l.status?d()({title:"Cadastro n\xe3o efetuado",text:"registro existente :)",type:"error",confirmButtonClass:"btn btn-info",buttonsStyling:!1}).catch(d.a.noop):d()({title:"Cadastro n\xe3o efetuado",text:"N\xe3o foi poss\xedvel realizar a altera\xe7\xe3o :)",type:"error",confirmButtonClass:"btn btn-info",buttonsStyling:!1}).catch(d.a.noop)}))):d()({title:"Cancelado",text:"Altera\xe7\xe3o cancelada :)",type:"error",confirmButtonClass:"btn btn-info",buttonsStyling:!1}).catch(d.a.noop)}))},l.prototype.gerenciarLiga=function(){this.router.navigate(["/adm-ligas/gerenciarLiga"])},l.prototype.excluirLiga=function(l){var n=this;d()({title:"Excluir",text:"Deseja excluir essa Liga?",type:"warning",showCancelButton:!0,confirmButtonText:"Sim",cancelButtonText:"N\xe3o",confirmButtonClass:"btn btn-success",cancelButtonClass:"btn btn-danger",buttonsStyling:!1}).then((function(u){u.value?n.excluirLigaCartola.excluirLiga(l.anoTemporada,l.idRodada,l.idUsuarioAdmLiga,l.idLiga).subscribe((function(){n.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Liga exclu\xedda com sucesso!',"",{timeOut:8e3,closeButton:!0,enableHtml:!0,toastClass:"alert alert-success alert-with-icon",positionClass:"toast-top-right"}),n.ngOnInit()}),(function(l){l.status&&409===l.status?d()({title:"Exclus\xe3o n\xe3o efetuada",text:"registro existente :(",type:"error",confirmButtonClass:"btn btn-info",buttonsStyling:!1}).catch(d.a.noop):d()({title:"Exclus\xe3o n\xe3o efetuada",text:"N\xe3o foi poss\xedvel realizar a exclus\xe3o :)",type:"error",confirmButtonClass:"btn btn-info",buttonsStyling:!1}).catch(d.a.noop)})):d()({title:"Cancelado",text:"Exclus\xe3o cancelada :)",type:"error",confirmButtonClass:"btn btn-info",buttonsStyling:!1}).catch(d.a.noop)}))},l}(),m=u("ZYCi"),p=u("SZbH"),v=t.ub({encapsulation:0,styles:[[""]],data:{}});function h(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,19,"div",[["class","col-md-4 "]],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,18,"div",[["class","card "]],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,14,"div",[["class","card-body text-center"]],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),t.Vb(4,null,[" "," #",""])),(l()(),t.wb(5,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),t.Vb(6,null,["VALOR POR TIME: R$ "," "])),(l()(),t.wb(7,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),t.Vb(8,null,["Participantes: ",""])),(l()(),t.wb(9,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),t.Vb(10,null,["Premia\xe7\xe3o: R$ "," "])),(l()(),t.wb(11,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),t.Vb(12,null,["Inscri\xe7\xf5es at\xe9: "," \xe0s "," "])),(l()(),t.wb(13,0,null,null,1,"p",[["class","card-text"]],null,null,null,null,null)),(l()(),t.Vb(14,null,["Situa\xe7\xe3o: ",""])),(l()(),t.wb(15,0,null,null,1,"button",[["class","btn btn-success btn-fill"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.gerenciarLiga()&&t),t}),null,null)),(l()(),t.Vb(-1,null,[" GERENCIAR "])),(l()(),t.wb(17,0,null,null,2,"div",[["class","text-right"]],null,null,null,null,null)),(l()(),t.wb(18,0,null,null,1,"a",[["class","btn btn-round btn-danger btn-icon btn-sm edit"],["data-placement","top"],["data-toggle","tooltip"],["href","javascript:void(0)"],["title","Excluir"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.excluirLiga(l.context.$implicit)&&t),t}),null,null)),(l()(),t.wb(19,0,null,null,0,"i",[["class","now-ui-icons ui-1_simple-remove"]],null,null,null,null,null))],null,(function(l,n){l(n,4,0,n.context.$implicit.nomeLiga,n.context.$implicit.idRodada),l(n,6,0,n.context.$implicit.valorLiga),l(n,8,0,n.context.$implicit.totalParticipantes),l(n,10,0,n.context.$implicit.premiacaoFinalFormat),l(n,12,0,n.context.$implicit.dataFim,n.context.$implicit.horaFim),l(n,14,0,n.context.$implicit.status)}))}function f(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,5,"div",[["class","panel-header"]],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,4,"div",[["class","header text-center"]],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,1,"h2",[["class","title"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["ADMINISTRAR LIGAS"])),(l()(),t.wb(4,0,null,null,1,"p",[["class","category"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,[" Administre aqui sua liga tiro curto. "])),(l()(),t.wb(6,0,null,null,57,"div",[["class","main-content"]],null,null,null,null,null)),(l()(),t.wb(7,0,null,null,56,"div",[["class","places-sweet-alerts"]],null,null,null,null,null)),(l()(),t.wb(8,0,null,null,55,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.wb(9,0,null,null,52,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),t.wb(10,0,null,null,51,"div",[["class","card "]],null,null,null,null,null)),(l()(),t.wb(11,0,null,null,50,"div",[["class","card-body text-center"]],null,null,null,null,null)),(l()(),t.wb(12,0,null,null,49,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,u){var i=!0,a=l.component;return"submit"===n&&(i=!1!==t.Lb(l,14).onSubmit(u)&&i),"reset"===n&&(i=!1!==t.Lb(l,14).onReset()&&i),"ngSubmit"===n&&(i=!1!==a.onSubmit()&&i),i}),null,null)),t.vb(13,16384,null,0,s.D,[],null,null),t.vb(14,4210688,null,0,s.s,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),t.Qb(2048,null,s.d,null,[s.s]),t.vb(16,16384,null,0,s.r,[[4,s.d]],null,null),(l()(),t.wb(17,0,null,null,44,"div",[["class","form-row align-items-center"]],null,null,null,null,null)),(l()(),t.wb(18,0,null,null,6,"div",[["class","col-sm-3 my-1"]],null,null,null,null,null)),(l()(),t.wb(19,0,null,null,5,"input",[["class","form-control"],["name","nomeLiga"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var i=!0,a=l.component;return"input"===n&&(i=!1!==t.Lb(l,20)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Lb(l,20).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Lb(l,20)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Lb(l,20)._compositionEnd(u.target.value)&&i),"ngModelChange"===n&&(i=!1!==(a.liga.nomeLiga=u)&&i),i}),null,null)),t.vb(20,16384,null,0,s.e,[t.D,t.l,[2,s.a]],null,null),t.Qb(1024,null,s.o,(function(l){return[l]}),[s.e]),t.vb(22,671744,null,0,s.t,[[2,s.d],[8,null],[8,null],[6,s.o]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Qb(2048,null,s.p,null,[s.t]),t.vb(24,16384,null,0,s.q,[[4,s.p]],null,null),(l()(),t.wb(25,0,null,null,6,"div",[["class","col-sm-3 my-1"]],null,null,null,null,null)),(l()(),t.wb(26,0,null,null,5,"input",[["class","form-control"],["name","valorLiga"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var i=!0,a=l.component;return"input"===n&&(i=!1!==t.Lb(l,27)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Lb(l,27).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Lb(l,27)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Lb(l,27)._compositionEnd(u.target.value)&&i),"ngModelChange"===n&&(i=!1!==(a.liga.valorLiga=u)&&i),i}),null,null)),t.vb(27,16384,null,0,s.e,[t.D,t.l,[2,s.a]],null,null),t.Qb(1024,null,s.o,(function(l){return[l]}),[s.e]),t.vb(29,671744,null,0,s.t,[[2,s.d],[8,null],[8,null],[6,s.o]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Qb(2048,null,s.p,null,[s.t]),t.vb(31,16384,null,0,s.q,[[4,s.p]],null,null),(l()(),t.wb(32,0,null,null,26,"div",[["class","col-sm-3 my-1"]],null,null,null,null,null)),(l()(),t.wb(33,0,null,null,25,"select",[["class","form-control"],["name","idRodada"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],(function(l,n,u){var i=!0,a=l.component;return"change"===n&&(i=!1!==t.Lb(l,34).onChange(u.target.value)&&i),"blur"===n&&(i=!1!==t.Lb(l,34).onTouched()&&i),"ngModelChange"===n&&(i=!1!==(a.liga.idRodada=u)&&i),i}),null,null)),t.vb(34,16384,null,0,s.x,[t.D,t.l],null,null),t.Qb(1024,null,s.o,(function(l){return[l]}),[s.x]),t.vb(36,671744,null,0,s.t,[[2,s.d],[8,null],[8,null],[6,s.o]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Qb(2048,null,s.p,null,[s.t]),t.vb(38,16384,null,0,s.q,[[4,s.p]],null,null),(l()(),t.wb(39,0,null,null,3,"option",[],null,null,null,null,null)),t.vb(40,147456,null,0,s.u,[t.l,t.D,[2,s.x]],null,null),t.vb(41,147456,null,0,s.C,[t.l,t.D,[8,null]],null,null),(l()(),t.Vb(-1,null,["1"])),(l()(),t.wb(43,0,null,null,3,"option",[],null,null,null,null,null)),t.vb(44,147456,null,0,s.u,[t.l,t.D,[2,s.x]],null,null),t.vb(45,147456,null,0,s.C,[t.l,t.D,[8,null]],null,null),(l()(),t.Vb(-1,null,["2"])),(l()(),t.wb(47,0,null,null,3,"option",[],null,null,null,null,null)),t.vb(48,147456,null,0,s.u,[t.l,t.D,[2,s.x]],null,null),t.vb(49,147456,null,0,s.C,[t.l,t.D,[8,null]],null,null),(l()(),t.Vb(-1,null,["3"])),(l()(),t.wb(51,0,null,null,3,"option",[],null,null,null,null,null)),t.vb(52,147456,null,0,s.u,[t.l,t.D,[2,s.x]],null,null),t.vb(53,147456,null,0,s.C,[t.l,t.D,[8,null]],null,null),(l()(),t.Vb(-1,null,["4"])),(l()(),t.wb(55,0,null,null,3,"option",[],null,null,null,null,null)),t.vb(56,147456,null,0,s.u,[t.l,t.D,[2,s.x]],null,null),t.vb(57,147456,null,0,s.C,[t.l,t.D,[8,null]],null,null),(l()(),t.Vb(-1,null,["21"])),(l()(),t.wb(59,0,null,null,2,"div",[["class","col-auto my-1"]],null,null,null,null,null)),(l()(),t.wb(60,0,null,null,1,"button",[["class","btn btn-primary"],["type","submit"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Gerar"])),(l()(),t.fb(16777216,null,null,1,null,h)),t.vb(63,278528,null,0,e.k,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,22,0,"nomeLiga",u.liga.nomeLiga),l(n,29,0,"valorLiga",u.liga.valorLiga),l(n,36,0,"idRodada",u.liga.idRodada),l(n,63,0,u.ligas)}),(function(l,n){l(n,12,0,t.Lb(n,16).ngClassUntouched,t.Lb(n,16).ngClassTouched,t.Lb(n,16).ngClassPristine,t.Lb(n,16).ngClassDirty,t.Lb(n,16).ngClassValid,t.Lb(n,16).ngClassInvalid,t.Lb(n,16).ngClassPending),l(n,19,0,t.Lb(n,24).ngClassUntouched,t.Lb(n,24).ngClassTouched,t.Lb(n,24).ngClassPristine,t.Lb(n,24).ngClassDirty,t.Lb(n,24).ngClassValid,t.Lb(n,24).ngClassInvalid,t.Lb(n,24).ngClassPending),l(n,26,0,t.Lb(n,31).ngClassUntouched,t.Lb(n,31).ngClassTouched,t.Lb(n,31).ngClassPristine,t.Lb(n,31).ngClassDirty,t.Lb(n,31).ngClassValid,t.Lb(n,31).ngClassInvalid,t.Lb(n,31).ngClassPending),l(n,33,0,t.Lb(n,38).ngClassUntouched,t.Lb(n,38).ngClassTouched,t.Lb(n,38).ngClassPristine,t.Lb(n,38).ngClassDirty,t.Lb(n,38).ngClassValid,t.Lb(n,38).ngClassInvalid,t.Lb(n,38).ngClassPending)}))}function w(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,1,"app-adm-ligas",[],null,null,null,f,v)),t.vb(1,114688,null,0,g,[m.m,c.a,c.a,c.a,r.a,p.j],null,null)],(function(l,n){l(n,1,0)}),null)}var L=t.sb("app-adm-ligas",g,w,{},{},[]),C=u("28z2"),x=u("4GxJ"),y=function(){function l(l,n,u,t,i){this.toastr=l,this.modalService=n,this.listarTimesCartola=u,this.listarTimeLigaPorRodada=t,this.cadastrarTimesLigaService=i,this.timesLigaCartola=[],this.nomeTimePsq="",this.codigo="",this.parciais=[]}return l.prototype.ngOnInit=function(){var l=this;this.timesLigaCartola=[],this.nomeTimePsq="",this.codigo="",this.listarTimeLigaPorRodada.listarTimeLigaPorRodada(2020,21,1,1).subscribe((function(n){l.parciais=n}))},l.prototype.open=function(l){var n=this;this.ngOnInit(),this.modalService.open(l).result.then((function(l){n.closeResult="Closed with: "+l}),(function(l){n.closeResult="Dismissed "+n.getDismissReason(l)}))},l.prototype.getDismissReason=function(l){return l===x.a.ESC?(this.ngOnInit(),"by pressing ESC"):l===x.a.BACKDROP_CLICK?(this.ngOnInit(),"by clicking on a backdrop"):(this.ngOnInit(),"with: "+l)},l.prototype.listarTimesPorNome=function(l){var n=this;this.listarTimesCartola.listarTimesCartola(l).subscribe((function(l){n.timesLigaCartola=l}))},l.prototype.cadastrarTimeLigaCartola=function(l){for(var n=this,u=function(u){l.time_id===t.timesLigaCartola[u].time_id&&(l.idLiga=1,t.cadastrarTimesLigaService.cadastrarTimesLiga(l).subscribe((function(){n.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Time cadastrado com sucesso!',"",{timeOut:8e3,closeButton:!0,enableHtml:!0,toastClass:"alert alert-success alert-with-icon",positionClass:"toast-top-right"}),n.timesLigaCartola[u].inPoint=!0}),(function(l){n.toastr.info(l.status&&409===l.status?'<span class="now-ui-icons ui-1_bell-53"></span> Time j\xe1 cadastrado!':'<span class="now-ui-icons ui-1_bell-53"></span> N\xe3o foi poss\xedvel realizar o cadastro do time!',"",{timeOut:8e3,closeButton:!0,enableHtml:!0,toastClass:"alert alert-info alert-with-icon",positionClass:"toast-top-right"})})))},t=this,i=0;i<this.timesLigaCartola.length;i++)u(i)},l}(),J=t.ub({encapsulation:0,styles:[["a[_ngcontent-%COMP%]{color:#0e0d0d!important}"]],data:{}});function T(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,0,"img",[["class","datatable-pro"],["src","/assets/img/cartolaPRO.png"]],null,null,null,null,null))],null,null)}function P(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,18,"tr",[],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,12,"td",[],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,11,"div",[],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,1,"span",[["class","datatable-colocacao"]],null,null,null,null,null)),(l()(),t.Vb(4,null,["","\xba"])),(l()(),t.wb(5,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),t.wb(6,0,null,null,0,"img",[["class","datatable-escudo"]],[[8,"src",4]],null,null,null,null)),(l()(),t.wb(7,0,null,null,2,"span",[["class","datatable-nome-time"]],null,null,null,null,null)),(l()(),t.wb(8,0,null,null,1,"a",[["href","javascript:void(0)"]],null,null,null,null,null)),(l()(),t.Vb(9,null,[" "," "])),(l()(),t.wb(10,0,null,null,3,"span",[["class","datatable-nome-coach"]],null,null,null,null,null)),(l()(),t.fb(16777216,null,null,1,null,T)),t.vb(12,16384,null,0,e.l,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.Vb(13,null,[" "," "])),(l()(),t.wb(14,0,null,null,4,"td",[["class"," text-right"]],null,null,null,null,null)),(l()(),t.wb(15,0,null,null,1,"span",[["class","datatable-pontuacao"]],null,null,null,null,null)),(l()(),t.Vb(16,null,[" ",""])),(l()(),t.wb(17,0,null,null,1,"span",[["class","datatable-nome-coach"],["style","color:red"]],null,null,null,null,null)),(l()(),t.Vb(18,null,["","/12 "]))],(function(l,n){l(n,12,0,n.context.$implicit.assinante)}),(function(l,n){l(n,4,0,n.context.index+1),l(n,6,0,t.Db(1,"",n.context.$implicit.url_escudo_png,"")),l(n,9,0,n.context.$implicit.nome),l(n,13,0,n.context.$implicit.nome_cartola),l(n,16,0,n.context.$implicit.pontosTotais),l(n,18,0,n.context.$implicit.qtJogadoresPontuados)}))}function S(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,1,"a",[["class","btn btn-round btn-info btn-icon btn-sm edit"],["href","javascript:void(0)"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.cadastrarTimeLigaCartola(l.parent.context.$implicit)&&t),t}),null,null)),(l()(),t.wb(1,0,null,null,0,"i",[["class","fa fa-cart-plus"]],null,null,null,null,null))],null,null)}function V(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,1,"a",[["class","btn btn-round btn-success btn-icon btn-sm edit"],["href","javascript:void(0)"]],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,0,"i",[["class","fa fa-check"]],null,null,null,null,null))],null,null)}function I(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,16,"tr",[],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,9,"td",[],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,1,"span",[["class","datatable-colocacao"]],null,null,null,null,null)),(l()(),t.Vb(4,null,["",""])),(l()(),t.wb(5,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),t.wb(6,0,null,null,0,"img",[["class","datatable-escudo"]],[[8,"src",4]],null,null,null,null)),(l()(),t.wb(7,0,null,null,1,"span",[["class","datatable-nome-time"]],null,null,null,null,null)),(l()(),t.Vb(8,null,["",""])),(l()(),t.wb(9,0,null,null,1,"span",[["class","datatable-nome-coach"]],null,null,null,null,null)),(l()(),t.Vb(10,null,["",""])),(l()(),t.wb(11,0,null,null,5,"td",[],null,null,null,null,null)),(l()(),t.wb(12,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),t.fb(16777216,null,null,1,null,S)),t.vb(14,16384,null,0,e.l,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.fb(16777216,null,null,1,null,V)),t.vb(16,16384,null,0,e.l,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,14,0,!n.context.$implicit.inPoint),l(n,16,0,n.context.$implicit.inPoint)}),(function(l,n){l(n,4,0,n.context.index+1),l(n,6,0,t.Db(1,"",n.context.$implicit.url_escudo_png,"")),l(n,8,0,n.context.$implicit.nome),l(n,10,0,n.context.$implicit.nome_cartola)}))}function D(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,12,"div",[],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Adicionar Time"])),(l()(),t.wb(3,0,null,null,9,"table",[["cellspacing","0"],["class","table table-striped"],["role","grid"],["style","width: 100%;"],["width","100%"]],null,null,null,null,null)),(l()(),t.wb(4,0,null,null,5,"thead",[],null,null,null,null,null)),(l()(),t.wb(5,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.wb(6,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Times"])),(l()(),t.wb(8,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["A\xe7\xf5es"])),(l()(),t.wb(10,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.fb(16777216,null,null,1,null,I)),t.vb(12,278528,null,0,e.k,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,12,0,n.component.timesLigaCartola)}),null)}function _(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,4,"div",[["class","modal-header justify-content-center"]],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,1,"button",[["class","close"],["type","button"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.context.dismiss("Cross click")&&t),t}),null,null)),(l()(),t.wb(2,0,null,null,0,"i",[["class","now-ui-icons ui-1_simple-remove"]],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,1,"h4",[["class","title title-up"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Importar Times"])),(l()(),t.wb(5,0,null,null,40,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.wb(6,0,null,null,18,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,u){var i=!0,a=l.component;return"submit"===n&&(i=!1!==t.Lb(l,8).onSubmit(u)&&i),"reset"===n&&(i=!1!==t.Lb(l,8).onReset()&&i),"ngSubmit"===n&&(i=!1!==a.onSubmit()&&i),i}),null,null)),t.vb(7,16384,null,0,s.D,[],null,null),t.vb(8,4210688,[["f",4]],0,s.s,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),t.Qb(2048,null,s.d,null,[s.s]),t.vb(10,16384,null,0,s.r,[[4,s.d]],null,null),(l()(),t.wb(11,0,null,null,10,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.wb(12,0,null,null,1,"label",[["class","form-control-label"],["for","input-address"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,[" C\xf3digos no formato: time_id1;time_id2;time_id3"])),(l()(),t.wb(14,0,null,null,7,"input",[["aria-describedby","inputGroupPrepend"],["class","form-control"],["id","codigo"],["name","codigo"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var i=!0,a=l.component;return"input"===n&&(i=!1!==t.Lb(l,15)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Lb(l,15).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Lb(l,15)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Lb(l,15)._compositionEnd(u.target.value)&&i),"ngModelChange"===n&&(i=!1!==(a.codigo=u)&&i),i}),null,null)),t.vb(15,16384,null,0,s.e,[t.D,t.l,[2,s.a]],null,null),t.vb(16,16384,null,0,s.w,[],{required:[0,"required"]},null),t.Qb(1024,null,s.n,(function(l){return[l]}),[s.w]),t.Qb(1024,null,s.o,(function(l){return[l]}),[s.e]),t.vb(19,671744,null,0,s.t,[[2,s.d],[6,s.n],[8,null],[6,s.o]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Qb(2048,null,s.p,null,[s.t]),t.vb(21,16384,null,0,s.q,[[4,s.p]],null,null),(l()(),t.wb(22,0,null,null,2,"div",[["class","form-group"],["style","text-align:right"]],null,null,null,null,null)),(l()(),t.wb(23,0,null,null,1,"button",[["class","btn btn-fill btn-primary"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.listarTimesPorId(i.codigo)&&t),t}),null,null)),(l()(),t.Vb(-1,null,[" Buscar"])),(l()(),t.wb(25,0,null,null,18,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,u){var i=!0,a=l.component;return"submit"===n&&(i=!1!==t.Lb(l,27).onSubmit(u)&&i),"reset"===n&&(i=!1!==t.Lb(l,27).onReset()&&i),"ngSubmit"===n&&(i=!1!==a.onSubmit()&&i),i}),null,null)),t.vb(26,16384,null,0,s.D,[],null,null),t.vb(27,4210688,[["f2",4]],0,s.s,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),t.Qb(2048,null,s.d,null,[s.s]),t.vb(29,16384,null,0,s.r,[[4,s.d]],null,null),(l()(),t.wb(30,0,null,null,10,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.wb(31,0,null,null,1,"label",[["class","form-control-label"],["for","input-address"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Nome do Time"])),(l()(),t.wb(33,0,null,null,7,"input",[["aria-describedby","inputGroupPrepend"],["class","form-control"],["id","nomeTimePsq"],["name","nomeTimePsq"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var i=!0,a=l.component;return"input"===n&&(i=!1!==t.Lb(l,34)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Lb(l,34).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Lb(l,34)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Lb(l,34)._compositionEnd(u.target.value)&&i),"ngModelChange"===n&&(i=!1!==(a.nomeTimePsq=u)&&i),i}),null,null)),t.vb(34,16384,null,0,s.e,[t.D,t.l,[2,s.a]],null,null),t.vb(35,16384,null,0,s.w,[],{required:[0,"required"]},null),t.Qb(1024,null,s.n,(function(l){return[l]}),[s.w]),t.Qb(1024,null,s.o,(function(l){return[l]}),[s.e]),t.vb(38,671744,null,0,s.t,[[2,s.d],[6,s.n],[8,null],[6,s.o]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t.Qb(2048,null,s.p,null,[s.t]),t.vb(40,16384,null,0,s.q,[[4,s.p]],null,null),(l()(),t.wb(41,0,null,null,2,"div",[["class","form-group"],["style","text-align:right"]],null,null,null,null,null)),(l()(),t.wb(42,0,null,null,1,"button",[["class","btn btn-fill btn-primary"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],(function(l,n,u){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.listarTimesPorNome(i.nomeTimePsq)&&t),t}),null,null)),(l()(),t.Vb(-1,null,[" Buscar"])),(l()(),t.fb(16777216,null,null,1,null,D)),t.vb(45,16384,null,0,e.l,[t.O,t.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,16,0,""),l(n,19,0,"codigo",u.codigo),l(n,35,0,""),l(n,38,0,"nomeTimePsq",u.nomeTimePsq),l(n,45,0,u.timesLigaCartola.length)}),(function(l,n){l(n,6,0,t.Lb(n,10).ngClassUntouched,t.Lb(n,10).ngClassTouched,t.Lb(n,10).ngClassPristine,t.Lb(n,10).ngClassDirty,t.Lb(n,10).ngClassValid,t.Lb(n,10).ngClassInvalid,t.Lb(n,10).ngClassPending),l(n,14,0,t.Lb(n,16).required?"":null,t.Lb(n,21).ngClassUntouched,t.Lb(n,21).ngClassTouched,t.Lb(n,21).ngClassPristine,t.Lb(n,21).ngClassDirty,t.Lb(n,21).ngClassValid,t.Lb(n,21).ngClassInvalid,t.Lb(n,21).ngClassPending),l(n,23,0,!t.Lb(n,8).valid),l(n,25,0,t.Lb(n,29).ngClassUntouched,t.Lb(n,29).ngClassTouched,t.Lb(n,29).ngClassPristine,t.Lb(n,29).ngClassDirty,t.Lb(n,29).ngClassValid,t.Lb(n,29).ngClassInvalid,t.Lb(n,29).ngClassPending),l(n,33,0,t.Lb(n,35).required?"":null,t.Lb(n,40).ngClassUntouched,t.Lb(n,40).ngClassTouched,t.Lb(n,40).ngClassPristine,t.Lb(n,40).ngClassDirty,t.Lb(n,40).ngClassValid,t.Lb(n,40).ngClassInvalid,t.Lb(n,40).ngClassPending),l(n,42,0,!t.Lb(n,27).valid)}))}function O(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,0,"div",[["class","panel-header panel-header-sm"]],null,null,null,null,null)),(l()(),t.wb(1,0,null,null,37,"div",[["class","main-content"]],null,null,null,null,null)),(l()(),t.wb(2,0,null,null,36,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.wb(3,0,null,null,35,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),t.wb(4,0,null,null,3,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.wb(5,0,null,null,2,"div",[["style","text-align:center"]],null,null,null,null,null)),(l()(),t.wb(6,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,[" NOME DA LIGA #25"])),(l()(),t.wb(8,0,null,null,8,"div",[["class","text-right"]],null,null,null,null,null)),(l()(),t.wb(9,0,null,null,1,"a",[["class","btn btn-round btn-primary btn-icon btn-sm edit"],["data-placement","top"],["data-toggle","tooltip"],["href","javascript:void(0)"],["title","Exportar Times"]],null,null,null,null,null)),(l()(),t.wb(10,0,null,null,0,"i",[["class","now-ui-icons arrows-1_cloud-download-93"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,[" \xa0 \xa0 "])),(l()(),t.wb(12,0,null,null,1,"a",[["class","btn btn-round btn-info btn-icon btn-sm edit"],["data-placement","top"],["data-toggle","tooltip"],["href","javascript:void(0)"],["title","Importar Times"]],null,[[null,"click"]],(function(l,n,u){var i=!0;return"click"===n&&(i=!1!==l.component.open(t.Lb(l,39))&&i),i}),null,null)),(l()(),t.wb(13,0,null,null,0,"i",[["class","now-ui-icons arrows-1_share-66"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,[" \xa0 \xa0 "])),(l()(),t.wb(15,0,null,null,1,"a",[["class","btn btn-round btn-success btn-icon btn-sm edit"],["data-placement","top"],["data-toggle","tooltip"],["href","javascript:void(0)"],["title","Atualizar Parciais"]],null,null,null,null,null)),(l()(),t.wb(16,0,null,null,0,"i",[["class","now-ui-icons loader_refresh"]],null,null,null,null,null)),(l()(),t.wb(17,0,null,null,9,"div",[["class","input-group no-border"]],null,null,null,null,null)),(l()(),t.wb(18,0,null,null,5,"input",[["class","form-control"],["placeholder","Buscar time..."],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,u){var i=!0,a=l.component;return"input"===n&&(i=!1!==t.Lb(l,19)._handleInput(u.target.value)&&i),"blur"===n&&(i=!1!==t.Lb(l,19).onTouched()&&i),"compositionstart"===n&&(i=!1!==t.Lb(l,19)._compositionStart()&&i),"compositionend"===n&&(i=!1!==t.Lb(l,19)._compositionEnd(u.target.value)&&i),"ngModelChange"===n&&(i=!1!==(a.nomeTimeBusca=u)&&i),i}),null,null)),t.vb(19,16384,null,0,s.e,[t.D,t.l,[2,s.a]],null,null),t.Qb(1024,null,s.o,(function(l){return[l]}),[s.e]),t.vb(21,671744,null,0,s.t,[[8,null],[8,null],[8,null],[6,s.o]],{model:[0,"model"]},{update:"ngModelChange"}),t.Qb(2048,null,s.p,null,[s.t]),t.vb(23,16384,null,0,s.q,[[4,s.p]],null,null),(l()(),t.wb(24,0,null,null,2,"div",[["class","input-group-append"]],null,null,null,null,null)),(l()(),t.wb(25,0,null,null,1,"div",[["class","input-group-text"]],null,null,null,null,null)),(l()(),t.wb(26,0,null,null,0,"i",[["class","now-ui-icons ui-1_zoom-bold"]],null,null,null,null,null)),(l()(),t.wb(27,0,null,null,11,"div",[["class","table-responsive"]],null,null,null,null,null)),(l()(),t.wb(28,0,null,null,10,"table",[["cellspacing","0"],["class","table table-striped"],["role","grid"],["style","width: 100%;"],["width","100%"]],null,null,null,null,null)),(l()(),t.wb(29,0,null,null,5,"thead",[["class"," text-primary"]],null,null,null,null,null)),(l()(),t.wb(30,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.wb(31,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Time"])),(l()(),t.wb(33,0,null,null,1,"th",[["class","text-right"]],null,null,null,null,null)),(l()(),t.Vb(-1,null,["Pts. Total"])),(l()(),t.wb(35,0,null,null,3,"tbody",[],null,null,null,null,null)),(l()(),t.fb(16777216,null,null,2,null,P)),t.vb(37,278528,null,0,e.k,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null),t.Nb(0,C.a,[]),(l()(),t.fb(0,[["classic",2]],null,0,null,_))],(function(l,n){var u=n.component;l(n,21,0,u.nomeTimeBusca),l(n,37,0,t.Wb(n,37,0,t.Lb(n,38).transform(u.parciais,u.nomeTimeBusca)))}),(function(l,n){l(n,18,0,t.Lb(n,23).ngClassUntouched,t.Lb(n,23).ngClassTouched,t.Lb(n,23).ngClassPristine,t.Lb(n,23).ngClassDirty,t.Lb(n,23).ngClassValid,t.Lb(n,23).ngClassInvalid,t.Lb(n,23).ngClassPending)}))}function k(l){return t.Yb(0,[(l()(),t.wb(0,0,null,null,1,"app-gerenciar-liga",[],null,null,null,O,J)),t.vb(1,114688,null,0,y,[p.j,x.D,c.a,c.a,c.a],null,null)],(function(l,n){l(n,1,0)}),null)}var q=t.sb("app-gerenciar-liga",y,k,{},{},[]),R=u("t/Na"),B=u("YGOk"),F=u("ex1C"),M=u("rj1t"),$=u("lGQG"),A=u("ZYjt"),j=u("r5GR"),E=u("0tkt"),Q=u("Zehi"),Y=u("r/bd"),N=u("ltgH"),G=u("j1ZV");u.d(n,"AdmLigasModuleNgFactory",(function(){return U}));var U=t.tb(i,[],(function(l){return t.Ib([t.Jb(512,t.j,t.X,[[8,[a.a,a.b,a.f,a.g,a.c,a.d,a.e,o.a,L,q]],[3,t.j],t.x]),t.Jb(4608,e.n,e.m,[t.u]),t.Jb(4608,s.A,s.A,[]),t.Jb(4608,x.D,x.D,[t.j,t.r,x.sb,x.E]),t.Jb(4608,R.h,R.n,[e.c,t.B,R.l]),t.Jb(4608,R.o,R.o,[R.h,R.m]),t.Jb(5120,R.a,(function(l,n,u){return[l,new B.a(n),new F.a(u)]}),[R.o,M.a,$.a]),t.Jb(4608,R.g,R.g,[R.i]),t.Jb(6144,R.b,null,[R.g]),t.Jb(4608,R.f,R.j,[R.b,t.r]),t.Jb(4608,R.c,R.c,[R.f]),t.Jb(5120,A.i,A.t,[e.c,t.c]),t.Jb(5120,"virtual-scroller-default-options",j.b,[]),t.Jb(4608,j.d,j.d,[]),t.Jb(4608,s.g,s.g,[]),t.Jb(1073742336,e.b,e.b,[]),t.Jb(1073742336,x.d,x.d,[]),t.Jb(1073742336,x.h,x.h,[]),t.Jb(1073742336,x.i,x.i,[]),t.Jb(1073742336,x.m,x.m,[]),t.Jb(1073742336,x.o,x.o,[]),t.Jb(1073742336,s.z,s.z,[]),t.Jb(1073742336,s.l,s.l,[]),t.Jb(1073742336,x.u,x.u,[]),t.Jb(1073742336,x.A,x.A,[]),t.Jb(1073742336,x.F,x.F,[]),t.Jb(1073742336,x.H,x.H,[]),t.Jb(1073742336,x.M,x.M,[]),t.Jb(1073742336,x.P,x.P,[]),t.Jb(1073742336,x.S,x.S,[]),t.Jb(1073742336,x.V,x.V,[]),t.Jb(1073742336,x.db,x.db,[]),t.Jb(1073742336,x.gb,x.gb,[]),t.Jb(1073742336,x.hb,x.hb,[]),t.Jb(1073742336,x.ib,x.ib,[]),t.Jb(1073742336,x.Y,x.Y,[]),t.Jb(1073742336,x.G,x.G,[]),t.Jb(1073742336,m.q,m.q,[[2,m.v],[2,m.m]]),t.Jb(1073742336,R.e,R.e,[]),t.Jb(1073742336,R.d,R.d,[]),t.Jb(1073742336,E.a,E.a,[]),t.Jb(1073742336,Q.c,Q.c,[]),t.Jb(1073742336,Q.e,Q.e,[]),t.Jb(1073742336,Q.f,Q.f,[]),t.Jb(1073742336,Q.a,Q.a,[]),t.Jb(1073742336,Q.h,Q.h,[]),t.Jb(1073742336,Q.g,Q.g,[]),t.Jb(1073742336,Q.b,Q.b,[]),t.Jb(1073742336,Q.d,Q.d,[]),t.Jb(1073742336,Q.j,Q.j,[]),t.Jb(1073742336,Q.n,Q.n,[]),t.Jb(1073742336,Q.p,Q.p,[]),t.Jb(1073742336,Q.o,Q.o,[]),t.Jb(1073742336,Q.i,Q.i,[]),t.Jb(1073742336,Q.k,Q.k,[]),t.Jb(1073742336,Q.m,Q.m,[]),t.Jb(1073742336,Q.q,Q.q,[]),t.Jb(1073742336,Q.l,Q.l,[]),t.Jb(512,R.k,R.k,[]),t.Jb(2048,R.i,null,[R.k]),t.Jb(1073742336,Y.c,Y.c,[e.c,t.z,[2,R.i]]),t.Jb(1073742336,Y.d,Y.d,[]),t.Jb(1073742336,A.b,A.b,[]),t.Jb(1073742336,N.a,N.a,[]),t.Jb(1073742336,G.a,G.a,[]),t.Jb(1073742336,j.c,j.c,[]),t.Jb(1073742336,j.a,j.a,[]),t.Jb(1073742336,s.v,s.v,[]),t.Jb(1073742336,C.b,C.b,[]),t.Jb(1073742336,i,i,[]),t.Jb(256,R.l,"XSRF-TOKEN",[]),t.Jb(256,R.m,"X-XSRF-TOKEN",[]),t.Jb(1024,m.k,(function(){return[[{path:"",children:[{path:"admLigas",component:g},{path:"gerenciarLiga",component:y}]}]]}),[])])}))}}]);