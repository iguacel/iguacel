import React, { useRef, useState, useContext } from "react";
// Context
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
// R3F
import {
  Canvas,
  useFrame,
  useUpdate,
  extend,
  useThree,
} from "react-three-fiber";
// Lines
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
// Hooks
import useInterval from "../hooks/useInterval";
import { usePrevious } from "../hooks/usePrevious";
// Spring
import { Spring, animated } from "react-spring/renderprops";
import { interpolate as interpolateFlubber } from "flubber";
// css
import "./css/cosmo.css";

// Extend lines
extend({ LineMaterial, LineGeometry, Line2 });

// GLOBALS
const depth = 70;
const scale = 0.3;

// Duct tape alert. MainCanvas updates this variable inside the game loop, Text component sets it to state inside an useInterval.

let visible = "";

export default function () {
  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const colors = {
    main: "white",
    green: "#53A88A",
    yellow: "#ECCA2F",
    red: "#E55F25",
    blue: "#4170AE",
    purple: "#8E6BA6",
    directionalRight: "#FFFFFF",
    directionalLeft: "gray",
    ambient: dark ? "#FFFFFF" : "#DBE7E5",
    fog: dark ? "#1A1B1E" : "#FFFFFF",
    line: dark ? "#3F3F3F" : "#DBE7E5",
  };

  const elements = [
    {
      data: {
        order: 1,
        index: 0,
        name: "Cube",
        name_es: "Cubo",
        element: "Earth",
        element_es: "Tierra",
        planet: ["Saturn", "Jupiter"],
        planet_es: ["Saturno", "Júpiter"],
        faces: 6,
        vertices: 8,
        edges: 12,
        angle: 90,
        color: colors.green,
      },
      children: <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />,
    },
    {
      data: {
        order: 2,
        index: 1,
        name: "Tetrahedron",
        name_es: "Tetraedro",
        element: "Fire",
        element_es: "Fuego",
        planet: ["Jupiter", "Mars"],
        planet_es: ["Júpiter", "Marte"],
        faces: 4,
        vertices: 4,
        edges: 6,
        angle: 60,
        color: colors.red,
      },
      children: <tetrahedronBufferGeometry attach="geometry" args={[10, 0]} />,
    },
    {
      data: {
        order: 3,
        index: 2,
        name: "Dodecahedron",
        name_es: "Dodecaedro",
        element: "Aether",
        element_es: "Éter",
        planet: ["Mars", "Earth"],
        planet_es: ["Marte", "Tierra"],
        faces: 12,
        vertices: 20,
        edges: 30,
        angle: 108,
        color: colors.purple,
      },
      children: <dodecahedronBufferGeometry attach="geometry" args={[10, 0]} />,
    },
    {
      data: {
        order: 4,
        index: 3,
        name: "Icosahedron",
        name_es: "Icosaedro",
        element: "Water",
        element_es: "Agua",
        planet: ["Earth", "Venus"],
        planet_es: ["Tierra", "Venus"],
        faces: 20,
        vertices: 12,
        edges: 30,
        angle: 60,
        color: colors.blue,
      },
      children: <icosahedronBufferGeometry attach="geometry" args={[10, 0]} />,
    },
    {
      data: {
        order: 5,
        index: 4,
        name: "Octahedron",
        name_es: "Octaedro",
        element: "Air",
        element_es: "Aire",
        planet: ["Venus", "Mercury"],
        planet_es: ["Venus", "Mercurio"],
        faces: 8,
        vertices: 6,
        edges: 12,
        angle: 60,
        color: colors.yellow,
      },
      children: <octahedronGeometry attach="geometry" args={[10, 0]} />,
    },
  ];

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
      }}
    >
      <div className="wCanvas" style={{ height: "50vh", width: "100%" }}>
        <MainCanvas elements={elements} colors={colors} />
      </div>

      <div
        className="wSvg"
        style={{
          height: "50vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexAlign: "center",
        }}
      >
        <Text
          isEnglish={isEnglish}
          colors={colors}
          elements={elements}
          colors={colors}
          isEnglish={isEnglish}
        />
      </div>
    </div>
  );
}

const MainCanvas = ({ elements, colors }) => {
  return (
    <Canvas
      colorManagement
      pixelRatio={window.devicePixelRatio || 1}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 75, near: 0.1, far: 2000 }}
    >
      {elements.map((x) => {
        return (
          <Shell
            key={`element${x.data.name}`}
            children={x.children}
            order={x.data.order}
            color={x.data.color}
            colors={colors}
            elements={elements}
            data={x.data}
          />
        );
      })}

      <Dolly elements={elements} />

      <fog attach="fog" name="near" args={[colors.fog, 20, 0]} />
      <Lights colors={colors} />
    </Canvas>
  );
};

