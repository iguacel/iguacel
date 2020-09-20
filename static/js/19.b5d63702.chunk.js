/*! For license information please see 19.b5d63702.chunk.js.LICENSE.txt */
(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[19],{122:function(t,e,n){"use strict";function r(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}n.d(e,"a",(function(){return r}))},124:function(t,e,n){"use strict";function r(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}n.d(e,"a",(function(){return r}))},268:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(3),i=n(141),o=n(142),a=n(0),u=n.n(a),s=n(75),c=n(143),l=Object(a.forwardRef)((function(t,e){var n=t.anchorX,l=void 0===n?"center":n,h=t.anchorY,p=void 0===h?"middle":h,f=t.children,v=t.onSync,d=Object(o.a)(t,["anchorX","anchorY","children","onSync"]),m=Object(s.i)().invalidate,b=Object(a.useState)((function(){return new c.Text})),E=Object(r.a)(b,1)[0],y=Object(a.useState)(),g=Object(r.a)(y,2),T=g[0],w=g[1],P=Object(a.useMemo)((function(){var t=[],e="";return a.Children.forEach(f,(function(n,r){"string"===typeof n?e+=n:n&&"object"===typeof n&&"material"===n.props.attach?(t.push(Object(a.createElement)(n.type,{ref:w,attach:"material",key:r})),T&&t.push(u.a.createElement("primitive",Object(i.a)({dispose:null,object:E.material},n.props,{key:"baseMtl:"+r,attach:null})))):t.push(n)})),[t,e]}),[f,T,E.material]),O=Object(r.a)(P,2),S=O[0],M=O[1];return Object(a.useLayoutEffect)((function(){E.sync((function(){m(),v&&v(E)}))})),u.a.createElement("primitive",Object(i.a)({dispose:null,object:E,ref:e,text:M,anchorX:l,anchorY:p},d),S)}))},269:function(t,e,n){t.exports=function(){"use strict";var t=["bubbles","cancelable","view","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],e=[!1,!1,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0];function n(n,r){r=r||Object.create(null);var i=document.createEvent("Event");i.initEvent(n,r.bubbles||!1,r.cancelable||!1);for(var o,a=2;a<t.length;a++)i[o=t[a]]=r[o]||e[a];i.buttons=r.buttons||0;var u=0;return u=void 0!==r.pressure&&i.buttons?r.pressure:i.buttons?.5:0,i.x=i.clientX,i.y=i.clientY,i.pointerId=r.pointerId||0,i.width=r.width||1,i.height=r.height||1,i.pressure=u,i.tiltX=r.tiltX||0,i.tiltY=r.tiltY||0,i.twist=r.twist||0,i.tangentialPressure=r.tangentialPressure||0,i.pointerType=r.pointerType||"",i.hwTimestamp=r.hwTimestamp||0,i.isPrimary=r.isPrimary||!1,i.detail=0,i}var r=window.Map&&window.Map.prototype.forEach?Map:i;function i(){this.array=[],this.size=0}i.prototype={set:function(t,e){if(void 0===e)return this.delete(t);this.has(t)||this.size++,this.array[t]=e},has:function(t){return void 0!==this.array[t]},delete:function(t){this.has(t)&&(delete this.array[t],this.size--)},get:function(t){return this.array[t]},clear:function(){this.array.length=0,this.size=0},forEach:function(t,e){return this.array.forEach((function(n,r){t.call(e,n,r,this)}),this)}};var o=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp"],a=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],u={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},s="undefined"!==typeof SVGElementInstance,c={pointermap:new r,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(t,e){var n=e,r=n.events;r&&(r.forEach((function(t){n[t]&&(this.eventMap[t]=n[t].bind(n))}),this),this.eventSources[t]=n,this.eventSourceList.push(n))},register:function(t){for(var e,n=this.eventSourceList.length,r=0;r<n&&(e=this.eventSourceList[r]);r++)e.register.call(e,t)},unregister:function(t){for(var e,n=this.eventSourceList.length,r=0;r<n&&(e=this.eventSourceList[r]);r++)e.unregister.call(e,t)},contains:function(t,e){try{return t.contains(e)}catch(n){return!1}},down:function(t){t.bubbles=!0,this.fireEvent("pointerdown",t)},move:function(t){t.bubbles=!0,this.fireEvent("pointermove",t)},up:function(t){t.bubbles=!0,this.fireEvent("pointerup",t)},enter:function(t){t.bubbles=!1,this.fireEvent("pointerenter",t)},leave:function(t){t.bubbles=!1,this.fireEvent("pointerleave",t)},over:function(t){t.bubbles=!0,this.fireEvent("pointerover",t)},out:function(t){t.bubbles=!0,this.fireEvent("pointerout",t)},cancel:function(t){t.bubbles=!0,this.fireEvent("pointercancel",t)},leaveOut:function(t){this.out(t),this.propagate(t,this.leave,!1)},enterOver:function(t){this.over(t),this.propagate(t,this.enter,!0)},eventHandler:function(t){if(!t._handledByPE){var e=t.type,n=this.eventMap&&this.eventMap[e];n&&n(t),t._handledByPE=!0}},listen:function(t,e){e.forEach((function(e){this.addEvent(t,e)}),this)},unlisten:function(t,e){e.forEach((function(e){this.removeEvent(t,e)}),this)},addEvent:function(t,e){t.addEventListener(e,this.boundHandler)},removeEvent:function(t,e){t.removeEventListener(e,this.boundHandler)},makeEvent:function(t,e){this.captureInfo[e.pointerId]&&(e.relatedTarget=null);var r=new n(t,e);return e.preventDefault&&(r.preventDefault=e.preventDefault),r._target=r._target||e.target,r},fireEvent:function(t,e){var n=this.makeEvent(t,e);return this.dispatchEvent(n)},cloneEvent:function(t){for(var e,n=Object.create(null),r=0;r<o.length;r++)n[e=o[r]]=t[e]||a[r],!s||"target"!==e&&"relatedTarget"!==e||n[e]instanceof SVGElementInstance&&(n[e]=n[e].correspondingUseElement);return t.preventDefault&&(n.preventDefault=function(){t.preventDefault()}),n},getTarget:function(t){var e=this.captureInfo[t.pointerId];return e?t._target!==e&&t.type in u?void 0:e:t._target},propagate:function(t,e,n){for(var r=t.target,i=[];null!=r&&r!==document&&!r.contains(t.relatedTarget);)if(i.push(r),!(r=r.parentNode))return;n&&i.reverse(),i.forEach((function(n){t.target=n,e.call(this,t)}),this)},setCapture:function(t,e,r){this.captureInfo[t]&&this.releaseCapture(t,r),this.captureInfo[t]=e,this.implicitRelease=this.releaseCapture.bind(this,t,r),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease);var i=new n("gotpointercapture",{bubbles:!0});i.pointerId=t,i._target=e,r||this.asyncDispatchEvent(i)},releaseCapture:function(t,e){var r=this.captureInfo[t];if(r){this.captureInfo[t]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease);var i=new n("lostpointercapture",{bubbles:!0});i.pointerId=t,i._target=r,e||this.asyncDispatchEvent(i)}},dispatchEvent:function(t){var e=this.getTarget(t);if(e)return e.dispatchEvent(t)},asyncDispatchEvent:function(t){requestAnimationFrame(this.dispatchEvent.bind(this,t))}};c.boundHandler=c.eventHandler.bind(c);var l={shadow:function(t){if(t)return t.shadowRoot||t.webkitShadowRoot},canTarget:function(t){return t&&Boolean(t.elementFromPoint)},targetingShadow:function(t){var e=this.shadow(t);if(this.canTarget(e))return e},olderShadow:function(t){var e=t.olderShadowRoot;if(!e){var n=t.querySelector("shadow");n&&(e=n.olderShadowRoot)}return e},allShadows:function(t){for(var e=[],n=this.shadow(t);n;)e.push(n),n=this.olderShadow(n);return e},searchRoot:function(t,e,n){if(t){var r,i,o=t.elementFromPoint(e,n);for(i=this.targetingShadow(o);i;){if(r=i.elementFromPoint(e,n)){var a=this.targetingShadow(r);return this.searchRoot(a,e,n)||r}i=this.olderShadow(i)}return o}},owner:function(t){for(var e=t;e.parentNode;)e=e.parentNode;return e.nodeType!==Node.DOCUMENT_NODE&&e.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(e=document),e},findTarget:function(t){var e=t.clientX,n=t.clientY,r=this.owner(t.target);return r.elementFromPoint(e,n)||(r=document),this.searchRoot(r,e,n)}},h=Array.prototype.forEach.call.bind(Array.prototype.forEach),p=Array.prototype.map.call.bind(Array.prototype.map),f=Array.prototype.slice.call.bind(Array.prototype.slice),v=Array.prototype.filter.call.bind(Array.prototype.filter),d=window.MutationObserver||window.WebKitMutationObserver,m={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};function b(t,e,n,r){this.addCallback=t.bind(r),this.removeCallback=e.bind(r),this.changedCallback=n.bind(r),d&&(this.observer=new d(this.mutationWatcher.bind(this)))}function E(t){return"{ -ms-touch-action: "+t+"; touch-action: "+t+"; }"}b.prototype={watchSubtree:function(t){this.observer&&l.canTarget(t)&&this.observer.observe(t,m)},enableOnSubtree:function(t){this.watchSubtree(t),t===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(t)},installNewSubtree:function(t){h(this.findElements(t),this.addElement,this)},findElements:function(t){return t.querySelectorAll?t.querySelectorAll("[touch-action]"):[]},removeElement:function(t){this.removeCallback(t)},addElement:function(t){this.addCallback(t)},elementChanged:function(t,e){this.changedCallback(t,e)},concatLists:function(t,e){return t.concat(f(e))},installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(t){return t.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(t){var e=p(t,this.findElements,this);return e.push(v(t,this.isElement)),e.reduce(this.concatLists,[])},mutationWatcher:function(t){t.forEach(this.mutationHandler,this)},mutationHandler:function(t){"childList"===t.type?(this.flattenMutationTree(t.addedNodes).forEach(this.addElement,this),this.flattenMutationTree(t.removedNodes).forEach(this.removeElement,this)):"attributes"===t.type&&this.elementChanged(t.target,t.oldValue)}};var y=[{selector:'[touch-action="none"]',value:"none"},{selector:'[touch-action="auto"]',value:"auto"},{selector:'[touch-action~="pan-x"]',value:"pan-x"},{selector:'[touch-action~="pan-y"]',value:"pan-y"},{selector:'[touch-action~="pan-up"]',value:"pan-up"},{selector:'[touch-action~="pan-down"]',value:"pan-down"},{selector:'[touch-action~="pan-left"]',value:"pan-left"},{selector:'[touch-action~="pan-right"]',value:"pan-right"}],g="",T=window.PointerEvent||window.MSPointerEvent,w=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,P=c.pointermap,O=[1,4,2,8,16],S=!1;try{S=1===new MouseEvent("test",{buttons:1}).buttons}catch(z){}var M,I={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","webkitmouseforcechanged","mousemove","mouseup","mouseover","mouseout"],register:function(t){c.listen(t,this.events)},unregister:function(t){c.unlisten(t,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(t){for(var e,n=this.lastTouches,r=t.clientX,i=t.clientY,o=0,a=n.length;o<a&&(e=n[o]);o++){var u=Math.abs(r-e.x),s=Math.abs(i-e.y);if(u<=25&&s<=25)return!0}},prepareEvent:function(t){var e=c.cloneEvent(t),n=e.preventDefault;return e.preventDefault=function(){t.preventDefault(),n()},e.pointerId=this.POINTER_ID,e.isPrimary=!0,e.pointerType=this.POINTER_TYPE,"webkitForce"in t&&(e.pressure=t.webkitForce-MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN),e},prepareButtonsForMove:function(t,e){var n=P.get(this.POINTER_ID);0!==e.which&&n?t.buttons=n.buttons:t.buttons=0,e.buttons=t.buttons},mousedown:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=P.get(this.POINTER_ID),n=this.prepareEvent(t);S||(n.buttons=O[n.button],e&&(n.buttons|=e.buttons),t.buttons=n.buttons),P.set(this.POINTER_ID,t),e&&0!==e.buttons?c.move(n):c.down(n)}},webkitmouseforcechanged:function(t){this.mousemove(t)},mousemove:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);S||this.prepareButtonsForMove(e,t),e.button=-1,P.set(this.POINTER_ID,t),c.move(e)}},mouseup:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=P.get(this.POINTER_ID),n=this.prepareEvent(t);if(!S){var r=O[n.button];n.buttons=e?e.buttons&~r:0,t.buttons=n.buttons}P.set(this.POINTER_ID,t),n.buttons&=~O[n.button],0===n.buttons?c.up(n):c.move(n)}},mouseover:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);S||this.prepareButtonsForMove(e,t),e.button=-1,P.set(this.POINTER_ID,t),c.enterOver(e)}},mouseout:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);S||this.prepareButtonsForMove(e,t),e.button=-1,c.leaveOut(e)}},cancel:function(t){var e=this.prepareEvent(t);c.cancel(e),this.deactivateMouse()},deactivateMouse:function(){P.delete(this.POINTER_ID)}},N=c.captureInfo,_=l.findTarget.bind(l),R=l.allShadows.bind(l),D=c.pointermap,Y={events:["touchstart","touchmove","touchforcechange","touchend","touchcancel"],register:function(t){M.enableOnSubtree(t)},unregister:function(){},elementAdded:function(t){var e=t.getAttribute("touch-action"),n=this.touchActionToScrollType(e);"number"===typeof n&&(t._scrollType=n,c.listen(t,this.events),R(t).forEach((function(t){t._scrollType=n,c.listen(t,this.events)}),this))},elementRemoved:function(t){if(D.size>0){var e=this.events;t.addEventListener("touchend",(function(){t._scrollType=void 0,c.unlisten(t,e)}))}else t._scrollType=void 0,c.unlisten(t,this.events);R(t).forEach((function(t){t._scrollType=void 0,c.unlisten(t,this.events)}),this)},elementChanged:function(t,e){var n=t.getAttribute("touch-action"),r=this.touchActionToScrollType(n),i=this.touchActionToScrollType(e);"number"===typeof r&&"number"===typeof i?(t._scrollType=r,R(t).forEach((function(t){t._scrollType=r}),this)):"number"===typeof i?this.elementRemoved(t):"number"===typeof r&&this.elementAdded(t)},scrollTypes:{UP:function(t){return t.includes("pan-y")||t.includes("pan-up")?1:0},DOWN:function(t){return t.includes("pan-y")||t.includes("pan-down")?2:0},LEFT:function(t){return t.includes("pan-x")||t.includes("pan-left")?4:0},RIGHT:function(t){return t.includes("pan-x")||t.includes("pan-right")?8:0}},touchActionToScrollType:function(t){if(t){if("auto"===t)return 15;if("none"===t)return 0;var e=t.split(" "),n=this.scrollTypes;return n.UP(e)|n.DOWN(e)|n.LEFT(e)|n.RIGHT(e)}},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(t){return this.firstTouch===t.identifier},setPrimaryTouch:function(t){(0===D.size||1===D.size&&D.has(1))&&(this.firstTouch=t.identifier,this.firstXY={X:t.clientX,Y:t.clientY},this.scrolling=!1)},removePrimaryPointer:function(t){t.isPrimary&&(this.firstTouch=null,this.firstXY=null)},typeToButtons:function(t){var e=0;return"touchstart"!==t&&"touchmove"!==t&&"touchforcechange"!==t||(e=1),e},touchToPointer:function(t){var e=this.currentTouchEvent,n=c.cloneEvent(t),r=n.pointerId=t.identifier+2;if(n.target=N[r]||_(n),n.bubbles=!0,n.cancelable=!0,n.button=0,n.buttons=this.typeToButtons(e.type),n.width=2*(t.radiusX||t.webkitRadiusX||0),n.height=2*(t.radiusY||t.webkitRadiusY||0),n.pressure=void 0!==t.force?t.force:void 0!==t.webkitForce?t.webkitForce:void 0,n.isPrimary=this.isPrimaryTouch(t),t.altitudeAngle){var i=Math.tan(t.altitudeAngle),o=180/Math.PI;n.tiltX=Math.atan(Math.cos(t.azimuthAngle)/i)*o,n.tiltY=Math.atan(Math.sin(t.azimuthAngle)/i)*o}else n.tiltX=0,n.tiltY=0;"stylus"===t.touchType?n.pointerType="pen":n.pointerType=this.POINTER_TYPE,n.altKey=e.altKey,n.ctrlKey=e.ctrlKey,n.metaKey=e.metaKey,n.shiftKey=e.shiftKey;var a=this;return n.preventDefault=function(){a.scrolling=!1,a.firstXY=null,e.preventDefault()},n},processTouches:function(t,e){var n=t.changedTouches;this.currentTouchEvent=t;for(var r,i=0;i<n.length;i++)r=n[i],e.call(this,this.touchToPointer(r))},shouldScroll:function(t){if(this.firstXY){var e,n=t.currentTarget._scrollType;if(0===n)e=!1;else if(15===n)e=!0;else{var r=t.changedTouches[0],i=r.clientY-this.firstXY.Y,o=Math.abs(i),a=r.clientX-this.firstXY.X,u=Math.abs(a),s=1&n,c=2&n,l=4&n,h=8&n;l&&h?e=u>o:l?e=u>o&&a>0:h&&(e=u>o&&a<0),e||(s&&c?e=u<o:s?e=u<o&&i>0:c&&(e=u<o&&i<0))}return this.firstXY=null,e}},findTouch:function(t,e){for(var n,r=0,i=t.length;r<i&&(n=t[r]);r++)if(n.identifier===e)return!0},vacuumTouches:function(t){var e=t.touches;if(D.size>=e.length){var n=[];D.forEach((function(t,r){if(1!==r&&!this.findTouch(e,r-2)){var i=t.out;n.push(i)}}),this),n.forEach(this.cancelOut,this)}},touchstart:function(t){this.vacuumTouches(t),this.setPrimaryTouch(t.changedTouches[0]),this.dedupSynthMouse(t),this.scrolling||this.processTouches(t,this.overDown)},overDown:function(t){D.set(t.pointerId,{target:t.target,out:t,outTarget:t.target}),c.enterOver(t),c.down(t)},touchforcechange:function(t){this.touchmove(t)},touchmove:function(t){this.scrolling||(this.shouldScroll(t)?(this.scrolling=!0,this.touchcancel(t)):(t.preventDefault(),this.processTouches(t,this.moveOverOut)))},moveOverOut:function(t){var e=t,n=D.get(e.pointerId);if(n){var r=n.out,i=n.outTarget;c.move(e),r&&i!==e.target&&(r.relatedTarget=e.target,e.relatedTarget=i,r.target=i,e.target?(c.leaveOut(r),c.enterOver(e)):(e.target=i,e.relatedTarget=null,this.cancelOut(e))),n.out=e,n.outTarget=e.target}},touchend:function(t){this.dedupSynthMouse(t),this.processTouches(t,this.upOut)},upOut:function(t){this.scrolling||(c.up(t),c.leaveOut(t)),this.cleanUpPointer(t)},touchcancel:function(t){this.processTouches(t,this.cancelOut)},cancelOut:function(t){c.cancel(t),c.leaveOut(t),this.cleanUpPointer(t)},cleanUpPointer:function(t){D.delete(t.pointerId),this.removePrimaryPointer(t)},dedupSynthMouse:function(t){var e=I.lastTouches,n=t.changedTouches[0];if(this.isPrimaryTouch(n)){var r={x:n.clientX,y:n.clientY};e.push(r);var i=function(t,e){var n=t.indexOf(e);n>-1&&t.splice(n,1)}.bind(null,e,r);setTimeout(i,2500)}}};M=new b(Y.elementAdded,Y.elementRemoved,Y.elementChanged,Y);var C,j,X,F=c.pointermap,A=window.MSPointerEvent&&"number"===typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,L={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(t){c.listen(t,this.events)},unregister:function(t){c.unlisten(t,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(t){var e=t;return A&&((e=c.cloneEvent(t)).pointerType=this.POINTER_TYPES[t.pointerType]),e},cleanup:function(t){F.delete(t)},MSPointerDown:function(t){F.set(t.pointerId,t);var e=this.prepareEvent(t);c.down(e)},MSPointerMove:function(t){var e=this.prepareEvent(t);c.move(e)},MSPointerUp:function(t){var e=this.prepareEvent(t);c.up(e),this.cleanup(t.pointerId)},MSPointerOut:function(t){var e=this.prepareEvent(t);c.leaveOut(e)},MSPointerOver:function(t){var e=this.prepareEvent(t);c.enterOver(e)},MSPointerCancel:function(t){var e=this.prepareEvent(t);c.cancel(e),this.cleanup(t.pointerId)},MSLostPointerCapture:function(t){var e=c.makeEvent("lostpointercapture",t);c.dispatchEvent(e)},MSGotPointerCapture:function(t){var e=c.makeEvent("gotpointercapture",t);c.dispatchEvent(e)}};function k(t){if(!c.pointermap.has(t)){var e=new Error("NotFoundError");throw e.name="NotFoundError",e}}function K(t){for(var e=t.parentNode;e&&e!==t.ownerDocument;)e=e.parentNode;if(!e){var n=new Error("InvalidStateError");throw n.name="InvalidStateError",n}}function x(t){return 0!==c.pointermap.get(t).buttons}return window.navigator.msPointerEnabled?(C=function(t){k(t),K(this),x(t)&&(c.setCapture(t,this,!0),this.msSetPointerCapture(t))},j=function(t){k(t),c.releaseCapture(t,!0),this.msReleasePointerCapture(t)}):(C=function(t){k(t),K(this),x(t)&&c.setCapture(t,this)},j=function(t){k(t),c.releaseCapture(t)}),X=function(t){return!!c.captureInfo[t]},function(){if(T){y.forEach((function(t){g+=t.selector+E(t.value)+"\n",w&&(g+=function(t){return"body /shadow-deep/ "+t}(t.selector)+E(t.value)+"\n")}));var t=document.createElement("style");t.textContent=g,document.head.appendChild(t)}}(),function(){if(!window.PointerEvent){if(window.PointerEvent=n,window.navigator.msPointerEnabled){var t=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:t,enumerable:!0}),c.registerSource("ms",L)}else Object.defineProperty(window.navigator,"maxTouchPoints",{value:0,enumerable:!0}),c.registerSource("mouse",I),void 0!==window.ontouchstart&&c.registerSource("touch",Y);c.register(document)}}(),window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:C},releasePointerCapture:{value:j},hasPointerCapture:{value:X}}),{dispatcher:c,Installer:b,PointerEvent:n,PointerMap:r,targetFinding:l}}()}}]);
//# sourceMappingURL=19.b5d63702.chunk.js.map