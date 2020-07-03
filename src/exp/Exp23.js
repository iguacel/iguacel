import * as THREE from "three";
import React, { useRef, useState, useEffect, useContext, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { useSpring } from "react-spring/three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import chroma from "chroma-js";

// Data
import pack1082 from "../data/spheres/pack1082";

// Styles
import "./css/spheres.css";

// Context stuff
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";

extend({ TrackballControls });

//
// 1082 NODES ON A SPHERE
//

const count = 1082;

// Most of this comes from this Peter Beshai tut to animate nodes with react-spring: https://medium.com/cortico/3d-data-visualization-with-react-and-three-js-7272fb6de432.

const data = new Array(count).fill().map((_, id) => ({ id }));
const rad = 20;

// Golden Section Spiral
// http://www.softimageblog.com/archives/115
// 2006 Patrick Boucher

function goldenLayout(data) {
  // console.log("goldenLayout", data);

  const numPoints = data.length;

  let inc = Math.PI * (3 - Math.sqrt(5));
  let offset = 2 / numPoints;

  for (let i = 0; i < data.length; i++) {
    const datum = data[i];

    let y = i * offset - 1 + offset / 2;
    let r = Math.sqrt(1 - y * y);
    let phi = i * inc;

    datum.x = rad * Math.cos(phi) * r;
    datum.y = rad * y;
    datum.z = rad * Math.sin(phi) * r;
    datum.s = 1;
  }
}

// Saff and Kuijlaars
function skLayout(data) {
  // console.log("skLayout", data);

  const numPoints = data.length;

  let s = 3.6 / Math.sqrt(numPoints);
  let dz = 2 / numPoints;
  let long = 0;
  let z = 1 - dz / 2;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];

    let r = Math.sqrt(1 - z * z);

    datum.x = rad * Math.cos(long) * r;
    datum.y = rad * Math.sin(long) * r;
    datum.z = rad * z;
    datum.s = 1;

    z = z - dz;
    long = long + s / r;
  }
}

// Random. Via observable D3. @rickyreusser
// https://www.jasondavies.com/maps/random-points/
// https://observablehq.com/@rreusser/equally-distributing-points-on-a-sphere

function randomPointOnSphere() {
  var theta = 6.283185 * Math.random();
  var u = 2.0 * Math.random() - 1.0;
  var v = Math.sqrt(1 - u * u);
  return [v * Math.cos(theta), v * Math.sin(theta), u];
}

function sphereRandomLayout(data) {
  // console.log("sphereRandom", data);

  const numPoints = data.length;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];

    var pt = randomPointOnSphere();
    datum.x = rad * pt[0];
    datum.y = rad * pt[1];
    datum.z = rad * pt[2];
    datum.s = 1;
  }
}

// Icosahedral
// R. H. Hardin, N. J. A. Sloane and W. D. Smith, Tables of spherical codes with icosahedral symmetry, published electronically at http://NeilSloane.com/icosahedral.codes/.

function packLayout(data) {
  // console.log("sphereRandom", data);

  const numPoints = data.length;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];

    datum.x = rad * pack1082[i === 0 ? 0 : i * 3];
    datum.y = rad * pack1082[i * 3 + 1];
    datum.z = rad * pack1082[i * 3 + 2];
    datum.s = 1;
  }
}

function spiralLayout(data) {
  // console.log("spiralLayout", data);

  // equidistant points on a spiral
  let theta = 0;
  for (let i = 0; i < data.length; ++i) {
    const datum = data[i];
    const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
    theta += Math.asin(1 / radius) * 1;

    datum.x = radius * Math.cos(theta);
    datum.y = radius * Math.sin(theta);
    datum.z = 0;
    datum.s = 0.4;
  }
}

const useLayout = ({ data, layout = "grid" }) => {
  // console.log("useLayout", data);

  useEffect(() => {
    switch (layout) {
      case "golden":
        goldenLayout(data);
        break;
      case "sk":
        skLayout(data);
        break;
      case "sphereRandom":
        sphereRandomLayout(data);
        break;
      case "pack":
        packLayout(data);
        break;
      case "spiralLayout":
      default: {
        spiralLayout(data);
      }
    }
  }, [data, layout]);
};

function useSourceTargetLayout({ data, layout }) {
  // prep for new animation by storing source
  // console.log("useSourceTargetLayout", data);

  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
      data[i].sourceS = data[i].s || 0;
    }
  }, [data, layout]);

  // run layout
  useLayout({ data, layout });

  // store target
  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      data[i].targetX = data[i].x;
      data[i].targetY = data[i].y;
      data[i].targetZ = data[i].z;
      data[i].targetS = data[i].s;
    }
  }, [data, layout]);
}

