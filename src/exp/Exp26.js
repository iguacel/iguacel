import * as THREE from "three";
import React, { useMemo, useRef, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Canvas, useFrame } from "react-three-fiber";

// Linting glsl
const glsl = (a, ...bb) =>
  a
    .map((x, i) => [x, bb[i]])
    .flat()
    .join("");

const vertexShader = glsl`
    varying vec2 vUv;
    varying vec3 vPosition;

    vec2 rotate(vec2 v, float a) {
      float s = sin(a);
      float c = cos(a);
      mat2 m = mat2(c, -s, s, c);
      return m * v;
    }

    void main() {
      vUv = uv;
      vPosition = position;
      vec3 newpos = position;
      newpos.xy = rotate(newpos.xy, position.z / 2.);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }`;

const fragmentShader = glsl`
uniform float time;
uniform vec3 fogColor;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec3 WHITE = vec3(0.54,0.46,0.31);
  vec3 BLACK = vec3(0.10,0.11,0.12);

  float pi = 3.1415926;

  float threshold = 0.1;
  float fline = sin(vUv.y*5.*pi);

  float fline_a = float(abs(fline));

  float k = 0.;
  float sk = 0.;

  if(fline<0.){
    k = -1.;
  } else {
    k = 1.;
  }

  if(fline_a<threshold){
    sk = (threshold - fline_a)/threshold;
    k = k*(1. - sk) + fline_a*sk;
  } else {
    sk = 1.;
  }

  k = (k + 1.)/2.;

  float fog = clamp((vPosition.z - abs(pow(sin(time),2.)) * 13.),0.,1.);

  vec3 finalColor = mix(WHITE,BLACK,k);

  finalColor = mix(fogColor,finalColor,fog);
  gl_FragColor.rgba = vec4(finalColor, 1.0);
}`;

const ExtrudeShape = ({ dark }) => {
  const mesh = useRef();
  const material = useRef();

  const uniforms = useMemo(
    () => ({
      time: { type: "f", value: 0 },
      fogColor: { type: "v", value: [0, 0, 0] },
    }),
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.material.uniforms.time.value = time;

    if (dark) {
      material.current.uniforms.fogColor.value = new THREE.Color(
        0.1,
        0.11,
        0.12
      );
    } else {
      material.current.uniforms.fogColor.value = new THREE.Color(
        0.54,
        0.46,
        0.31
      );
    }
    mesh.current.rotation.z += 0.01;
  });

  const segments = 300;
  const pathShape = new THREE.Shape();

  for (let i = 0; i <= segments; i++) {
    let theta = (2 * Math.PI * i) / segments;
    let r = 0.2 + 0.2 * Math.sin(2 * theta * 2) ** 2;
    let x = r * Math.sin(theta);
    let y = r * Math.cos(theta);
    if (i === 0) {
      pathShape.moveTo(x, y);
    } else {
      pathShape.lineTo(x, y);
    }
  }

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <extrudeBufferGeometry
        attach="geometry"
        args={[
          [pathShape],
          {
            steps: 100,
            depth: 15,
            bevelEnabled: false,
          },
        ]}
      />
      <shaderMaterial
        ref={material}
        attach="material"
        args={[
          {
            uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            // wireframe: true,
            // transparent: true,
            // depthWrite: false,
            // depthTest: false,
            // blending: THREE.AdditiveBlending,
          },
        ]}
      />
    </mesh>
  );
};

export default () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        camera={{
          fov: 20,
          zoom: 1,
          near: 0.01,
          far: 90,
          focus: 10,
          position: [0, 0, 10],
        }}
      >
        <ExtrudeShape dark={dark} />
      </Canvas>
    </div>
  );
};
