(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[38],{106:function(e,t,a){"use strict";var c=a(0),r=a.n(c);t.a=function(e){var t=e.width,a=e.height,n=e.draw,o=e.border,i=Object(c.useRef)();return Object(c.useEffect)((function(){var e=i.current,c=e.getContext("2d");!function(e,c){var r=window.devicePixelRatio||1;e.width=t*r,e.height=a*r,e.style.width="".concat(t,"px"),e.style.height="".concat(a,"px"),c.scale(r,r)}(e,c),n(e,c)})),r.a.createElement("canvas",{style:{border:o?"1px solid white":""},ref:i,width:t,height:a})}},386:function(e,t,a){"use strict";a.r(t);var c=a(5),r=a(17),n=a(16),o=a(12),i=a(3),s=a(26),l=a(0),u=a.n(l),d=[{id:"c01",abv:"And.",sim:"AN",name:"Andaluc\xeda",x:321,y:571,pop:8414240},{id:"c02",abv:"Ar.",sim:"AR",name:"Arag\xf3n",x:575,y:231,pop:1319291},{id:"c03",abv:"Ast.",sim:"AS",name:"Asturias",x:253,y:71,pop:1022800},{id:"c04",abv:"Bal.",sim:"IB",name:"Illes Balears",x:801,y:400,pop:1149460},{id:"c05",abv:"Can.",sim:"CN",name:"Canarias",x:76,y:816,pop:2153389},{id:"c06",abv:"Cantb.",sim:"CB",name:"Cantabria",x:367,y:71,pop:581078},{id:"c07",abv:"C. y L.",sim:"CL",name:"Castilla y Le\xf3n",x:309,y:211,pop:2399548},{id:"c08",abv:"C-L. M.",sim:"CM",name:"Castilla - La Mancha",x:432,y:400,pop:2032863},{id:"c09",abv:"Cat.",sim:"CT",name:"Catalu\xf1a",x:727,y:196,pop:7675217},{id:"c10",abv:"Com. V",sim:"VC",name:"Comunitat Valenciana",x:575,y:400,pop:5003769},{id:"c11",abv:"Ext.",sim:"EX",name:"Extremadura",x:225,y:400,pop:1067710},{id:"c12",abv:"Gal.",sim:"GA",name:"Galicia",x:121,y:119,pop:2699499},{id:"c13",abv:"Mad.",sim:"MD",name:"Madrid",x:384,y:312,pop:6663394},{id:"c14",abv:"Mur.",sim:"MC",name:"Murcia",x:536,y:531,pop:1493898},{id:"c15",abv:"Nav.",sim:"NC",name:"Navarra",x:526,y:126,pop:654214},{id:"c16",abv:"P. V.",sim:"PV",name:"Pa\xeds Vasco",x:459,y:71,pop:2207776},{id:"c17",abv:"L.R.",sim:"RI",name:"La Rioja",x:459,y:167,pop:316798},{id:"c18",abv:"Ceu.",sim:"CE",name:"Ceuta",x:266,y:703,pop:84777},{id:"c19",abv:"Mel.",sim:"ME",name:"Melilla",x:438,y:741,pop:86487}],g=[{source:"c01",target:"c11"},{source:"c01",target:"c08"},{source:"c01",target:"c14"},{source:"c02",target:"c15"},{source:"c02",target:"c09"},{source:"c02",target:"c10"},{source:"c02",target:"c08"},{source:"c02",target:"c07"},{source:"c02",target:"c17"},{source:"c03",target:"c12"},{source:"c03",target:"c07"},{source:"c03",target:"c06"},{source:"c06",target:"c03"},{source:"c06",target:"c16"},{source:"c06",target:"c07"},{source:"c07",target:"c12"},{source:"c07",target:"c03"},{source:"c07",target:"c06"},{source:"c07",target:"c16"},{source:"c07",target:"c17"},{source:"c07",target:"c02"},{source:"c07",target:"c08"},{source:"c07",target:"c13"},{source:"c07",target:"c11"},{source:"c08",target:"c13"},{source:"c08",target:"c07"},{source:"c08",target:"c02"},{source:"c08",target:"c10"},{source:"c08",target:"c14"},{source:"c08",target:"c01"},{source:"c08",target:"c11"},{source:"c09",target:"c02"},{source:"c09",target:"c11"},{source:"c10",target:"c14"},{source:"c10",target:"c08"},{source:"c10",target:"c02"},{source:"c10",target:"c09"},{source:"c11",target:"c01"},{source:"c11",target:"c07"},{source:"c11",target:"c08"},{source:"c11",target:"c14"},{source:"c12",target:"c03"},{source:"c12",target:"c07"},{source:"c13",target:"c07"},{source:"c13",target:"c08"},{source:"c13",target:"c11"},{source:"c14",target:"c10"},{source:"c14",target:"c08"},{source:"c14",target:"c01"},{source:"c15",target:"c16"},{source:"c15",target:"c17"},{source:"c15",target:"c02"},{source:"c16",target:"c06"},{source:"c16",target:"c07"},{source:"c16",target:"c17"},{source:"c16",target:"c15"},{source:"c17",target:"c07"},{source:"c17",target:"c16"},{source:"c17",target:"c15"},{source:"c17",target:"c02"}],p=a(370),h=a(312),m=a(350),f=a(332),b=a(168),v=a(345),x=a(351),y=a(217),O=a(169),j=a(79),w=a(89),k=a(20),C=a(19),E=a(13),A=a(106),S=function(e){var t=e.width,a=void 0===t?900:t,c=e.height,r=void 0===c?900:c,n=e.setSelected,o=e.setIsOpen,i=e.data,f=Object(l.useRef)(),b=Object(m.a)().domain([0,1e4]).range([5,310]),v=d.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{area:b(i[e.id].deaths[i[e.id].deaths.length-1])})}));return Object(l.useEffect)((function(){for(var e=Object(p.a)(f.current),t=Object(h.b)(v).force("link",Object(h.a)(g).id((function(e){return e.id})).distance(0).strength(.0025).iterations(6)).force("x",Object(h.c)((function(e){return e.x})).strength(.1)).force("y",Object(h.d)((function(e){return e.y})).strength(.1)).force("collide",(function(){for(var e=0;e<4;++e)for(var t=0,a=v.length;t<a;++t)for(var c=v[t],r=t+1;r<a;++r){var n=v[r],o=c.x+c.vx-n.x-n.vx,i=c.y+c.vy-n.y-n.vy,s=Math.abs(o),l=Math.abs(i),u=c.area/2+n.area/2+10;s<u&&l<u&&(s>l?(s=(s-u)*(o<0?-.5:.5),c.vx-=s,n.vx+=s):(l=(l-u)*(i<0?-.5:.5),c.vy-=l,n.vy+=l))}})),a=0;a<120;++a)t.tick();t.on("tick",(function(){var t=e.selectAll("g").data(v).enter().append("g").attr("transform",(function(e){return"translate(".concat(e.x,", ").concat(e.y,")")}));t.append("rect").attr("width",(function(e){return e.area})).attr("height",(function(e){return e.area})).attr("x",(function(e){return-e.area/2})).attr("y",(function(e){return-e.area/2})).attr("fill","var(--foreground-color)").style("cursor","pointer"),t.on("click",(function(e){n(Object(s.a)(Object(s.a)({},e),i[e.id])),o(!0)})),t.append("text").style("font-size","22px").style("fill","var(--background-color)").style("pointer-events","none").attr("text-anchor","middle").attr("dominant-baseline","middle").attr("dy",(function(e){return e.area>90?-15:""})).text((function(e){return e.area>30?e.sim:""})),t.append("text").style("font-weight","700").style("font-size","26px").style("pointer-events","none").style("fill","var(--background-color)").style("opacity","0.5").attr("text-anchor","middle").attr("dy",15).attr("dominant-baseline","middle").text((function(e){return e.area>90?i[e.id].total:""}))}))}),[v]),u.a.createElement(u.a.Fragment,null,u.a.createElement("svg",{ref:f,style:{width:"100%",overflow:"visible"},viewBox:"0 0 ".concat(a," ").concat(r)},u.a.createElement("polyline",{stroke:"var(--foreground-color)",fill:"none",points:"0,745 175,745 175,900",style:{opacity:"0.5",strokeDasharray:"4 2"}})))},M=function(e){var t,a=e.selected,c=e.dates,r=e.colors,d=e.isOpen,g=e.setIsOpen,p=e.dark,h=Object(j.a)({polyfill:w.a}),m=Object(i.a)(h,2),f=m[0],b=m[1],v=Object(l.useContext)(E.c).language,x=v.isEnglish,y=Object(k.b)({opacity:d?1:0,pointerEvents:d?"auto":"none"}),O=Math.max.apply(Math,Object(o.a)(a.deaths)),C=a.deaths.indexOf(O),A=c[C],S=a.deaths[C];return u.a.createElement(k.a.div,{className:"tooltip",style:Object(s.a)(Object(s.a)({},y),{},{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",overflow:"visible",zIndex:2,background:"var(--background-color)",border:"1px solid var(--foreground-color)",width:"calc(100% - 60px)",maxWidth:"800px",height:"390px",boxShadow:p?"5px -5px 3px -3px rgba(0,0,0,0.2)":"5px -5px 3px -3px rgba(255,255,255,0.2)"}),width:"".concat(50,"px"),height:"".concat(50,"px"),viewBox:"0 0 ".concat(50," ").concat(50)},u.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"50px",borderBottom:"1px solid var(--foreground-color)"}},u.a.createElement("p",{style:{margin:0,padding:"1em"},className:"h4"},null===a||void 0===a?void 0:a.name),u.a.createElement("div",{onClick:function(){return g(!d)},style:(t={cursor:"pointer",height:"100%",marginLeft:"auto",width:"50px"},Object(n.a)(t,"height","50px"),Object(n.a)(t,"background","var(--foreground-color)"),Object(n.a)(t,"display","flex"),Object(n.a)(t,"justifyContent","center"),Object(n.a)(t,"alignItems","center"),t)},u.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:32,height:32,"aria-hidden":"true"},u.a.createElement("path",{fill:"var(--background-color)",strokeWidth:"1",stroke:"var(--background-color)",d:"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"})))),u.a.createElement("div",{ref:f,className:"tooltipGraph",style:{margin:"1em",height:"230px"}},u.a.createElement("div",{className:"keyCanvas",style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},u.a.createElement("p",{style:{margin:0,padding:0}},x?"Quarantine":"Cuarentena",u.a.createElement("br",null),new Date(new Date("2020-03-15")).toLocaleString(v.id).split(" ")[0].replace(",","")),u.a.createElement("p",{style:{textAlign:"right"}},x?"Deaths:":"Muertes:",u.a.createElement("br",null),u.a.createElement("strong",null,a.total))),u.a.createElement(I,{dates:c,width:b.width,height:b.height,selected:a,colors:r,isEnglish:x,dark:p,maxYScale:O,maxIndex:C,maxDate:A,maxNumber:S})),u.a.createElement("div",{className:"notes",style:{margin:"3em 1em 0 1em"}},u.a.createElement("p",{style:{opacity:"0.5",fontSize:"90%"}},x?"Updated":"Actualizado"," ",new Date(c.upd).toLocaleString(v.id).split(" ")[0].replace(",",""),".")))},I=function(e){var t=e.selected,a=e.width,n=e.height,o=e.colors,i=e.dark,s=e.maxYScale,l=e.dates,d=i?"RGBA(255, 255, 255, 0.8)":"RGBA(26, 27, 30, 0.6)",g=50,p=0,h=50,m=40,O=Object(f.a)().domain([l.dates[0],l.upd]).range([0,a-p-h]),j=Object(b.a)().domain([0,s]).range([n-g-m,0]),w=function(){function e(t){var a=t.selected;Object(c.a)(this,e),this.id=a.id,this.position=a.position,this.center=a.center,this.row=a.row,this.column=a.column,this.cellSize=a.cellSize,this.cell=a.cell,this.name=a.name,this.code=a.code,this.eu=a.eu,this.first=l.dates[0],this.deaths=a.deaths}return Object(r.a)(e,[{key:"draw",value:function(e){var t=Object(v.a)().y0(n-g-m).curve(x.a).context(e),a=Object(y.a)().context(e);e.beginPath(),e.translate(h,g),e.fillStyle=o.bg,t(this.deaths.map((function(e,t){return[O(l.dates[t]),j(e)]}))),e.closePath(),e.fill(),e.strokeStyle=o.main,e.lineWidth=3,e.beginPath(),a(this.deaths.map((function(e,t){return[O(l.dates[t]),j(e)]}))),e.stroke(),e.lineWidth=.5,k(e),C(e),E(e)}},{key:"update",value:function(e){this.draw(e)}},{key:"animate",value:function(e){this.draw(e)}}]),e}(),k=function(e){var t=a/150,c=O.ticks(t),r=O.tickFormat();e.beginPath(),c.forEach((function(t){e.moveTo(O(t),n-g-m),e.lineTo(O(t),n-g-m+6)})),e.strokeStyle="gray",e.fillStyle="gray",e.stroke(),e.textAlign="center",e.textBaseline="top",e.font="12px Inter",c.forEach((function(t){e.fillText(r(t),O(t),n-g-m+6+7)}))},C=function(e){var t=j.ticks(3),c=j.tickFormat(3);e.beginPath(),t.forEach((function(t){e.moveTo(-h,j(t)),e.lineTo(a-h-p,j(t))})),e.fillStyle="gray",e.strokeStyle=d,e.setLineDash([2,1]),e.stroke(),e.setLineDash([]),e.textAlign="left",e.textBaseline="left",e.font="12px Inter",t.forEach((function(t){e.fillText(c(t),-h,j(t)-20)})),e.save(),e.rotate(-Math.PI/2),e.textAlign="right",e.textBaseline="top",e.restore()},E=function(e){e.strokeStyle=d;var t=new Date("2020-03-15");e.beginPath(),e.moveTo(-h,10-g),e.lineTo(O(t),10-g),e.lineTo(O(t),n-g-m),e.stroke()};return u.a.createElement(A.a,{style:{overflow:"visible"},draw:function(e,a){!function(e,a){new w({selected:t}).update(a)}(0,a)},width:a,height:n})};t.default=function(){var e=Object(l.useState)(null),t=Object(i.a)(e,2),a=t[0],c=t[1],r=Object(l.useState)(null),n=Object(i.a)(r,2),s=n[0],d=n[1],g=Object(l.useState)(!1),p=Object(i.a)(g,2),h=p[0],m=p[1],f=Object(l.useState)(null),b=Object(i.a)(f,2),v=b[0],x=b[1],y=Object(l.useState)(!1),j=Object(i.a)(y,2),w=j[0],k=j[1],A=function(){x(null),w(!1)},I=Object(l.useContext)(C.b).dark,B=Object(l.useContext)(E.c).language;Object(l.useEffect)((function(){fetch("https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_covid19_fallecidos.csv").then((function(e){return e.ok?e.text():Promise.reject(e.status)})).then((function(e){return Object(O.a)(e)})).then((function(e){var t=e.reduce((function(e,t,a,c){var r=t.CCAA,n=t.cod_ine,i="c".concat(n);if(delete t.CCAA,delete t.cod_ine,0===a){var s=Object(o.a)(Object.keys(t)).map((function(e){return new Date(e)}));d({dates:s,upd:s[s.length-1]})}var l=Object(o.a)(Object.values(t)).map((function(e){return+e}));return e[i]={key:i,cod:n,ca:r,deaths:l,total:l[l.length-1]},e}),{});c(t),m(!0)}))}),[]);var L={bg:I?"RGBA(234, 234, 234, 0.20)":"RGBA(26, 27, 30, 0.10)",main:I?"RGBA(234, 234, 234, 1.00)":"RGBA(26, 27, 30, 1.00)"};return u.a.createElement("div",{style:{width:"100%",maxWidth:"600px",margin:"0 auto",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},h&&a&&s&&u.a.createElement(S,{data:a,closeTip:A,setSelected:x,setIsOpen:k,language:B}),h&&v&&s&&u.a.createElement(M,{dates:s,selected:v,closeTip:A,colors:L,isOpen:w,setIsOpen:k,dark:I}))}}}]);
//# sourceMappingURL=38.b120ba4b.chunk.js.map