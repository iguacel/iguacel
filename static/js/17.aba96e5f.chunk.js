(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[17],{122:function(t,e,i){"use strict";i.r(e);var a=i(0),n=i.n(a);e.default=function(){var t=Object(a.useRef)();return Object(a.useEffect)((function(){var e,i=t.current,a=i.getContext("2d"),n=function(t){var e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e}(a),r=getComputedStyle(i).getPropertyValue("width").slice(0,-2)*n,l=getComputedStyle(i).getPropertyValue("height").slice(0,-2)*n;i.style.width="".concat(r,"px"),i.style.height="".concat(l,"px");var o=0;return function t(){a.clearRect(0,0,i.width,i.height),a.beginPath(),a.arc(i.width/2,i.height/2,i.width/2*Math.abs(Math.cos(o)),0,2*Math.PI),a.fillStyle="red",a.fill(),a.font="30px Inter",a.fillStyle="white",a.fillText("Canvas txt",i.width/2,i.height/2),a.fillText("pixelRatio",i.width/2,i.height/2+40),a.fillText("pixelRatio",i.width/2,i.height/2+80),o+=.01,e=requestAnimationFrame(t)}(),function(){cancelAnimationFrame(e)}})),n.a.createElement("div",{style:{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}},n.a.createElement("canvas",{ref:t,style:{border:"1px solid gold",width:"100%",height:"100vh"},foo:"bar"}))}}}]);
//# sourceMappingURL=17.aba96e5f.chunk.js.map