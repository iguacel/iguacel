(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[13],{126:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),c=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,i=Object(r.useRef)();Object(r.useEffect)((function(){i.current=t}),[t]),Object(r.useEffect)((function(){if(n&&n.addEventListener){var t=function(e){return i.current(e)};return n.addEventListener(e,t),function(){n.removeEventListener(e,t)}}}),[e,n])},a=n(85),o=n(19);t.default=function(){var e=Object(a.a)(),t=Object(r.useRef)(null),n=Object(r.useRef)(),u=Object(r.useContext)(o.b).dark;Object(r.useEffect)((function(){return n.current=requestAnimationFrame(k),function(){return cancelAnimationFrame(n.current)}}));var f=4,s=-4,l=e/2,d=e-200,v=e/2,h=!1,w=!1,b=e/2-170+5,m=0,y=3,j=Object(r.useCallback)((function(e){var t=e.keyCode;39===t?h=!0:37===t&&(w=!0)}),[]),O=Object(r.useCallback)((function(e){var t=e.keyCode;39===t?h=!1:37===t&&(w=!1)}),[]);c("keydown",j),c("keyup",O),c("mousemove",(function(n){var r=n.clientX-t.current.offsetLeft;r>0&&r<e&&(v=r-37.5)}));for(var g={main:u?"RGBA(228, 230, 234, 1.00)":"RGBA(62, 62, 62, 1.00)"},x=[],E=0;E<4;E++){x[E]=[];for(var p=0;p<4;p++)x[E][p]={x:0,y:0,status:1}}var k=function r(){var i=t.current.getContext("2d"),c=window.devicePixelRatio||1;t.current.width=e*c,t.current.height=e*c,t.current.style.width="".concat(e,"px"),t.current.style.height="".concat(e,"px"),i.scale(c,c),i.clearRect(0,0,e,e),function(e){e.beginPath(),e.fillStyle=g.main,e.arc(l,d,10,0,2*Math.PI),e.fill(),e.closePath()}(i),function(t){t.beginPath(),t.rect(v,e-100,75,20),t.fillStyle=g.main,t.fill(),t.closePath()}(i),function(e){for(var t=0;t<4;t++)for(var n=0;n<4;n++)if(1===x[t][n].status){var r=85*t+b,i=30*n+100;x[t][n].x=r,x[t][n].y=i,e.beginPath(),e.rect(r,i,75,20),e.fillStyle=g.main,e.fill(),e.closePath()}}(i),function(){for(E=0;E<4;E++)for(p=0;p<4;p++){var e=x[E][p];1===e.status&&l>e.x&&l<e.x+75&&d>e.y&&d<e.y+20&&(s=-s,e.status=0,16===++m&&(console.log("YOU WIN"),document.location.reload()))}}(),function(e){e.font="bold 30px Inter",e.fillStyle=g.main,e.fillText(m,35,40)}(i),function(t){t.fillText(y,e-65,40)}(i),((l+=f)+f>e-10||l+f<10)&&(f=-f),(d+=s)+s<10?s=-s:d+s+100>e-10&&(l>v&&l<v+75?s=-s:--y?(l=e/2,d=e/2,f=3,s=-3,v=(e-75)/2):(console.log("GAME OVER"),document.location.reload())),h&&v<e-75?v+=7:w&&v>0&&(v-=7),n.current=requestAnimationFrame(r)};return i.a.createElement("div",{style:{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}},i.a.createElement("canvas",{style:{size:"100%",border:"".concat(20,"px solid ").concat(g.main)},ref:t,width:e,height:e}))}},85:function(e,t,n){"use strict";var r=n(2),i=n(0);t.a=function(){var e="object"===typeof window;function t(){return e?window.innerWidth>window.innerHeight?window.innerHeight:window.innerWidth:void 0}var n=Object(i.useState)(t),c=Object(r.a)(n,2),a=c[0],o=c[1];return Object(i.useEffect)((function(){if(!e)return!1;function n(){o(t())}return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}}),[]),a}}}]);
//# sourceMappingURL=13.ffcdbc09.chunk.js.map