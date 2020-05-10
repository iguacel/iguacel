import React, { useState, useMemo, useRef } from "react";
import * as THREE from "three";
import * as meshline from "threejs-meshline";
import { extend, Canvas, useFrame, useThree } from "react-three-fiber";
import chroma from "chroma-js";

extend(meshline);

const Rig = ({ mouse }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (-mouse.current[0] / 50 - camera.position.x) * 0.09;
    camera.position.y += (mouse.current[1] / 50 - camera.position.y) * 0.09;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const colors = [
  "#ECECDE",
  "#F1EDBF",
  "#F7E85A",
  "#F6CF00",
  "#F4AC03",
  "#F2873E",
  "#F16D63",
  "#DB5E83",
  "#B95AA4",
  "#975CA0",
  "#6B5AA5",
  "#4051A7",
  "#223F86",
  "#153755",
  "#0C2A32",
  "#141920",
];

const BgLine = ({ color, lineWidth }) => {
  const material = useRef();

  // useFrame(() => {
  //   console.log(material.current.uniforms);
  // });

  return (
    <mesh>
      <meshLine attach="geometry" vertices={vertex} />
      <meshLineMaterial
        opacity={1}
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={lineWidth}
        color={color}
      />
    </mesh>
  );
};

const vertex = [new THREE.Vector3(0, -20, 0), new THREE.Vector3(0, 20, 0)];

const AnimatedLine = ({ color, speed, lineWidth }) => {
  const material = useRef();

  useFrame(() => {
    material.current.uniforms.dashOffset.value -= speed;
  });

  return (
    <mesh>
      <meshLine attach="geometry" vertices={vertex} />
      <meshLineMaterial
        opacity={0.9}
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={lineWidth}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  );
};

const Lines = ({ count, lineWidth }) => {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, i) => {
        return {
          color: colors[i],
          speed: Math.max(0.0001, 0.0007 * Math.random()),
        };
      }),
    [count]
  );
  return lines.map((props, index) => (
    <AnimatedLine
      key={`animatedLine${index}`}
      lineWidth={lineWidth}
      {...props}
    />
  ));
};

export default function () {
  const [bgColor, setBgColor] = useState("var(--background-color)");
  const mouse = useRef([0, 0]);

  const changeBg = () => {
    const rando = colors[parseInt(colors.length * Math.random())];
    const opacityRando = chroma(rando).alpha(0.8).hex();
    setBgColor(opacityRando);
  };

  return (
    <div
      onClick={() => changeBg()}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        width: "100%",
        height: "100vh",
        cursor: "pointer",
        background: bgColor,
      }}
    >
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 10], near: 0.01, far: 25, fov: 25 }}
        onMouseMove={(e) =>
          (mouse.current = [
            e.clientX - window.innerWidth / 2,
            e.clientY - window.innerHeight / 2,
          ])
        }
      >
        <BgLine color={"#ECECDE"} lineWidth={2} />

        <Lines count={colors.length} lineWidth={2} />

        <Rig mouse={mouse} />
      </Canvas>
    </div>
  );
}