const Shell = ({ children, order, color, colors, data }) => {
  const ref = useRef();
  useFrame(({ camera }) => {
    ref.current.rotation.x += 0.06;
    ref.current.rotation.z += 0.01;

    // Visible poly
    if (
      camera.position.z > -depth * order &&
      camera.position.z < -depth * (order - 1)
    ) {
      // Updates global let
      visible = data;
    }
  });

  return (
    <>
      <group ref={ref} position={[0, 0, order * -depth]}>
        <mesh scale={[scale, scale, scale]}>
          {children}
          <meshPhongMaterial
            attach="material"
            color={color}
            flatShading={true}
          />
        </mesh>
        <CircleShape colors={colors} />
      </group>
    </>
  );
};

const CircleShape = ({ segmentCount = 62, radius = 15, colors }) => {
  const { size } = useThree();
  const refLine = useUpdate((geom) => {
    let vertices = new Array(segmentCount).fill(0).reduce((acc, _, i, arr) => {
      const theta = (i / segmentCount) * Math.PI * 2;

      // Last point. Closes the path
      if (i === arr.length - 1) {
        acc = [
          ...acc,
          Math.cos(theta) * radius,
          Math.sin(theta) * radius,
          0,
          Math.cos(Math.PI * 2) * radius,
          Math.sin(Math.PI * 2) * radius,
          0,
        ];
      }

      acc = [...acc, Math.cos(theta) * radius, Math.sin(theta) * radius, 0];

      return acc;
    }, []);

    geom.setPositions(vertices);
  }, []);

  return (
    <line2>
      <lineGeometry attach="geometry" ref={refLine} />
      <lineMaterial
        attach="material"
        color={colors.line}
        linewidth={4}
        resolution={[size.width, size.height]}
      />
    </line2>
  );
};

const Lights = ({ colors }) => {
  return (
    <>
      <directionalLight
        position={[10, 10, 0]}
        color={colors.directionalRight}
      />
      <directionalLight
        position={[-10, -10, -10]}
        color={colors.directionalLeft}
      />
      <ambientLight color={colors.ambient} />
    </>
  );
};

const Dolly = ({ elements }) => {
  let speed = 40;
  let initialZ = 0;
  let finalZ = -elements.length * depth;

  let z = initialZ;
  let zRef = useRef(z);

  // From position initialZ to finalZ. Uses zRef
  useFrame(({ clock, camera }) => {
    if (zRef.current > finalZ) {
      zRef.current = initialZ - clock.getElapsedTime() * speed;
    } else {
      zRef.current = initialZ;
      clock.stop();
      clock.start();
    }

    // Update matrix
    camera.updateProjectionMatrix(void (camera.position.z = zRef.current));
  });
  return null;
};

// TEXT COMPONENT