function interpolateSourceTarget(data, progress) {
  // console.log("interpolateSourceTarget", data);

  for (let i = 0; i < data.length; ++i) {
    data[i].x = (1 - progress) * data[i].sourceX + progress * data[i].targetX;
    data[i].y = (1 - progress) * data[i].sourceY + progress * data[i].targetY;
    data[i].z = (1 - progress) * data[i].sourceZ + progress * data[i].targetZ;
    data[i].s = (1 - progress) * data[i].sourceS + progress * data[i].targetS;
  }
}

function useAnimatedLayout({ data, layout, onFrame }) {
  // compute layout remembering initial position as source and
  // end position as target
  // console.log("useAnimatedLayout", data);

  useSourceTargetLayout({ data, layout });

  // do the actual animation when layout changes
  const prevLayout = React.useRef(layout);

  useSpring({
    animationProgress: 1,
    from: { animationProgress: 0 },
    reset: layout !== prevLayout.current,
    onFrame: ({ animationProgress }) => {
      // interpolate based on progress
      interpolateSourceTarget(data, animationProgress);
      // callback to indicate data has updated
      onFrame({ animationProgress });
    },
  });
  prevLayout.current = layout;
}

// re-use for instance computations
const scratch = new THREE.Object3D();
const scratchColor = new THREE.Color();

function updateInstancedMeshMatrices({
  mesh,
  data,
  attrib,
  colors,
  colorArray,
}) {
  // console.log("updateInstancedMeshMatrices", data);

  if (!mesh) return;

  // set the transform matrix for each instance
  for (let i = 0; i < data.length; ++i) {
    const { x, y, z, s } = data[i];

    scratch.position.set(x, y, z);
    scratch.position.set(x, y, z);
    scratch.scale.set(s, s, s);

    // color
    scratchColor.set(colors[i]);
    scratchColor.toArray(colorArray, i * 3);
    attrib.needsUpdate = true;

    scratch.updateMatrix();
    mesh.setMatrixAt(i, scratch.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

const Geo = ({ data, layout, palette }) => {
  const meshRef = useRef();
  const attRef = useRef();
  const numInstances = data.length;

  const colors = useMemo(
    () => new Array(count).fill().map((_, i) => palette[i]),
    [palette]
  );

  const colorArray = useMemo(() => {
    const color = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      scratchColor.toArray(color, i * 3);
    }
    return color;
  }, [colors]);

  // run the layout, animating on change
  useAnimatedLayout({
    data,
    layout,
    onFrame: () => {
      updateInstancedMeshMatrices({
        mesh: meshRef.current,
        data,
        attrib: attRef.current,
        colors,
        colorArray,
      });
    },
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numInstances]}
      frustumCulled={false}
    >
      <sphereBufferGeometry attach="geometry" args={[0.3, 12, 12]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          ref={attRef}
          args={[colorArray, 3]}
        />
      </sphereBufferGeometry>
      {/* <meshLambertMaterial attach="material" color="hotpink" /> */}
      <meshLambertMaterial
        attach="material"
        vertexColors={THREE.VertexColors}
      />
    </instancedMesh>
  );
};

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
  const [layout, setLayout] = useState("spiral");
  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const [isOther, setIsOther] = useState(false);

  const palette = chroma
    .scale([dark ? "#61A7F3" : "#464889", dark ? "#E3685F" : "#E3685F"])
    .mode("hsl")
    .colors(count);

  const options = [
    // {
    //   name: "spiral",
    //   txt: "Spiral",
    //   txt_es: "Espiral",
    // },
    {
      name: "sk",
      txt: "Saff & Kuijlaars",
      txt_es: "Saff y Kuijlaars",
    },
    {
      name: "golden",
      txt: "Golden ratio",
      txt_es: "Proporción áurea",
    },
    {
      name: "pack",
      txt: "Icosahedral",
      txt_es: "Icosaédrico",
    },
    {
      name: "sphereRandom",
      txt: "Random",
      txt_es: "Aleatorio",
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <div className="overSpheres">
        {layout === "spiral" && (
          <h4 className="blinkSelect">{isEnglish ? "Select distribution" : "Selecciona distribución"}</h4>
        )}
        {options.map((x) => {
          return (
            <h5
              key={`select-${x.name}`}
              style={{
                opacity: x.name === layout ? 1 : 0.5,
                transition: "400ms opacity",
                willChange: "opacity",
              }}
              onClick={() => setLayout(x.name)}
            >
              {isEnglish ? x.txt : x.txt_es}
            </h5>
          );
        })}
      </div>

      <Canvas
        // colorManagement
        pixelRatio={window.devicePixelRatio || 1}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 45], near: 0.01, far: 90, zoom: 1 }}
      >
        <Geo
          data={data}
          layout={layout}
          isOther={isOther}
          setIsOther={setIsOther}
          palette={palette}
          dark={dark}
        />

        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.55} />
        <fog attach="fog" args={[dark ? "#1A1B1E" : "white", 15, 70]} />
        <Trackball />
      </Canvas>
    </div>
  );
};
