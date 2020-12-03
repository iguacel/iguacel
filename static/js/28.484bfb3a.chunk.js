(this["webpackJsonpraster-react-canvas2"]=this["webpackJsonpraster-react-canvas2"]||[]).push([[28],{310:function(e,t,a){e.exports=a.p+"static/media/5ABR.1c33d628.csv"},311:function(e,t,a){e.exports=a.p+"static/media/19JUN.6f2b3c5f.csv"},369:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a(88),i=a(0),o=a.n(i),c=a(72),l=a(74),u=a(75),s=a(78),f=a(90),m=a(93),d=a(19),b=a(13),v=a(164),p=a(25),g=a(161),h=a(310),j=a.n(h),w=a(311),E=a.n(w),O=a(162);a(139),a(163);function y(){var e=Object(r.a)(["\n  uniform float time;\n\n  attribute float angle;\n  attribute float distance;\n  attribute float offset;\n  attribute float flow;\n\n  varying float vAlpha;\n\n  void main() {\n\n    float current = mod(offset + time, distance);\n\n    float pct = current/distance;\n    vec3 newpos = position;\n\n    newpos.x += cos(angle)*current;\n    newpos.y += sin(angle)*current;\n\n    vAlpha = 0.1;\n\n    vec4 mvPosition = modelViewMatrix * vec4(newpos, 1.);\n    float f = flow / 120.;\n    float d1 = 100.;\n    float x1 = 0.1;\n    float d2 = d1 * sqrt(f / x1);\n    gl_PointSize = d2 / 100.;\n    gl_Position = projectionMatrix * mvPosition;\n  }\n"]);return y=function(){return e},e}function x(){var e=Object(r.a)(["\nuniform float time;\nuniform float progress;\nuniform float vProgress;\nvarying vec4 vPosition;\nvarying float vAlpha;\n\n\n  void main() {\n    vec3 color = vec3(0.25,0.32,0.65);\n\n    float dist = length(gl_PointCoord - vec2(0.5));\n    float circle = 1. - smoothstep(0.49,0.5,dist);\n    gl_FragColor = vec4(color,circle*vAlpha/1.5);\n}"]);return x=function(){return e},e}var A=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return e.map((function(e,t){return[e,a[t]]})).flat().join("")},P=A(x()),M=A(y());Object(l.e)({MapControls:m.a,LineMaterial:u.a,LineGeometry:s.a,Line2:f.a});var S="#0B0D11",B="#1C2230",C="#262F42";function F(e){var t=e.data,a=Object(i.useRef)(),r=Object(i.useMemo)((function(){return{extensions:"#extension GL_OES_standard_derivatives : enable",side:c.DoubleSide,uniforms:{time:{type:"f",value:0},uvRate1:{value:new c.Vector2(1,1)}},fragmentShader:P,vertexShader:M,transparent:!0,depthWrite:!1,depthTest:!1,blending:c.AdditiveBlending}}),[]),u=Object(i.useMemo)((function(){return new Float32Array(189e3)}),[]),s=new Float32Array(63e3),f=new Float32Array(63e3),m=new Float32Array(63e3),d=new Float32Array(63e3);t.forEach((function(e,t){var a=e.o,r=e.d,i=e.f,o=Object(n.a)(O.a["c".concat(a)],2),c=o[0],l=o[1],b=Object(n.a)(O.a["c".concat(r)],2),v=b[0],g=b[1],h=[c,l,0],j=[Object(p.d)({x:c,y:l},{x:v,y:g})],w=[Object(p.e)({x:c,y:l},{x:v,y:g})>0?Object(p.e)({x:c,y:l},{x:v,y:g}):.1];u.set(h,3*t),s.set(j,t),f.set(w,t),m.set([Math.random()],t),d.set([i],t)}));var b=Object(i.useRef)(),v=Object(i.useRef)();return Object(l.g)((function(e){v.current.setAttribute("position",new c.BufferAttribute(u,3)),v.current.setAttribute("angle",new c.BufferAttribute(s,1)),v.current.setAttribute("distance",new c.BufferAttribute(f,1)),v.current.setAttribute("offset",new c.BufferAttribute(m,1)),v.current.setAttribute("flow",new c.BufferAttribute(d,1)),b.current.uniforms.time.value=10*e.clock.getElapsedTime()})),o.a.createElement("points",{ref:a},o.a.createElement("bufferGeometry",{attach:"geometry",ref:v}),o.a.createElement("shaderMaterial",Object.assign({attach:"material",ref:b},r)))}t.default=function(){var e=Object(i.useContext)(b.c).language.isEnglish,t=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),a=Object(i.useContext)(d.b).dark,r=Object(i.useState)(null),c=Object(n.a)(r,2),u=c[0],s=c[1],f=Object(i.useState)(null),m=Object(n.a)(f,2),p=m[0],g=m[1],h=Object(i.useState)({data:null,meta:"5 de abril"}),w=Object(n.a)(h,2),O=w[0],y=w[1];return Object(i.useEffect)((function(){Object(v.a)(j.a).then((function(e){y({data:e,meta:{id:"abril",date:"5 de abril 2020",num:12416,max:2961}}),s(e)})),Object(v.a)(E.a).then((function(e){g(e)}))}),[]),o.a.createElement("div",{className:"mov"},o.a.createElement(G,{isEnglish:e,visible:O,setVisible:y,options:{abril:{id:"abril",date:"5 de abril 2020",num:12416,max:2961},junio:{id:"junio",date:"19 de junio 2020",num:37366,max:6883}},abril:u,junio:p}),o.a.createElement(l.a,{pixelRatio:Math.min(2,t?window.devicePixelRatio:1),orthographic:!0,camera:{position:[0,0,500]}},o.a.createElement("color",{attach:"background",args:[a?B:C]}),o.a.createElement(R,null),O.data&&o.a.createElement(F,{data:O.data}),o.a.createElement(_,null)))};var R=function(){return o.a.createElement(o.a.Fragment,null,g.b.map((function(e){return o.a.createElement(V,{data:e,key:"extrude".concat(e.name)})})),o.a.createElement(k,{data:g.a}))},k=function(e){var t=e.data,a=e.width,n=void 0===a?1:a,r=e.color,i=void 0===r?"gray":r,c=Object(l.i)().size,u=Object(l.j)((function(e){e.setPositions(t)}),[]);return o.a.createElement("line2",null,o.a.createElement("lineGeometry",{attach:"geometry",ref:u}),o.a.createElement("lineMaterial",{attach:"material",color:i,linewidth:n,resolution:[c.width,c.height]}))},V=function(e){var t=e.data,a=[];t.points.forEach((function(e){a.push(new c.Vector2(e[0],e[1]))}));var n=Object(i.useMemo)((function(){return new c.Shape(a)}),[a]);return o.a.createElement("mesh",{position:[0,0,0],castShadow:!0},o.a.createElement("extrudeBufferGeometry",{attach:"geometry",args:[[n],{bevelEnabled:!1}]}),o.a.createElement("meshBasicMaterial",{attach:"material",color:S}))},_=function(){var e=Object(i.useRef)(),t=Object(l.i)(),a=t.camera,n=t.gl,r=new c.Vector3(-350,-350,-350),u=new c.Vector3(350,350,350),s=new c.Vector3;return Object(l.g)((function(t){s.copy(e.current.target),e.current.target.clamp(r,u),s.sub(e.current.target),t.camera.position.sub(s),e.current.update()})),o.a.createElement("mapControls",{ref:e,args:[a,n.domElement],dynamicDampingFactor:.3,minZoom:.35,maxZoom:45,enableRotate:!1,enableZoom:!0,enablePan:!0,screenSpacePanning:!0})},G=function(e){var t=e.visible,a=e.setVisible,n=e.options,r=e.abril,i=e.junio,c=e.isEnglish;return o.a.createElement("div",{className:"menu"},o.a.createElement("button",{className:"abril"===t.meta.id?"active":"",onClick:function(){return a({data:r,meta:n.abril})}},c?"Apr. 5":"5 abril"),o.a.createElement("button",{className:"junio"===t.meta.id?"active":"",onClick:function(){return a({data:i,meta:n.junio})}},c?"Jun. 19":"19 junio"))}}}]);
//# sourceMappingURL=28.484bfb3a.chunk.js.map