const Text = ({ elements, isEnglish, colors }) => {
  const [visibleSt, setVisibleSt] = useState(elements[0].data);

  useInterval(() => {
    if (visible.index !== visibleSt) {
      setVisibleSt(visible);
    }
  }, [60]);

  const { name, name_es, planet, planet_es, element, element_es } = visibleSt;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexFlow: "column",
        zIndex: 3,
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="info"
        style={{
          height: "50vh",
          width: "100%",
          padding: "1em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {visibleSt && (
          <>
            <div className="center">
              <h3 className="pm" style={{ marginTop: "60px" }}>
                {isEnglish ? name : name_es}
              </h3>

              <p>
                <span className="spanStyle" style={{ opacity: 0.5 }}>
                  {isEnglish ? element : element_es}
                </span>
              </p>
            </div>
            <div className="center">
              <h4 className="pm">
                {isEnglish ? "You are here" : "Estás aquí"}
              </h4>
              <p>
                <span style={{ opacity: 0.5 }}>
                  {isEnglish ? "Between " : "Entre "}
                </span>
                <span className="spanStyle">
                  {isEnglish ? planet[0] : planet_es[0]}
                </span>
                <span style={{ opacity: 0.5 }}>
                  {" "}
                  {isEnglish ? " and " : " y "}
                </span>
                <span className="spanStyle">
                  {isEnglish ? planet[1] : planet_es[1]}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      <div
        className="info"
        style={{
          width: "100%",
          padding: "0 1em 0 1em",
        }}
      >
        <SvgComp colors={colors} visibleSt={visibleSt} isEnglish={isEnglish} />
      </div>
    </div>
  );
};

const SvgComp = ({ visibleSt, colors, isEnglish }) => {
  const { faces, edges, vertices } = visibleSt;

  const strokeWidth = 5;

  // Resets the spring
  const prevVisibleSt = usePrevious(visibleSt);

  const polys = [
    { id: "f1_cube", d: "M89.6 89.1h320.8v320.8H89.6z" },
    { id: "f2_tetra", d: "M250 98.6L121.3 321.5h257.4z" },
    {
      id: "f3_dodeca",
      d:
        "M270.7 185.6h-41.4l-33.4 24.3-12.8 39.4 12.8 39.3 33.4 24.3h41.4l33.4-24.3 12.8-39.3-12.8-39.4z",
    },
    { id: "f4_hepta", d: "M250 192.1l-52.8 38.3 20.2 62.1h65.2l20.2-62.1z" },
    {
      id: "f5_octa",
      d: "M249.971 209.111l39.103 39.103-39.103 39.103-39.103-39.103z",
    },
  ];

  const circles = [
    { id: "c1_saturn", r: 230 },
    { id: "c2_jupiter", r: 155 },
    { id: "c2_mars", r: 72 },
    { id: "c4_earth", r: 60 },
    { id: "c5_venus", r: 43 },
    { id: "c6_mercury", r: 25 },
  ];

  const interpolatorMainPath = interpolateFlubber(
    polys[visibleSt.index ? visibleSt.index - 1 : 4].d,
    polys[visibleSt.index ? visibleSt.index : 0].d
  );

  return (
    <div
      className="center"
      style={{
        maxWidth: "250px",
        margin: "0 auto",
      }}
    >
      <svg
        version="1.1"
        id="solids"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        xmlSpace="preserve"
        style={{ width: "100%" }}
      >
        {/* Circles */}
        {circles.map((x) => {
          return (
            <circle
              key={x.id}
              fill="none"
              stroke={colors.line}
              strokeWidth={strokeWidth}
              strokeMiterlimit={10}
              cx={250}
              cy={250}
              r={x.r}
            />
          );
        })}

        {/* Polys */}
        {polys.map((x) => {
          return (
            <path
              key={x.id}
              fill="none"
              stroke={colors.line}
              strokeWidth={strokeWidth}
              strokeMiterlimit={10}
              d={x.d}
            />
          );
        })}

        {/* Spring */}
        {visibleSt?.order && (
          <Spring
            reset={prevVisibleSt?.order !== visibleSt?.order}
            native
            from={{
              t: 0,
            }}
            to={{
              t: 1,
            }}
          >
            {({ t }) => (
              <>
                <animated.path
                  d={t.interpolate(interpolatorMainPath)}
                  fill={visibleSt.color}
                  style={{ transition: "fill 700ms" }}
                />
                {/* Inside */}
                <animated.circle
                  fill="none"
                  stroke="var(--foreground-color)"
                  strokeWidth={strokeWidth - 2}
                  strokeMiterlimit={10}
                  cx={250}
                  cy={250}
                  opacity={t}
                  r={visibleSt.order && circles[visibleSt.order].r}
                />
                {/* Outside */}
                <animated.circle
                  fill="none"
                  stroke="var(--foreground-color)"
                  strokeWidth={strokeWidth - 2}
                  strokeMiterlimit={10}
                  cx={250}
                  cy={250}
                  opacity={t}
                  r={visibleSt.order && circles[visibleSt.order - 1].r}
                />
              </>
            )}
          </Spring>
        )}
      </svg>

      <div className="hideHeight">
        <p className="pm">
          <span style={{ opacity: 0.5 }}>
            {isEnglish ? "Faces: " : "Caras: "}
          </span>
          <span className="spanStyle">{faces}</span>
        </p>

        <p className="pm">
          <span style={{ opacity: 0.5 }}>
            {isEnglish ? "Edges: " : "Aristas: "}
          </span>
          <span className="spanStyle">{edges}</span>
        </p>

        <p className="pm">
          <span style={{ opacity: 0.5 }}>
            {isEnglish ? "Vertices: " : "Vértices: "}
          </span>
          <span className="spanStyle">{vertices}</span>
        </p>
      </div>
    </div>
  );
};
