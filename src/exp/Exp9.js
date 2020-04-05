import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { useSpring } from "react-spring/three";
import { useInterval } from "react-use";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
extend({ TrackballControls });

// If you are trying to replicate this, please follow this wonderful tutorial instead: https://medium.com/cortico/3d-data-visualization-with-react-and-three-js-7272fb6de432. All credit to Peter Beshai and Paul Henschel

const data = new Array(10000).fill().map((_, id) => ({ id }));

const colors = {
  red: "#D42A1F",
  blue: "#2B638E",
  yellow: "#F5C22C",
  green: "#2F8E5C",
};

const factorization = (number) => {
  // Jon Palin,
  // inspired by https://bit.ly/2wCr7vA
  // console.log("factorization", number);

  let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271,
  ];

  const smallfirst = false;
  const PI = Math.PI;
  const off2 = 0;
  const data = [];
  let ide = 1;

  const draw = (number, cx, cy, s) => {
    let oy;
    let r;
    let d;
    if (number === 1) {
      ide++;
      data.push({ x: cx, y: cy, z: 0, s: (s * PI) / 2, ide });
    } else {
      let f = primefactor(number);
      if (f === 2) {
        oy = 0;
        if (number % 4 === 0) {
          f = 4;
          r = (2 * s) / (f + 2);
          d = (f * s) / (f + 2);
        } else {
          f = 2;
          r = (0.75 * 2 * s) / (2 + 2);
          d = (2 * s) / (2 + 2);
        }
      } else {
        r = (2 * s) / (f + 2);
        d = (f * s) / (f + 2);
        oy = (d / 2) * (1 - Math.cos(PI / f));
      }

      for (let i = 0; i < f; i++) {
        let x = Math.sin(PI + (2 * PI * (i + 0.5)) / f + off2);
        let y = Math.cos(PI + (2 * PI * (i + 0.5)) / f + off2);
        draw(number / f, cx + x * d, cy - y * d + oy, r);
      }
    }
  };

  const primefactor = (number) => {
    let ans = number;
    for (let pi in primes) {
      if (number % primes[pi] === 0) {
        ans = primes[pi];
        if (smallfirst) {
          return ans;
        }
      }
    }
    return ans;
  };

  draw(number, 0, 0, 30);
  return data;
};


function factorizationLayout(data, int) {
  // console.log("factorizationLayout", data);

  const numPoints = data.length;

  const fact = factorization(int);

  for (let i = 0; i < numPoints; ++i) {
    const datum = data[i];

    if (i < fact.length) {
      datum.x = fact[i].x;
      datum.y = fact[i].y;
      datum.z = fact[i].z;
      datum.s = fact[i].s;
    } else {
      datum.x = 0;
      datum.y = 0;
      datum.z = 0;
      datum.s = 0;
    }
  }
}

const useLayout = ({ data, int = 1 }) => {
  // console.log("useLayout", data)

  useEffect(() => {
    factorizationLayout(data, int);
  }, [data, int]);
};

function useSourceTargetLayout({ data, int }) {
  // prep for new animation by storing source
  // console.log("useSourceTargetLayout", data)

  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
      data[i].sourceS = data[i].s || 0;
    }
  }, [data, int]);

  // run layout
  useLayout({ data, int });

  // store target
  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].targetX = data[i].x;
      data[i].targetY = data[i].y;
      data[i].targetZ = data[i].z;
      data[i].targetS = data[i].s;
    }
  }, [data, int]);
}

function interpolateSourceTarget(data, progress) {
  // console.log("interpolateSourceTarget", data)

  for (let i = 0; i < data.length; ++i) {
    data[i].x = (1 - progress) * data[i].sourceX + progress * data[i].targetX;
    data[i].y = (1 - progress) * data[i].sourceY + progress * data[i].targetY;
    data[i].z = (1 - progress) * data[i].sourceZ + progress * data[i].targetZ;
    data[i].s = (1 - progress) * data[i].sourceS + progress * data[i].targetS;
  }
}

function useAnimatedLayout({ data, int, onFrame }) {
  // compute layout remembering initial position as source and
  // end position as target
  // console.log("useAnimatedLayout", data)
  useSourceTargetLayout({ data, int });

  // do the actual animation when layout changes
  const prevInt = React.useRef(int);

  useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: int !== prevInt.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      interpolateSourceTarget(data, animationProgress);
      // callback to indicate data has updated
      onFrame({ animationProgress });
    },
  });
  prevInt.current = int;
}


// re-use for instance computations
const scratch = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }) {
  // console.log("updateInstancedMeshMatrices", data)
  if (!mesh) return;

  // set the transform matrix for each instance
  for (let i = 0; i < data.length; ++i) {
    const { x, y, z, s } = data[i];

    scratch.position.set(x, y, z);
    scratch.position.set(x, y, z);
    scratch.scale.set(s, s, s);

    scratch.updateMatrix();
    mesh.setMatrixAt(i, scratch.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

function Boxes({ data, int }) {
  const meshRef = useRef();
  const attRef = useRef();
  const numInstances = data.length;

  // run the layout, animating on change
  useAnimatedLayout({
    data,
    int,
    onFrame: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / Math.PI * 2)
    meshRef.current.rotation.y = Math.sin(time / Math.PI)
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numInstances]}
      frustumCulled={false}
    >
      <boxBufferGeometry attach="geometry">
        <instancedBufferAttribute ref={attRef} />
      </boxBufferGeometry>

      {/* material */}
      <meshBasicMaterial attachArray="material" color={colors.green} />
      <meshBasicMaterial attachArray="material" color={colors.green} />
      <meshBasicMaterial attachArray="material" color={colors.yellow} />
      <meshBasicMaterial attachArray="material" color={colors.yellow} />
      <meshBasicMaterial attachArray="material" color={colors.blue} />
      <meshBasicMaterial attachArray="material" color={colors.blue} />
    </instancedMesh>
  );
}


const Trackball = () => {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    controls.current.update();
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      keys={[
        18, //ALT_KEY - orbit
        17, //CTRL_KEY- zoom
        91, //CMD_KEY - pan
      ]}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.ZOOM,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
    />
  );
};

// MAIN
export default () => {
  const [int, setInt] = useState(5);

  // useInterval(() => {
  //   if (int < 10000) {
  //     setInt(int + 1);
  //   } else {
  //     setInt(1)
  //   }
  // }, 1000)

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        cursor: "grabbing"
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <h1 style={{
          fontSize: 100, opacity: 0.2, fontFeatureSettings: "tnum",
          fontVariantNumeric: "tabular-nums"
        }}>{int}</h1> */}
      </div>

      <Canvas
        sRGB
        pixelRatio={window.devicePixelRatio || 1}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 10, position: [0, 0, 500] }}
      >
        <Boxes data={data} int={int} />
        <Trackball />
      </Canvas>
    </div >
  );
};
