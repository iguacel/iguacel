import React, { useMemo, useRef, useContext } from "react";
import * as THREE from "three";
import * as meshline from "threejs-meshline";
import { extend, Canvas, useFrame, useThree } from "react-three-fiber";
import ThemeContext from "../context/ThemeContext";

extend(meshline);

const Rig = ({ mouse }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (-mouse.current[0] / 50 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current[1] / 50 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const colors = [
  "#CAE8E6",
  "#EFDE0B",
  "#F39A02",
  "#F04902",
  "#C81412",
  "#780235",
  "#401238",
  "#1E0D2A",
  "#130E11",
  "#0D0B0E",
];

const vertex = (radius = 1) => {
  const vertices = [];
  for (let j = 0; j < Math.PI * 2; j += (2 * Math.PI) / 200) {
    vertices.push(
      new THREE.Vector3(
        Math.cos(j) * radius,
        Math.sin(j) * radius,
        Math.sin(radius)
      )
    );
  }
  return vertices;
};

const LineMesh = ({ width, color, speed, radius }) => {
  const material = useRef();

  useFrame(() => (material.current.uniforms.dashOffset.value -= speed));

  return (
    <mesh>
      <meshLine attach="geometry" vertices={vertex(radius)} />
      <meshLineMaterial
        opacity={0.9}
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.2}
        dashRatio={0.9}
      />
    </mesh>
  );
};

const Lines = ({ count, colors, radius }) => {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, i) => {
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: 0.1,
          speed: Math.max(0.0001, 0.0012 * Math.random()),
        };
      }),
    [colors, count]
  );
  return lines.map((props, index) => (
    <LineMesh key={`lineMesh${index}`} radius={radius} {...props} />
  ));
};

export default function () {
  const mouse = useRef([0, 0]);
  const { dark } = useContext(ThemeContext);
  const bg = dark ? "#141920" : "#ECECDE";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        zIndex: 3,
        width: "100%",
        height: "100vh",
        cursor: "pointer",
        background: bg,
      }}
    >
      <Canvas
        pixelRatio={window.devicePixelRatio || 1}
        camera={{ position: [0, 0, 10], near: 0.01, far: 25, fov: 25 }}
        onMouseMove={(e) =>
          (mouse.current = [
            e.clientX - window.innerWidth / 2,
            e.clientY - window.innerHeight / 2,
          ])
        }
      >
        {new Array(10).fill().map((x, i) => {
          return (
            <Lines
              key={`line${i}`}
              count={i < 1 ? 0 : i + 2}
              colors={colors}
              radius={i * 0.4 + 0.2}
            />
          );
        })}
        <Rig mouse={mouse} />
      </Canvas>
    </div>
  );
}
