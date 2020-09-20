import * as THREE from "three";
import React, { useMemo, useRef, useContext } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import ThemeContext from "../context/ThemeContext";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

// Linting glsl
var glsl = (a, ...bb) =>
  a
    .map((x, i) => [x, bb[i]])
    .flat()
    .join("");

//	FRAG
//  FRAG
//  FRAG

const fragmentShader = glsl`
#extension GL_OES_standard_derivatives : enable

// Uniforms
uniform float time;
uniform bool dark;

varying vec2 vUv;

// UTILS
// From Patricio González Vivo's PixelSpiritDeck
// https://github.com/patriciogonzalezvivo/PixelSpiritDeck

float aastep(float threshold,float value){
  #ifdef GL_OES_standard_derivatives
  float afwidth=.7*length(vec2(dFdx(value),dFdy(value)));
  return smoothstep(threshold-afwidth,threshold+afwidth,value);
  #else
  return step(threshold,value);
  #endif
}

float fill(float x,float size){
  return 1.-aastep(size,x);
}

vec2 rotate(vec2 st,float a){
  st=mat2(cos(a),-sin(a),
  sin(a),cos(a))*(st-.5);
  return st+.5;
}

// SDF

// vec2 scale(vec2 st,vec2 s){
//   return(st-.5)*s+.5;
// }

// float marijuanaSDF(vec2 st){
//   st=st*2.-vec2(0.,.8);
//   st=rotate(st,radians(90.));
//   float r=length(st)*2.;
//   float a=atan(st.y,st.x);
//   return 1.-(asin(.5+.5*cos(7.6*a))*(.5+.5*cos(a)))/r;
// }

float marijuanaAnimationSDF(vec2 st){
  st=st*2.-vec2(0.,.8);
  st=rotate(st,radians(90.));
  float r=length(st)*2.;
  float a=atan(st.y,st.x);
  return 1.-(asin(.5+.5*cos(7.6*a))*cos(70.*a+time*20.)*(.5+.5*cos(a)))/r;
}

// MAIN
// MAIN
// MAIN
void main(){
  vec2 st=vUv.xy;
  vec3 color=vec3(0.);

  float marijuanaAnim=marijuanaAnimationSDF(st);

  color+=fill(marijuanaAnim,.1)*(distance(st,vec2(.5,.4))*1.5);

  color*=vec3(12.66);

  vec3 fgColorDark=vec3(0.,1.,.5);
  vec3 fgColorLight=vec3(.8,.3,.3);

  vec3 bgColor=vec3(0.,.1,.2);

  if(dark){
    color=mix(bgColor,fgColorDark,color);
  }else{
    color=mix(bgColor,fgColorLight,color);
  }

  gl_FragColor=vec4(color,1.);
}`;

//	VERTEX
//  VERTEX
//  VERTEX
const vertexShader = glsl`
uniform float time;
varying vec2 vUv;

void main(){
  vUv=uv;
  vec4 mvPosition=vec4(position,1.);

  #ifdef USE_INSTANCING
  mvPosition=instanceMatrix*mvPosition;
  #endif

  gl_Position=projectionMatrix*modelViewMatrix*mvPosition;
}`;

const Leaf = ({ dark }) => {
  const mesh = useRef();

  const data = useMemo(
    () => ({
      uniforms: {
        time: { type: "float", value: 0 },
        dark: { type: "bool", value: true },
      },
      fragmentShader,
      vertexShader,
    }),
    []
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    mesh.current.material.uniforms.time.value = time;
    mesh.current.material.uniforms.dark.value = dark;
  });

  return (
    <mesh position={[0, -0.25, 0]} ref={mesh}>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <shaderMaterial attach="material" {...data} />
    </mesh>
  );
};

export default () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { dark } = useContext(ThemeContext);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#0C1933" }}>
      <Canvas
        colorManagement
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        orthographic={true}
        camera={{ position: [0, 0, 1], zoom: isMobile ? 160 : 250 }}
        onCreated={({ gl }) => {
          if (gl) {
            gl.setClearColor(new THREE.Color("#0C1933"));
          }
        }}
      >
        <Leaf dark={dark} />

        <Orbit />
      </Canvas>
    </div>
  );
};

const Orbit = () => {
  const controls = useRef();

  const { camera, gl } = useThree();

  var minPan = new THREE.Vector3(-1, -1, -1);
  var maxPan = new THREE.Vector3(1, 1, 1);
  var _v = new THREE.Vector3();

  useFrame((state) => {
    _v.copy(controls.current.target);
    controls.current.target.clamp(minPan, maxPan);
    _v.sub(controls.current.target);
    state.camera.position.sub(_v);
    controls.current.update();
  });

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.3}
      keys={[
        17, //CTRL_KEY- zoom
        18, //CMD_KEY - pan
      ]}
      mouseButtons={{
        RIGHT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.ZOOM,
      }}
      minZoom={100}
      maxZoom={350}
      enableRotate={false}
      enableZoom={true}
      enablePan={true}
      screenSpacePanning={true}
    />
  );
};
