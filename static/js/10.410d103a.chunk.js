(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[10],{142:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(0),i=n.n(o),s=n(71),c=n(78),u=n(34),a=n(19);t.default=function(){var e=Object(s.a)({polyfill:c.a}),t=Object(r.a)(e,2),n=t[0],l=t[1],f=l.width,h=l.height,d=Object(o.useState)(2),v=Object(r.a)(d,2),p=v[0],b=v[1];Object(u.a)((function(){b((function(e){return e>4?3:e+1}))}),900);var g=Object(o.useRef)(),w=f>=h?f:h,m=w/p,y=Object(o.useContext)(a.b).dark,O=["RGBA(212, 209, 212, 1.00)",y?"#4D63FF":"#E44F3C",y?"white":"black"],x=y?"RGBA(22, 24, 25, 1.00)":"white",E=y?"black":"white",z=Object(o.useMemo)((function(){return function(){var e=document.createElement("canvas"),t=e.getContext("2d");return e.width=5,e.height=5,t.strokeStyle="black",t.moveTo(0,0),t.lineTo(5,5),t.moveTo(0,5),t.lineTo(5,0),t.stroke(),e}()}),[]),T=function(){for(var e=[],t=0;t<w;t+=m)for(var n=0;n<w;n+=m)e.push({x:t,y:n,step:m});return e}();return Object(o.useEffect)((function(){var e=g.current,t=e.getContext("2d"),n=window.devicePixelRatio||1;e.width=f*n,e.height=h*n,e.style.width="".concat(f,"px"),e.style.height="".concat(h,"px"),t.scale(n,n);var r=function(e,n,r){t.fillStyle=O[Math.floor(Math.random()*O.length)],t.fillRect(e,n,r+5,r+5),Math.random()>=.5?(t.moveTo(e,n),t.lineTo(e+r,n+r)):(t.moveTo(e+r,n),t.lineTo(e,n+r)),t.stroke()};!function(){t.clearRect(0,0,f,h),t.lineCap="square",t.lineWidth=m/3,t.beginPath(),t.strokeStyle=x,T.map((function(e){r(e.x,e.y,e.step)}));var n=t.createPattern(z,"repeat");t.globalCompositeOperation="overlay",t.fillStyle=n,t.fillRect(0,0,e.width,e.height)}()})),i.a.createElement("div",{ref:n,style:{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:E}},i.a.createElement("canvas",{width:f,height:h,ref:g}))}},71:function(e,t,n){"use strict";(function(e){var r=n(12),o=n(2),i=n(4),s=n(0),c=n(73);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{debounce:0,scroll:!1},t=e.debounce,n=e.scroll,r=e.polyfill,u=r||("undefined"===typeof window?function e(){Object(i.a)(this,e)}:window.ResizeObserver);if(!u)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");var h=Object(s.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),v=Object(o.a)(h,2),p=v[0],b=v[1],g=Object(s.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:p}),w=t?"number"===typeof t?t:t.scroll:null,m=t?"number"===typeof t?t:t.resize:null,y=Object(s.useMemo)((function(){var e=function(){if(g.current.element){var e=g.current.element.getBoundingClientRect(),t={left:e.left,top:e.top,width:e.width,height:e.height,bottom:e.bottom,right:e.right,x:e.x,y:e.y};Object.freeze(t),d(g.current.lastBounds,t)||b(g.current.lastBounds=t)}};return[m?Object(c.debounce)(e,m):e,w?Object(c.debounce)(e,w):e]}),[b,w,m]),O=Object(o.a)(y,2),x=O[0],E=O[1];function z(){g.current.scrollContainers&&(g.current.scrollContainers.forEach((function(e){e.removeEventListener("scroll",E,!0)})),g.current.scrollContainers=null),g.current.resizeObserver&&(g.current.resizeObserver.disconnect(),g.current.resizeObserver=null)}function T(){g.current.element&&(g.current.resizeObserver=new u(E),g.current.resizeObserver.observe(g.current.element),n&&g.current.scrollContainers&&g.current.scrollContainers.forEach((function(e){e.addEventListener("scroll",E,{capture:!0,passive:!0})})))}var S=function(e){e&&e!==g.current.element&&(z(),g.current.element=e,g.current.scrollContainers=f(e),T())};return l(E,Boolean(n)),a(x),Object(s.useEffect)((function(){z(),T()}),[n,E,x]),Object(s.useEffect)((function(){return z}),[]),[S,p]}function a(e){Object(s.useEffect)((function(){var t=e;return window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[e])}function l(e,t){Object(s.useEffect)((function(){if(t){var n=e;return window.addEventListener("scroll",n,{capture:!0,passive:!0}),function(){return window.removeEventListener("scroll",n,!0)}}}),[e,t])}function f(e){var t=[];if(!e||e===document.body)return t;var n=window.getComputedStyle(e);return[n.overflow,n.overflowX,n.overflowY].some((function(e){return"auto"===e||"scroll"===e}))&&t.push(e),[].concat(t,Object(r.a)(f(e.parentElement)))}var h=["x","y","top","bottom","left","right","width","height"],d=function(e,t){return h.every((function(n){return e[n]===t[n]}))};Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(e,"exports").writable&&(e.exports=u),t.a=u}).call(this,n(72)(e))},72:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},73:function(e,t){function n(e,t,n){var r,o,i,s,c;function u(){var a=Date.now()-s;a<t&&a>=0?r=setTimeout(u,t-a):(r=null,n||(c=e.apply(i,o),i=o=null))}null==t&&(t=100);var a=function(){i=this,o=arguments,s=Date.now();var a=n&&!r;return r||(r=setTimeout(u,t)),a&&(c=e.apply(i,o),i=o=null),c};return a.clear=function(){r&&(clearTimeout(r),r=null)},a.flush=function(){r&&(c=e.apply(i,o),i=o=null,clearTimeout(r),r=null)},a}n.debounce=n,e.exports=n},78:function(e,t,n){"use strict";var r,o=[],i="ResizeObserver loop completed with undelivered notifications.";!function(e){e.BORDER_BOX="border-box",e.CONTENT_BOX="content-box",e.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"}(r||(r={}));var s,c=function(){function e(e,t,n,r){return this.x=e,this.y=t,this.width=n,this.height=r,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Object.freeze(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),u=function(e){return e instanceof SVGElement&&"getBBox"in e},a=function(e){if(u(e)){var t=e.getBBox(),n=t.width,r=t.height;return!n&&!r}var o=e,i=o.offsetWidth,s=o.offsetHeight;return!(i||s||e.getClientRects().length)},l=function(e){var t,n,r=null===(n=null===(t=e)||void 0===t?void 0:t.ownerDocument)||void 0===n?void 0:n.defaultView;return!!(r&&e instanceof r.Element)},f="undefined"!==typeof window?window:{},h=new Map,d=/auto|scroll/,v=/^tb|vertical/,p=/msie|trident/i.test(f.navigator&&f.navigator.userAgent),b=function(e){return parseFloat(e||"0")},g=function(e,t,n){return void 0===e&&(e=0),void 0===t&&(t=0),void 0===n&&(n=!1),Object.freeze({inlineSize:(n?t:e)||0,blockSize:(n?e:t)||0})},w=Object.freeze({devicePixelContentBoxSize:g(),borderBoxSize:g(),contentBoxSize:g(),contentRect:new c(0,0,0,0)}),m=function(e){if(h.has(e))return h.get(e);if(a(e))return h.set(e,w),w;var t=getComputedStyle(e),n=u(e)&&e.ownerSVGElement&&e.getBBox(),r=!p&&"border-box"===t.boxSizing,o=v.test(t.writingMode||""),i=!n&&d.test(t.overflowY||""),s=!n&&d.test(t.overflowX||""),l=n?0:b(t.paddingTop),f=n?0:b(t.paddingRight),m=n?0:b(t.paddingBottom),y=n?0:b(t.paddingLeft),O=n?0:b(t.borderTopWidth),x=n?0:b(t.borderRightWidth),E=n?0:b(t.borderBottomWidth),z=y+f,T=l+m,S=(n?0:b(t.borderLeftWidth))+x,B=O+E,R=s?e.offsetHeight-B-e.clientHeight:0,C=i?e.offsetWidth-S-e.clientWidth:0,j=r?z+S:0,k=r?T+B:0,P=n?n.width:b(t.width)-j-C,D=n?n.height:b(t.height)-k-R,M=P+z+C+S,L=D+T+R+B,N=Object.freeze({devicePixelContentBoxSize:g(Math.round(P*devicePixelRatio),Math.round(D*devicePixelRatio),o),borderBoxSize:g(M,L,o),contentBoxSize:g(P,D,o),contentRect:new c(y,l,P,D)});return h.set(e,N),N},y=function(e,t){var n=m(e),o=n.borderBoxSize,i=n.contentBoxSize,s=n.devicePixelContentBoxSize;switch(t){case r.DEVICE_PIXEL_CONTENT_BOX:return s;case r.BORDER_BOX:return o;default:return i}},O=function(e){var t=m(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=[t.borderBoxSize],this.contentBoxSize=[t.contentBoxSize],this.devicePixelContentBoxSize=[t.devicePixelContentBoxSize]},x=function(e){if(a(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},E=function(){var e=1/0,t=[];o.forEach((function(n){if(0!==n.activeTargets.length){var r=[];n.activeTargets.forEach((function(t){var n=new O(t.target),o=x(t.target);r.push(n),t.lastReportedSize=y(t.target,t.observedBox),o<e&&(e=o)})),t.push((function(){n.callback.call(n.observer,r,n.observer)})),n.activeTargets.splice(0,n.activeTargets.length)}}));for(var n=0,r=t;n<r.length;n++){(0,r[n])()}return e},z=function(e){h.clear(),o.forEach((function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach((function(n){n.isActive()&&(x(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))}))}))},T=function(){var e=0;for(z(e);o.some((function(e){return e.activeTargets.length>0}));)e=E(),z(e);return o.some((function(e){return e.skippedTargets.length>0}))&&function(){var e;"function"===typeof ErrorEvent?e=new ErrorEvent("error",{message:i}):((e=document.createEvent("Event")).initEvent("error",!1,!1),e.message=i),window.dispatchEvent(e)}(),e>0},S=[],B=function(e){if(!s){var t=document.createTextNode("");new MutationObserver((function(){return S.splice(0).forEach((function(e){return e()}))})).observe(t,{characterData:!0}),s=function(){t.textContent=""}}S.push(e),s()},R=0,C={attributes:!0,characterData:!0,childList:!0,subtree:!0},j=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],k=!1,P=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t,n=this;k||(k=!0,t=function(){var t=!1;try{t=T()}finally{if(k=!1,!R)return;t?n.run(60):e?n.run(e-1):n.start()}},B((function(){requestAnimationFrame(t)})))},e.prototype.schedule=function(){this.stop(),this.run(12)},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,C)};document.body?t():f.addEventListener("DOMContentLoaded",t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),j.forEach((function(t){return f.addEventListener(t,e.listener,!0)})))},e.prototype.stop=function(){var e=this;this.stopped||(this.observer&&this.observer.disconnect(),j.forEach((function(t){return f.removeEventListener(t,e.listener,!0)})),this.stopped=!0)},e}()),D=function(e){!R&&e>0&&P.start(),!(R+=e)&&P.stop()},M=function(){function e(e,t){this.target=e,this.observedBox=t||r.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e,t=y(this.target,this.observedBox);return e=this.target,u(e)||function(e){switch(e.tagName){case"INPUT":if("image"!==e.type)break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1}(e)||"inline"!==getComputedStyle(e).display||(this.lastReportedSize=t),this.lastReportedSize.inlineSize!==t.inlineSize||this.lastReportedSize.blockSize!==t.blockSize},e}(),L=function(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t},N=new Map,F=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},A=function(){function e(){}return e.connect=function(e,t){var n=new L(e,t);o.push(n),N.set(e,n)},e.observe=function(e,t,n){if(N.has(e)){var r=N.get(e);F(r.observationTargets,t)<0&&(r.observationTargets.push(new M(t,n&&n.box)),D(1),P.schedule())}},e.unobserve=function(e,t){if(N.has(e)){var n=N.get(e),r=F(n.observationTargets,t);r>=0&&(n.observationTargets.splice(r,1),D(-1))}},e.disconnect=function(e){if(N.has(e)){var t=N.get(e);o.splice(o.indexOf(t),1),N.delete(e),D(-t.observationTargets.length)}},e}(),I=function(){function e(e){if(0===arguments.length)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if("function"!==typeof e)throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");A.connect(this,e)}return e.prototype.observe=function(e,t){if(0===arguments.length)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!l(e))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");A.observe(this,e,t)},e.prototype.unobserve=function(e){if(0===arguments.length)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!l(e))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");A.unobserve(this,e)},e.prototype.disconnect=function(){A.disconnect(this)},e.toString=function(){return"function ResizeObserver () { [polyfill code] }"},e}();n.d(t,"a",(function(){return I}))}}]);
//# sourceMappingURL=10.410d103a.chunk.js.map