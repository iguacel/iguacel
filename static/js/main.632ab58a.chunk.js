(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[7],{13:function(e,t,n){"use strict";n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c}));var a=n(3),r=n(0),o=n.n(r),l=[{id:"en",text:"English",isEnglish:!0},{id:"es",text:"Espa\xf1ol",isEnglish:!1}],i=Object(r.createContext)({language:navigator.language.includes("es")?l[1]:l[0]}),c=function(e){var t=Object(r.useContext)(i),n=Object(r.useState)(t.language),l=Object(a.a)(n,2),c=l[0],s=l[1],m={language:c,setLanguage:function(e){s(e)}};return o.a.createElement(i.Provider,{value:m},e.children)};t.c=i},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(3),r=n(0),o=n.n(r),l=o.a.createContext({dark:!0,toggle:function(){}});function i(e){var t=Object(r.useState)(!0),n=Object(a.a)(t,2),i=n[0],m=n[1];Object(r.useLayoutEffect)((function(){"true"===window.localStorage.getItem("darkTheme")||!0===i?(m(!0),u(s)):(m(!1),u(c))}),[i]);var u=function(e){document.getElementsByTagName("html")[0].style.cssText=e.join(";")};return o.a.createElement(l.Provider,{value:{dark:i,toggle:function(){document.getElementsByTagName("body")[0].style.cssText="transition: background .5s ease",m(!i),window.localStorage.setItem("darkTheme",!i)}}},e.children)}t.b=l;var c=["--foreground-color-rgb: 40, 40, 40","--foreground-color-a: 1","--background-color: white"],s=["--foreground-color-rgb: 255, 255, 255","--foreground-color-a: 1","--background-color: RGBA(26, 27, 30, 1.00)"]},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"i",(function(){return l})),n.d(t,"h",(function(){return i})),n.d(t,"f",(function(){return c})),n.d(t,"g",(function(){return s})),n.d(t,"b",(function(){return m})),n.d(t,"c",(function(){return u})),n.d(t,"e",(function(){return p})),n.d(t,"d",(function(){return h})),n.d(t,"j",(function(){return d}));n(34),n(44);var a=n(45),r=n(12),o=function(e){return new Array(e).fill(0).map((function(e,t){return t}))},l=function(e,t){return~~i(e,t)},i=function(e,t){if(!e&&0!==e)return Math.random();if(!t&&0!==t)return Math.random()*e;if(e>t){var n=[t,e];e=n[0],t=n[1]}return e+Math.random()*(t-e)},c=function(e,t,n){return e+(t-e)*n},s=function(e){var t=Object(a.a)(e),n=t[0],o=t.slice(1);return[].concat(Object(r.a)(o),[n])},m=function(e){return e*Math.PI/180},u=function(e,t,n,a){return Math.sqrt(Math.pow(e-n,2)+Math.pow(t-a,2))},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0};return Math.hypot(e.x-t.x,t.y-e.y)},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0};return Math.atan2(t.y-e.y,t.x-e.x)},d=(Math.PI,Math.PI,Math.PI,Math.PI,Math.PI,Math.PI,Math.sqrt(5),function(e,t){if(e.length>t){for(var n=t;n>0;n--)if(" "===e.charAt(n)&&(","!==e.charAt(n-1)||"."!==e.charAt(n-1)||";"!==e.charAt(n-1)))return e.substring(0,n)+"...";return e.substring(0,t)+"..."}return e})},31:function(e,t,n){e.exports=n.p+"static/media/light.0a742f75.mp3"},39:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(0);function r(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];var l=Object(a.useRef)();Object(a.useEffect)((function(){l.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t&&void 0!==t){var e=setInterval((function(){l.current.apply(l,r)}),t);return function(){return clearInterval(e)}}}),[r,t])}},47:function(e,t,n){e.exports=n.p+"static/media/burguer.b3d490aa.mp3"},48:function(e,t,n){e.exports=n.p+"static/media/click.efdadc4f.mp3"},49:function(e,t,n){e.exports=n.p+"static/media/info.b3d490aa.mp3"},53:function(e,t,n){},54:function(e,t,n){e.exports=n(68)},58:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n(8),o=n(9),l=n(35),i=n(0),c=n.n(i),s=n(41),m=n.n(s),u=(n(58),n(18)),p=n(2),h=n(3),d=(n(53),n(39)),f=n(26),g=function(){var e=Object(i.useState)(["\u2588","\u2593","\u2592","\u2591"]),t=Object(h.a)(e,2),n=t[0],a=t[1];return Object(d.a)((function(){a(Object(f.g)(n))}),200),c.a.createElement("div",{style:{height:"100vh",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},c.a.createElement("div",{className:"animated show center animated fast",style:{transform:"scale(2)"}},c.a.createElement("p",{style:{fontFamily:"'Times New Roman', Times, serif"}},n.map((function(e,t){return c.a.createElement("span",{key:"Loader".concat(t)},e)})))))},b=n(25),E=(n(60),n(20)),v=function(e){var t=document.URL,n="/virtual/".concat(t,"?/#").concat(function(e){e=e.toString().toLowerCase().trim();return[{to:"a",from:"[\xc0\xc1\xc2\xc3\xc4\xc5\xc6\u0100\u0102\u0104\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6]"},{to:"c",from:"[\xc7\u0106\u0108\u010c]"},{to:"d",from:"[\xd0\u010e\u0110\xde]"},{to:"e",from:"[\xc8\xc9\xca\xcb\u0112\u0114\u0116\u0118\u011a\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6]"},{to:"g",from:"[\u011c\u011e\u0122\u01f4]"},{to:"h",from:"[\u0124\u1e26]"},{to:"i",from:"[\xcc\xcd\xce\xcf\u0128\u012a\u012e\u0130\u1ec8\u1eca]"},{to:"j",from:"[\u0134]"},{to:"ij",from:"[\u0132]"},{to:"k",from:"[\u0136]"},{to:"l",from:"[\u0139\u013b\u013d\u0141]"},{to:"m",from:"[\u1e3e]"},{to:"n",from:"[\xd1\u0143\u0145\u0147]"},{to:"o",from:"[\xd2\xd3\xd4\xd5\xd6\xd8\u014c\u014e\u0150\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u01ea\u01ec\u01a0]"},{to:"oe",from:"[\u0152]"},{to:"p",from:"[\u1e55]"},{to:"r",from:"[\u0154\u0156\u0158]"},{to:"s",from:"[\xdf\u015a\u015c\u015e\u0160]"},{to:"t",from:"[\u0162\u0164]"},{to:"u",from:"[\xd9\xda\xdb\xdc\u0168\u016a\u016c\u016e\u0170\u0172\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u01af]"},{to:"w",from:"[\u1e82\u0174\u1e80\u1e84]"},{to:"x",from:"[\u1e8d]"},{to:"y",from:"[\xdd\u0176\u0178\u1ef2\u1ef4\u1ef6\u1ef8]"},{to:"z",from:"[\u0179\u017b\u017d]"},{to:"-",from:"[\xb7/_,:;']"}].forEach((function(t){e=e.replace(new RegExp(t.from,"gi"),t.to)})),e.replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}(e));window.ga&&window.ga("gtm1.send","pageview",n),window.ga&&window.ga("gtm2.send","pageview",n)},x=n(11),w=n(47),y=n.n(w),k=function(){var e=Object(i.useState)(!1),t=Object(h.a)(e,2),n=t[0],a=t[1],r=Object(E.b)({width:n?"180px":"32px",height:n?"100px":"34px",opacity:n?1:0,config:{mass:1,tension:120,friction:14}}),o=Object(x.a)(y.a,{volume:1}),l=Object(h.a)(o,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"burguer-wrapper"},c.a.createElement("div",{className:"navSquares n1"}),c.a.createElement("div",{className:"navSquares n2"}),c.a.createElement("div",{className:"navSquares n3"}),c.a.createElement("div",{className:"navSquares n4"})),c.a.createElement(E.a.div,{onClick:function(){a(!n),l(),v("burguer")},className:"modal",style:Object(b.a)({},r)},c.a.createElement("div",{className:"modalContent"},c.a.createElement("div",{className:"name"},c.a.createElement("h1",{style:{fontSize:"1.2em",lineHeight:"1.2em",letterSpacing:"0.02em"}},"Iguacel")),c.a.createElement("div",{className:"social"},c.a.createElement("a",{href:"https://github.com/iguacel",target:"_blank",rel:"noopener noreferrer"},"Github"),c.a.createElement("a",{href:"https://twitter.com/infoiguacel?lang=es",target:"_blank",rel:"noopener noreferrer"},"Twitter")))))},_=(n(61),n(71)),j=n(19),O=n(13),C=n(48),S=n.n(C),z=n(49),D=n.n(z),M={exp_1:{id:"exp_1",index:1,title:{en:"Moon phases ",es:"Fases de la luna"},tools:"SVG",info:{en:c.a.createElement("p",null,"Click/tap anywhere. Moon\u2019s cycle function by"," ",c.a.createElement("a",{href:"https://observablehq.com/@martien/moon-phases",title:"MoonPhases",target:"_blank",rel:"noopener noreferrer"},"Martien van Steenbergen."," ")),es:c.a.createElement("p",null,"Haz click en cualquier parte. Funci\xf3n para los ciclos de la luna de"," ",c.a.createElement("a",{href:"https://observablehq.com/@martien/moon-phases",title:"MoonPhases",target:"_blank",rel:"noopener noreferrer"},"Martien van Steenbergen."," "))}},exp_2:{id:"exp_2",index:2,title:{en:"Hexagonal bins",es:"Hex\xe1gonos"},tools:"SVG, d3",info:{en:c.a.createElement("p",null,"Grid:"," ",c.a.createElement("a",{href:"https://github.com/d3/d3-hexbin",title:"d3-hexbin on github",target:"_blank",rel:"noopener noreferrer"},"d3-hexbin"),". Resize the window or click the switch button on the top right corner to generate more random patterns."),es:c.a.createElement("p",null,"Grid:"," ",c.a.createElement("a",{href:"https://github.com/d3/d3-hexbin",title:"d3-hexbin on github",target:"_blank",rel:"noopener noreferrer"},"d3-hexbin"),". Redimensiona la ventana o haz click en el bot\xf3n de la esquina superior derecha para generar otros patrones.")}},exp_3:{id:"exp_3",index:3,title:{en:"The Office S04E05",es:"The Office S04E05"},tools:"Canvas",info:{en:c.a.createElement("p",null,c.a.createElement("a",{href:"https://www.youtube.com/watch?v=QOtuX0jL85Y",title:"The DVD Logo - The Office US",target:"_blank",rel:"noopener noreferrer"},"The DVD Logo - The Office US.")," ","Shows number of bounces and number of hits into the corner of the screen."),es:c.a.createElement("p",null,c.a.createElement("a",{href:"https://www.youtube.com/watch?v=QOtuX0jL85Y",title:"The DVD Logo - The Office US",target:"_blank",rel:"noopener noreferrer"},"DVD Logo - The Office US.")," ","Muestra el n\xfamero de rebotes y el n\xfamero de rebotes en la esquina de la pantalla.")}},exp_4:{id:"exp_4",index:4,title:{en:"Loop",es:"Loop"},tools:"SVG",info:{en:"Animated patterns. Disabled on Safari because of bad performance.",es:"Patrones animados. Desactivado en Safari por mal rendimiento."}},exp_5:{id:"exp_5",index:5,title:{en:"Floppy disks",es:"Discos flexibles"},tools:"Svg, react-spring",info:{en:c.a.createElement("p",null,"Click/tap anywhere."),es:c.a.createElement("p",null,"Haz click o toca en cualquier parte.")}},exp_6:{id:"exp_6",index:6,title:{en:"Eye",es:"Ojo"},tools:"three.js, r3f, react-spring",info:{en:c.a.createElement("p",null," ","Extends"," ",c.a.createElement("a",{href:"https://github.com/ryanking1809/threejs-meshline",title:"THREE.MeshLine on github",target:"_blank",rel:"noopener noreferrer"},"threejs-meshline")),es:c.a.createElement("p",null," ","Extiende"," ",c.a.createElement("a",{href:"https://github.com/ryanking1809/threejs-meshline",title:"THREE.MeshLine on github",target:"_blank",rel:"noopener noreferrer"},"threejs-meshline."))}},exp_7:{id:"exp_7",index:7,title:{en:"Simulation",es:"Simulaci\xf3n"},tools:"Canvas",info:{en:c.a.createElement("p",null,"Inspired by this"," ",c.a.createElement("a",{href:"https://www.washingtonpost.com/graphics/2020/world/corona-simulator/",title:"Dave Bees and Bombs on instagram",target:"_blank",rel:"noopener noreferrer"},"Washington Post visualization.")),es:c.a.createElement("p",null,"Inspirado en esta"," ",c.a.createElement("a",{href:"https://www.washingtonpost.com/graphics/2020/world/corona-simulator/",title:"Dave Bees and Bombs on instagram",target:"_blank",rel:"noopener noreferrer"},"visualizaci\xf3n del Washington Post."))}},exp_8:{id:"exp_8",index:8,title:{en:"Unabomber",es:"Unabomber"},tools:"Canvas",info:{en:c.a.createElement("p",null,c.a.createElement("span",{style:{color:"#AD8762"}},"\u25a0")," Explosion with victims."," ",c.a.createElement("span",{style:{color:"#ADB1B5"}},"\u25a0")," Bomb defused"),es:c.a.createElement("p",null,c.a.createElement("span",{style:{color:"#AD8762"}},"\u25a0")," Explosi\xf3n con victimas."," ",c.a.createElement("span",{style:{color:"#ADB1B5"}},"\u25a0")," Bomba desactivada.")}},exp_9:{id:"exp_9",index:9,title:{en:"Factorization diagrams",es:"Factorizaci\xf3n"},tools:"R3F, Three, React spring",info:{en:c.a.createElement("p",null,"Brent Yorgey's"," ",c.a.createElement("a",{href:"https://mathlesstraveled.com/2012/10/05/factorization-diagrams/",title:"Mathless traveled",target:"_blank",rel:"noopener noreferrer"},"factorization diagrams")," ","on 3D."),es:c.a.createElement("p",null,c.a.createElement("a",{href:"https://mathlesstraveled.com/2012/10/05/factorization-diagrams/",title:"Mathless traveled",target:"_blank",rel:"noopener noreferrer"},"Diagramas de factorizaci\xf3n")," ","de Brent Yorgey en 3D.")}},exp_10:{id:"exp_10",index:10,title:{en:"Cylinders",es:"Cilindros"},tools:"R3F, THREE",info:{en:c.a.createElement("p",null,"Playing with"," ",c.a.createElement("a",{href:"https://www.instagram.com/p/B3dHAHCHSrv/",title:"Dave Bees and Bombs on instagram",target:"_blank",rel:"noopener noreferrer"},"this gif")," ","by Dave Bees and Bombs."),es:c.a.createElement("p",null,"Jugando con"," ",c.a.createElement("a",{href:"https://www.instagram.com/p/B3dHAHCHSrv/",title:"Dave Bees and Bombs on instagram",target:"_blank",rel:"noopener noreferrer"},"este gif")," ","de Dave Bees and Bombs.")}},exp_11:{id:"exp_11",index:11,title:{en:"COVID deaths per day",es:"Muertes diarias COVID"},tools:"Canvas, svg, d3",info:{en:c.a.createElement("p",null,"Click or tap on each country. Check out this"," ",c.a.createElement("a",{href:"https://www.nytimes.com/interactive/2020/03/21/us/coronavirus-us-cases-spread.html",title:"Coronavirus US cases",target:"_blank",rel:"noopener noreferrer"},"cartogram by the NYT"),". Data:"," ",c.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19",title:"2019 Novel Coronavirus COVID-19",target:"_blank",rel:"noopener noreferrer"},"Johns Hopkins University.")),es:c.a.createElement("p",null,"Haz click en cada pa\xeds para desplegar m\xe1s datos. Recreando este"," ",c.a.createElement("a",{href:"https://www.nytimes.com/interactive/2020/03/21/us/coronavirus-us-cases-spread.html",title:"Coronavirus US cases",target:"_blank",rel:"noopener noreferrer"},"cartograma del NYT"),". Datos:"," ",c.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19",title:"2019 Novel Coronavirus COVID-19",target:"_blank",rel:"noopener noreferrer"},"Johns Hopkins University."))}},exp_12:{id:"exp_12",index:12,title:{en:"Breakout",es:"Breakout"},tools:"Canvas",info:{en:c.a.createElement("p",null,"Going through this Mozilla's"," ",c.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript",title:"2D breakout game using pure JavaScript",target:"_blank",rel:"noopener noreferrer"},"canvas tutorial")," ","in React."),es:c.a.createElement("p",null,"Siguiendo este"," ",c.a.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript",title:"2D breakout game using pure JavaScript",target:"_blank",rel:"noopener noreferrer"},"tutorial de canvas de Mozilla")," ","en React.")}},exp_13:{id:"exp_13",index:13,title:{en:"Lines",es:"L\xedneas"},tools:"THREE, R3F",info:{en:c.a.createElement("p",null,"Click/tap anywhere. Extends"," ",c.a.createElement("a",{href:"https://github.com/ryanking1809/threejs-meshline",title:"THREE.MeshLine on github",target:"_blank",rel:"noopener noreferrer"},"threejs-meshline")),es:c.a.createElement("p",null,"Haz click en cualquier parte. Extiende"," ",c.a.createElement("a",{href:"https://github.com/ryanking1809/threejs-meshline",title:"THREE.MeshLine on github",target:"_blank",rel:"noopener noreferrer"},"threejs-meshline"))}},exp_14:{id:"exp_14",index:14,title:{en:"Criterion AR",es:"Criterion AR"},tools:"Canvas, Node",info:{en:c.a.createElement("p",null,"Shows the aspect ratio of all the numbered releases, excluding anthologies and box sets, of the"," ",c.a.createElement("a",{href:"https://www.criterion.com/",title:"Criterion",target:"_blank",rel:"noopener noreferrer"},"Criterion")," ","main collection."),es:c.a.createElement("p",null,"Visualiza el aspect ratio de todas las pel\xedculas numeradas, excluyendo antolog\xedas y box sets, de la colecci\xf3n principal de"," ",c.a.createElement("a",{href:"https://www.criterion.com/",title:"Criterion",target:"_blank",rel:"noopener noreferrer"},"Criterion"),".")}},exp_15:{id:"exp_15",index:15,title:{en:"Game of life",es:"Juego de la vida"},tools:"React, css grid",info:{en:c.a.createElement("p",null,"Going through"," ",c.a.createElement("a",{href:"https://youtu.be/DvVt11mPuM0",title:"2D breakout game using pure JavaScript",target:"_blank",rel:"noopener noreferrer"},"this tutorial")," ","by Ben Awad. John Conway explains the rules of the game in"," ",c.a.createElement("a",{href:"https://www.bradyharanblog.com/blog/john-conway-1937-2020",title:"Does John Conway hate his Game of Life?",target:"_blank",rel:"noopener noreferrer"},"this interview.")),es:c.a.createElement("p",null,"Siguiendo"," ",c.a.createElement("a",{href:"https://youtu.be/DvVt11mPuM0",title:"Does John Conway hate his Game of Life?",target:"_blank",rel:"noopener noreferrer"},"este tutorial")," ","de Ben Awad. John Conway explica las reglas del juego en"," ",c.a.createElement("a",{href:"https://www.bradyharanblog.com/blog/john-conway-1937-2020",title:"Does John Conway hate his Game of Life?",target:"_blank",rel:"noopener noreferrer"},"esta entrevista de Numberphile."))}},exp_16:{id:"exp_16",index:16,title:{en:"1977\u20141982",es:"1977\u20141982"},tools:"Canvas, react-spring",info:{en:c.a.createElement("p",null,"Some of my favourite circular hardcore/crust punk logos (1977\u20141982). Not including the"," ",c.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Germs_(band)",title:"Germs",target:"_blank",rel:"noopener noreferrer"},"Germs,")," ","amongst others, is pretty lame. I used"," ",c.a.createElement("a",{href:"https://spotify.github.io/coordinator/",title:"co\xf6rdinator",target:"_blank",rel:"noopener noreferrer"},"this tool")," ","by"," ",c.a.createElement("a",{href:"https://twitter.com/alizauf",title:"Aliza Aufrichtig",target:"_blank",rel:"noopener noreferrer"},"@alizauf")," ","to get the coordinates for each point."),es:c.a.createElement("p",null,"Logos circulares de bandas hardcore/crust (1977\u2014 1982). No incluye a los"," ",c.a.createElement("a",{href:"https://es.wikipedia.org/wiki/Germs",title:"Germs",target:"_blank",rel:"noopener noreferrer"},"Germs")," ",":( He usado"," ",c.a.createElement("a",{href:"https://spotify.github.io/coordinator/",title:"co\xf6rdinator",target:"_blank",rel:"noopener noreferrer"},"esta herramienta")," ","de"," ",c.a.createElement("a",{href:"https://twitter.com/alizauf",title:"Aliza Aufrichtig",target:"_blank",rel:"noopener noreferrer"},"@alizauf")," ","para obtener las coordenadas de cada punto.")}},exp_17:{id:"exp_17",index:17,title:{en:"C64 10 PRINT",es:"C64 10 PRINT"},tools:"Canvas",info:{en:c.a.createElement("p",null,c.a.createElement("a",{href:"https://twitter.com/rumyra",title:"Ruth John",target:"_blank",rel:"noopener noreferrer"},"Ruth")," ","and"," ",c.a.createElement("a",{href:"https://twitter.com/twholman",title:"Tim Holman",target:"_blank",rel:"noopener noreferrer"},"Tim")," ","made a series of"," ",c.a.createElement("a",{href:"https://generativeartistry.com/episodes/",title:"Generative Artistry",target:"_blank",rel:"noopener noreferrer"},"podcasts")," ","about generative art. This canvas is based on the first of their"," ",c.a.createElement("a",{href:"https://generativeartistry.com/tutorials/tiled-lines/",title:"Generative Artistry",target:"_blank",rel:"noopener noreferrer"},"tutorials"),"."),es:c.a.createElement("p",null,c.a.createElement("a",{href:"https://twitter.com/rumyra",title:"Ruth John",target:"_blank",rel:"noopener noreferrer"},"Ruth")," ","y"," ",c.a.createElement("a",{href:"https://twitter.com/twholman",title:"Tim Holman",target:"_blank",rel:"noopener noreferrer"},"Tim")," ","han creado una serie de"," ",c.a.createElement("a",{href:"https://generativeartistry.com/episodes/",title:"Generative Artistry",target:"_blank",rel:"noopener noreferrer"},"podcasts")," ","sobre arte generativo. Este canvas est\xe1 basado en el primero de sus"," ",c.a.createElement("a",{href:"https://generativeartistry.com/tutorials/tiled-lines/",title:"Generative Artistry",target:"_blank",rel:"noopener noreferrer"},"tutoriales"),".")}},exp_18:{id:"exp_18",index:18,title:{en:"Cosmic Mystery",es:"Misterio C\xf3smico"},tools:"Canvas, svg, R3F, react-spring",info:{en:c.a.createElement("p",null,"Kepler's"," ",c.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Mysterium_Cosmographicum",title:"Mysterium Cosmographicum",target:"_blank",rel:"noopener noreferrer"},"Mysterium Cosmographicum"),"."),es:c.a.createElement("p",null,c.a.createElement("a",{href:"https://es.wikipedia.org/wiki/Mysterium_Cosmographicum",title:"Germs",target:"_blank",rel:"noopener noreferrer"}," ","El Misterio Cosmogr\xe1fico")," ","de Johannes Kepler.")}},exp_19:{id:"exp_19",index:19,title:{en:"COVID deaths, Spain",es:"Muertes por COVID"},tools:"Canvas, svg, d3",info:{en:c.a.createElement("p",null,"Click or tap on each square. Source:"," ",c.a.createElement("a",{href:"https://github.com/datadista/datasets/tree/master/COVID%2019",title:"COVID-19 Datadista",target:"_blank",rel:"noopener noreferrer"},"Datadista.")),es:c.a.createElement("p",null,"Haz click en cada CC. AA. para desplegar m\xe1s datos. Fuente:"," ",c.a.createElement("a",{href:"https://github.com/datadista/datasets/tree/master/COVID%2019",title:"COVID-19 Datadista",target:"_blank",rel:"noopener noreferrer"},"Datadista."))}},exp_20:{id:"exp_20",index:20,title:{en:"EsCovid19Data",es:"EsCovid19Data"},tools:"Canvas, svg, d3",info:{en:c.a.createElement("p",null,"Source:"," ",c.a.createElement("a",{href:"https://github.com/montera34/escovid19data",title:"COVID-19 Datadista",target:"_blank",rel:"noopener noreferrer"},"EsCovid19.")),es:c.a.createElement("p",null,"Fuente:"," ",c.a.createElement("a",{href:"https://github.com/montera34/escovid19data",title:"COVID-19 EsCovid19",target:"_blank",rel:"noopener noreferrer"},"EsCovid19."))}},exp_21:{id:"exp_21",index:21,title:{en:"GLSL shader",es:"GLSL shader"},tools:"webgl, three.js, react-three-fiber",info:{en:c.a.createElement("p",null,"First shader. Check out"," ",c.a.createElement("a",{href:"https://twitter.com/akella",title:"@akella twitter",target:"_blank",rel:"noopener noreferrer"},"Yuri Artiukh")," ","live coding sessions on"," ",c.a.createElement("a",{href:"https://www.youtube.com/channel/UCDo7RTzizoOdPjY8A-xDR7g",title:"Yuri Artyukh channel on youtube",target:"_blank",rel:"noopener noreferrer"},"youtube"),"."),es:c.a.createElement("p",null,"Primer shader siguiendo una"," ",c.a.createElement("a",{href:"https://www.youtube.com/channel/UCDo7RTzizoOdPjY8A-xDR7g",title:"Yuri Artyukh channel on youtube",target:"_blank",rel:"noopener noreferrer"},"sesi\xf3n de c\xf3digo en directo")," ","de"," ",c.a.createElement("a",{href:"https://twitter.com/akella",title:"@akella twitter",target:"_blank",rel:"noopener noreferrer"},"Yuri Artiukh"),".")}},exp_22:{id:"exp_22",index:22,title:{en:"Colors of noise",es:"Color del ruido"},tools:"use-sound, react-spring",info:{en:c.a.createElement("p",null,"Click to play."," ",c.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Colors_of_noise",title:"wikipedia",target:"_blank",rel:"noopener noreferrer"},"Wikipedia article"),"."," "),es:c.a.createElement("p",null,"Haz click o toca para reproducir."," ",c.a.createElement("a",{href:"https://es.wikipedia.org/wiki/Ruido_de_color",title:"wikipedia",target:"_blank",rel:"noopener noreferrer"},"Art\xedculo en wikipedia"),"."," ")}},exp_23:{id:"exp_23",index:23,title:{en:"Points on a sphere",es:"Puntos en una esfera"},tools:"three.js, R3F, react-spring",info:{en:c.a.createElement("p",null,"1082 nodes on a sphere,"," ",c.a.createElement("a",{href:"http://www.softimageblog.com/archives/115",title:"Softimage Blog",target:"_blank",rel:"noopener noreferrer"},"two algorithms")," ","to uniformly distribute points,"," ",c.a.createElement("a",{href:"http://neilsloane.com/icosahedral.codes/",title:"Neil Sloane",target:"_blank",rel:"noopener noreferrer"},"precomputed values")," ","with icosahedral symmetry, and one"," ",c.a.createElement("a",{href:"https://observablehq.com/@rreusser/equally-distributing-points-on-a-sphere",title:"Observable",target:"_blank",rel:"noopener noreferrer"},"random function"),". Select one from the top left menu, zoom, pan and rotate."),es:c.a.createElement("p",null,"1082 nodos en una esfera,"," ",c.a.createElement("a",{href:"http://www.softimageblog.com/archives/115",title:"Softimage Blog",target:"_blank",rel:"noopener noreferrer"},"dos algoritmos")," ","para distribuir puntos uniformemente,"," ",c.a.createElement("a",{href:"http://neilsloane.com/icosahedral.codes/",title:"Neil Sloane",target:"_blank",rel:"noopener noreferrer"},"valores precomputados")," ","con simetr\xeda icosa\xe9drica, y una"," ",c.a.createElement("a",{href:"https://observablehq.com/@rreusser/equally-distributing-points-on-a-sphere",title:"Observable",target:"_blank",rel:"noopener noreferrer"},"funci\xf3n aleatoria"),". Selecciona en el men\xfa superior izquierdo, ampl\xeda, desplaza y rota.")}},exp_24:{id:"exp_24",index:24,title:{en:"SDF #420",es:"SDF #420"},tools:"glsl, three.js, R3F",info:{en:c.a.createElement("p",null,c.a.createElement("a",{href:"https://mathworld.wolfram.com/CannabisCurve.html",title:"Math World",target:"_blank",rel:"noopener noreferrer"},"Cannabis curve")," ","signed distance field."," ",c.a.createElement("span",{style:{opacity:"0.6"}},"r = arcsin({0.5 + 0.5 cos 8\u03b8}) ({0.5 + 0.5 cos \u03b8})")," ","Includes glsl functions from"," ",c.a.createElement("a",{href:"https://patriciogonzalezvivo.github.io/PixelSpiritDeck/",title:"Pixel Spirit Deck",target:"_blank",rel:"noopener noreferrer"},"PixelSpirit Deck")," ","by"," ",c.a.createElement("a",{href:"https://twitter.com/patriciogv",title:"Twitter @patriciogv",target:"_blank",rel:"noopener noreferrer"},"Patricio Gonz\xe1lez Vivo"),"."," "),es:c.a.createElement("p",null,"Funci\xf3n de distancia con signo de la"," ",c.a.createElement("a",{href:"https://mathworld.wolfram.com/CannabisCurve.html",title:"Math World",target:"_blank",rel:"noopener noreferrer"},"curva del cannabis"),":"," ",c.a.createElement("span",{style:{opacity:"0.6"}},"r = arcsin({0.5 + 0.5 cos 8\u03b8}) ({0.5 + 0.5 cos \u03b8})")," ","Incluye funciones de"," ",c.a.createElement("a",{href:"https://twitter.com/patriciogv",title:"Twitter @patriciogv",target:"_blank",rel:"noopener noreferrer"},"Patricio Gonz\xe1lez Vivo"),"."," ")}},exp_25:{id:"exp_25",index:25,title:{en:"AENA",es:"AENA"},tools:"glsl, three.js, R3F",info:{en:c.a.createElement("p",null,"Data:"," ",c.a.createElement("a",{href:"http://www.aena.es/csee/Satellite?pagename=Estadisticas/Home",title:"Aena Stats",target:"_blank",rel:"noopener noreferrer"},"Aena"),"."),es:c.a.createElement("p",null,"Tr\xe1fico a\xe9reo dom\xe9stico anual en aeropuertos espa\xf1oles (2019). No se incluyen l\xedneas con menos de 5.000 pasajeros. Data:"," ",c.a.createElement("a",{href:"http://www.aena.es/csee/Satellite?pagename=Estadisticas/Home",title:"Aena Stats",target:"_blank",rel:"noopener noreferrer"},"Aena"),".")}}},P=function(){var e=Object(i.useContext)(O.a).language.id,t=+Object(p.g)().pathname.split("/")[2],n="exp_".concat(t),a=M[n]&&e&&M[n].title[e]?M[n].title[e]:"".concat(t," / ").concat(24),r=M[n]&&M[n].info[e],o=M[n]&&M[n].tools;return c.a.createElement("div",{className:"navMain"},c.a.createElement(A,{currentPage:t,title:a,info:r,tools:o}))},A=function(e){var t=e.currentPage,n=e.title,a=e.info,r=e.tools,o=Object(i.useState)(!1),l=Object(h.a)(o,2),s=l[0],m=l[1],p=Object(_.a)(),d=Object(h.a)(p,2),g=d[0],w=d[1],y=w.height,k=w.top,O=Object(i.useContext)(j.b).dark,C=Object(x.a)(S.a,{volume:1}),z=Object(h.a)(C,1)[0],M=Object(x.a)(D.a,{volume:1}),P=Object(h.a)(M,1)[0],A=Object(E.b)({height:s?y+2*k:0});return Object(i.useEffect)((function(){document.title="".concat(n),O?document.querySelector("meta[name=theme-color]").setAttribute("content","#000000"):document.querySelector("meta[name=theme-color]").setAttribute("content","#FFFFFF")})),c.a.createElement("div",{className:"navWrapper"},c.a.createElement("div",{className:"navButtons",style:{display:"flex",height:"40px"}},c.a.createElement("div",{className:"title",style:{display:"flex",alignItems:"center",paddingLeft:"1em",flex:"0 1 100%"}},c.a.createElement("h1",{style:{fontSize:"1.2em",lineHeight:"1.2em"}}," ",Object(f.j)(n,20))),c.a.createElement("div",{className:"infoButton",onClick:function(){m(!s),P(),v("".concat(t,"-info)"))}},r&&c.a.createElement(N,{on:s})),c.a.createElement("div",{className:"prevButton"},c.a.createElement(u.b,{onClick:function(){m(!1),z(),v(t-1)},to:"/exp/".concat(1===t?24:t-1)},c.a.createElement(B,null))),c.a.createElement("div",{className:"nextButton"},c.a.createElement(u.b,{onClick:function(){m(!1),z(),v(t+1)},to:24===t?"/exp/1":"/exp/".concat(t+1)}," ",c.a.createElement(T,null)))),c.a.createElement(E.a.div,{className:"navInfo",style:Object(b.a)({},A)},c.a.createElement("div",{ref:g,style:{borderTop:"1px solid var(--foreground-color)",padding:"1em",margin:"0 auto"}},r&&c.a.createElement("p",{className:"pm regular",style:{fontSize:"0.9em",textTransform:"uppercase",letterSpacing:"0.1em"}},r),a&&a)))},T=function(){return c.a.createElement("svg",{width:"40",height:"40",viewBox:"0 0 20 20",style:{flex:"0 0 40px",borderLeft:"1px solid var(--foreground-color)"}},c.a.createElement("path",{fill:"var(--foreground-color)",d:"M14.8 10L6.7 5.5v9l8.1-4.5z"}),c.a.createElement("title",null,"Next"))},B=function(){return c.a.createElement("svg",{width:"40",height:"40",viewBox:"0 0 20 20",style:{flex:"0 0 40px",borderLeft:"1px solid var(--foreground-color)"}},c.a.createElement("path",{d:"M5.4 10l8.1 4.5v-9L5.4 10z",fill:"var(--foreground-color)"}),c.a.createElement("title",null,"Previous"))},N=function(e){return c.a.createElement("div",{style:{cursor:"pointer"}},e&&c.a.createElement("svg",{width:"40",height:"40",viewBox:"-2 -1.5 24 24",style:{flex:"0 0 40px",borderLeft:"1px solid var(--foreground-color)"}},c.a.createElement("path",{fill:"var(--foreground-color)",d:"M13.1 15.2H6.9v-1.6H9V10H7.1V8.3h4.1v5.3h1.9v1.6zM9.9 4.1c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"}),c.a.createElement("title",null,"Info")))},I=n(31),L=n.n(I);n(66);function R(){var e=Object(i.useContext)(j.b),t=(e._,e.toggle),n=Object(x.a)(L.a,{volume:1}),a=Object(h.a)(n,1)[0];return c.a.createElement("div",{className:"switch-wrapper"},c.a.createElement("label",{className:"switch"},c.a.createElement("input",{type:"checkbox",id:"togBtn",onChange:function(){t(),a()},defaultChecked:!0}),c.a.createElement("div",{className:"slider round",style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},c.a.createElement("svg",{className:"sun-icon",focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 32 32","aria-hidden":"true",style:{willChange:"fill",fill:"var(--foreground-color)",marginLeft:"4px"}},c.a.createElement("path",{d:"M18.4 10.2l6.9-3.4-3.5 6.8 7.3 2.4-7.3 2.4 3.4 6.9-6.8-3.5-2.4 7.3-2.4-7.3-6.9 3.4 3.5-6.8L2.9 16l7.3-2.4-3.4-6.9 6.8 3.5L16 2.9z"}),c.a.createElement("title",null,"Light theme")),c.a.createElement("svg",{focusable:"false",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 37 37","aria-hidden":"true",style:{willChange:"fill",fill:"var(--foreground-color)",marginRight:"1px",marginTop:"3px"}},c.a.createElement("path",{d:"M22.9,20.2c-5.2,0-9.5-4.2-9.5-9.5c0-3.2,1.6-6.1,4.1-7.8c-0.5-0.1-1.1-0.1-1.6-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12 c5.1,0,9.4-3.2,11.2-7.6C25.8,19.8,24.4,20.2,22.9,20.2z"}),c.a.createElement("title",null,"Dark theme")))))}n(67);var H=function(){var e=Object(i.useContext)(O.a),t=e.language.id,n=Object(x.a)(L.a,{volume:1}),a=Object(h.a)(n,1)[0];return c.a.createElement("div",{onClick:function(){return a(),"en"===t&&e.setLanguage(O.d[1]),void("es"===t&&e.setLanguage(O.d[0]))},className:"language-wrapper"},c.a.createElement("div",{className:"language"},c.a.createElement("h6",null,t)))},G=function(){var e="exp"===Object(p.g)().pathname.split("/")[1];return c.a.createElement("div",null,e&&c.a.createElement(k,null),e&&c.a.createElement(P,null),e&&c.a.createElement(R,null),e&&c.a.createElement(H,null))},V=c.a.lazy((function(){return n.e(33).then(n.bind(null,287))})),F=Object(i.lazy)((function(){return n.e(28).then(n.bind(null,288))})),q=Object(i.lazy)((function(){return Promise.all([n.e(2),n.e(12),n.e(36)]).then(n.bind(null,289))})),J=Object(i.lazy)((function(){return n.e(38).then(n.bind(null,290))})),U=Object(i.lazy)((function(){return n.e(22).then(n.bind(null,336))})),Y=Object(i.lazy)((function(){return n.e(27).then(n.bind(null,330))})),W=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(32)]).then(n.bind(null,291))})),K=Object(i.lazy)((function(){return n.e(39).then(n.bind(null,331))})),Q=Object(i.lazy)((function(){return Promise.all([n.e(1),n.e(40)]).then(n.bind(null,332))})),X=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(41)]).then(n.bind(null,337))})),$=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(34)]).then(n.bind(null,304))})),Z=Object(i.lazy)((function(){return Promise.all([n.e(1),n.e(3),n.e(20)]).then(n.bind(null,338))})),ee=Object(i.lazy)((function(){return n.e(29).then(n.bind(null,339))})),te=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(30)]).then(n.bind(null,307))})),ne=Object(i.lazy)((function(){return Promise.all([n.e(2),n.e(14)]).then(n.bind(null,340))})),ae=Object(i.lazy)((function(){return n.e(21).then(n.bind(null,308))})),re=Object(i.lazy)((function(){return n.e(35).then(n.bind(null,333))})),oe=Object(i.lazy)((function(){return n.e(16).then(n.bind(null,309))})),le=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(11),n.e(25)]).then(n.bind(null,341))})),ie=Object(i.lazy)((function(){return Promise.all([n.e(1),n.e(3),n.e(17),n.e(31)]).then(n.bind(null,342))})),ce=Object(i.lazy)((function(){return Promise.all([n.e(1),n.e(3),n.e(9),n.e(15)]).then(n.bind(null,334))})),se=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(5),n.e(4),n.e(18),n.e(37)]).then(n.bind(null,324))})),me=Object(i.lazy)((function(){return Promise.all([n.e(4),n.e(13)]).then(n.bind(null,325))})),ue=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(6),n.e(26)]).then(n.bind(null,343))})),pe=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(23)]).then(n.bind(null,326))})),he=Object(i.lazy)((function(){return Promise.all([n.e(0),n.e(5),n.e(19),n.e(24)]).then(n.bind(null,328))})),de=function(){return c.a.createElement("div",null,c.a.createElement(u.a,null,c.a.createElement(i.Suspense,{fallback:c.a.createElement(g,null)},c.a.createElement(p.d,null,c.a.createElement(p.a,{exact:!0,from:"/",to:"/exp/".concat(24),component:"Exp".concat(24)}),c.a.createElement(p.b,{path:"/exp/1",component:F}),c.a.createElement(p.b,{path:"/exp/2",component:q}),c.a.createElement(p.b,{path:"/exp/3",component:J}),c.a.createElement(p.b,{path:"/exp/4",component:U}),c.a.createElement(p.b,{path:"/exp/5",component:Y}),c.a.createElement(p.b,{path:"/exp/6",component:W}),c.a.createElement(p.b,{path:"/exp/7",component:K}),c.a.createElement(p.b,{path:"/exp/8",component:Q}),c.a.createElement(p.b,{path:"/exp/9",component:X}),c.a.createElement(p.b,{path:"/exp/10",component:$}),c.a.createElement(p.b,{path:"/exp/11",component:Z}),c.a.createElement(p.b,{path:"/exp/12",component:ee}),c.a.createElement(p.b,{path:"/exp/13",component:te}),c.a.createElement(p.b,{path:"/exp/14",component:ne}),c.a.createElement(p.b,{path:"/exp/15",component:ae}),c.a.createElement(p.b,{path:"/exp/16",component:re}),c.a.createElement(p.b,{path:"/exp/17",component:oe}),c.a.createElement(p.b,{path:"/exp/18",component:le}),c.a.createElement(p.b,{path:"/exp/19",component:ie}),c.a.createElement(p.b,{path:"/exp/20",component:ce}),c.a.createElement(p.b,{path:"/exp/21",component:se}),c.a.createElement(p.b,{path:"/exp/22",component:me}),c.a.createElement(p.b,{path:"/exp/23",component:ue}),c.a.createElement(p.b,{path:"/exp/24",component:pe}),c.a.createElement(p.b,{path:"/exp/25",component:he}),c.a.createElement(p.b,{component:V}))),c.a.createElement(G,null)))},fe=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return n}(Object(l.a)(HTMLElement)),ge=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return n}(Object(l.a)(HTMLElement));window.customElements.define("r-grid",fe,{extends:"div"}),window.customElements.define("r-cell",ge,{extends:"div"}),m.a.render(c.a.createElement(j.a,{dark:!0},c.a.createElement(O.b,null,c.a.createElement(de,null))),document.getElementById("root"))}},[[54,8,10]]]);
//# sourceMappingURL=main.632ab58a.chunk.js.map