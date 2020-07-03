import * as THREE from "three";
import React, { useRef, useMemo, useContext } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { TrackballControls } from "drei";
import ThemeContext from "../context/ThemeContext";

const fragmentShader = `
uniform float time;
uniform float progress;
uniform float vProgress;
varying vec4 vPosition;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1. - smoothstep(0.45,0.5,dist);
    gl_FragColor = vec4(1.,1.,1.,alpha*0.5 + 0.5*vProgress);
}`;

const vertexShader = `
  uniform float time;

  void main() {
    vec3 newpos = position;

    // infinite
    newpos.y -= mod(time,3.);
    float progress = smoothstep(-1.,5.,newpos.y);

    newpos.z += progress*-newpos.y*newpos.y*newpos.y;

    vec4 mvPosition = modelViewMatrix * vec4(newpos/10., 1.);
    gl_PointSize = 5. * (1. / - mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

function Thing() {
  const ref = useRef();

  const data = useMemo(
    () => ({
      extensions: "#extension GL_OES_standard_derivatives : enable",
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      transparent: true,
      fragmentShader,
      vertexShader,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    }),
    []
  );

  // count
  let count = 100;

  // attributes
  let position = new Float32Array(count * count * 3);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      position.set(
        [(i / count - 0.5) * 20, (j / count - 0.5) * 20, 0],
        3 * (count * i + j)
      );
    }
  }

  const refMaterial = useRef();
  const refGeo = useRef();

  useFrame((state) => {
    // Geo
    refGeo.current.setAttribute(
      "position",
      new THREE.BufferAttribute(position, 3)
    );

    // Material
    refMaterial.current.uniforms.time.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry" ref={refGeo} />
      <shaderMaterial attach="material" ref={refMaterial} {...data} />
    </points>
  );
}

export default () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        cursor: "pointer",
        background: dark
          ? "RGBA(34, 63, 134, 1.00)"
          : "RGBA(110, 181, 87, 1.00)",
        transition: "background 200ms",
      }}
    >
      <Canvas camera={{ fov: 65, position: [0, -0.5, -0.1] }}>
        <Thing />
        <TrackballControls />
      </Canvas>
    </div>
  );
};
