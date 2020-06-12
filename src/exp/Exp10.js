import * as THREE from "three";
import React, { useRef, useMemo, useContext } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import ThemeContext from "../context/ThemeContext";
import { degreesToRadians } from "../utils/utils";

const scratchObj = new THREE.Object3D();
const scratchColor = new THREE.Color();

const Cylinders = ({ colors }) => {
  const ref = useRef();
  const attrib = useRef();
  const refPlaneMesh = useRef();

  const n = 31;
  const spacing = 10;
  const nInstances = n * n;

  const colorsArray = new Float32Array(n * n * 3);

  const grid = useMemo(() =>
    new Array(n * n).fill(0).map((_, i) => ({
      id: i,
      isEven: i % 2 === 0,
      x: Math.floor(i % n) * spacing - ((spacing * n) / 2 - spacing / 2),
      y: Math.floor(i / n) * spacing - ((spacing * n) / 2 - spacing / 2),
      col: Math.floor(i / n),
      colIsEven: Math.floor(i / n) % 2 === 0,
    }), [])
  );

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    if (time < 5) {
      refPlaneMesh.current.visible = false;
    } else {
      refPlaneMesh.current.visible = true;
    }

    // map
    grid.map((x) => {
      const rotation = degreesToRadians((time / 10) * 360);
      scratchObj.position.set(x.x, x.y, 0);

      state.camera.rotation.z = degreesToRadians((time / 10) * 90);

      // Even
      if (x.isEven) {
        scratchColor.set(colors.dark);

        if (x.colIsEven) {
          scratchObj.rotation.x = rotation;
        } else {
          scratchObj.rotation.x = -rotation;
        }

        if (time > 5) {
          scratchObj.rotation.x = 0;
          scratchObj.position.set(-200, -200, -200);
        }
      }

      // Odd
      if (!x.isEven) {
        scratchColor.set(colors.main);

        if (!x.colIsEven) {
          scratchObj.rotation.x = -rotation;
        } else {
          scratchObj.rotation.x = rotation;
        }

        if (time < 5) {
          scratchObj.rotation.x = 0;
          scratchObj.position.set(-200, -200, -200);
        }
      }

      scratchObj.updateMatrix();
      ref.current.setMatrixAt(x.id, scratchObj.matrix);
      ref.current.instanceMatrix.needsUpdate = true;

      scratchColor.toArray(colorsArray, x.id * 3);
      attrib.current.needsUpdate = true;

      state.camera.updateProjectionMatrix();
    });
    // End map

    if (time > 10) {
      state.clock.elapsedTime = 0;
    }
  });
  // End useFrame

  return (
    <group>
      <instancedMesh ref={ref} args={[null, null, nInstances]}>
        <cylinderBufferGeometry attach="geometry" args={[5, 5, 10, 32]}>
          <instancedBufferAttribute
            ref={attrib}
            attachObject={["attributes", "color"]}
            args={[colorsArray, 3]}
          />
        </cylinderBufferGeometry>
        <meshBasicMaterial
          attachArray="material"
          vertexColors={THREE.VertexColors}
        />
        <meshLambertMaterial
          attachArray="material"
          emissiveIntensity={2}
          vertexColors={THREE.VertexColors}
        />
        <meshLambertMaterial
          attachArray="material"
          emissiveIntensity={2}
          vertexColors={THREE.VertexColors}
        />
      </instancedMesh>

      <mesh position={[0, 0, -10]} ref={refPlaneMesh}>
        <planeBufferGeometry attach="geometry" args={[820, 820, 1]} />
        <meshBasicMaterial attach="material" color={colors.dark} />
      </mesh>
    </group>
  );
};

export default () => {
  const { dark } = useContext(ThemeContext);

  const colors = {
    dark: dark ? "#1A1E21" : "#212733",
    main: "#4DC0CB",
  };

  return (
    <Canvas
      // colorManagement
      orthographic
      pixelRatio={window.devicePixelRatio === 1 ? 1 : 2}
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      gl={{ antialias: true, alpha: false }}
      camera={{
        zoom: 8,
        position: [0, 0, 200],
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(colors.main));
      }}
    >
      <hemisphereLight intensity={0.9} />
      <spotLight position={[0, 0, 400]} intensity={2} />

      <Cylinders colors={colors} />
    </Canvas>
  );
};
