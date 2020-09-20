import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import * as THREE from "three";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useUpdate,
} from "react-three-fiber";
import { useTransition, animated } from "react-spring";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { getAngleVector, getDistance } from "../utils/utils";
import aeropuertos from "../data/aeropuertos/aeropuertos";
import ex from "../data/aeropuertos/ex";
import border from "../data/aeropuertos/border";
import Text from "./comp/Text";

// Pointer event polyfill cuz safari sux
import "pepjs";

import "./css/airports.css";

// Linting
var glsl = (a, ...bb) =>
  a
    .map((x, i) => [x, bb[i]])
    .flat()
    .join("");

const fragmentShader = glsl`
#define PI 3.14159265359

uniform float time;
uniform float progress;
uniform vec2 resolution;
uniform float vProgress;
varying vec4 vPosition;
varying vec2 vUv;
varying float vAlpha;
varying float vAngle;

mat2 rotate(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
// Based on https://www.shadertoy.com/view/4sSSzG
// Via
// Book of shaders
// https://thebookofshaders.com/

float triangle (vec2 st,
  vec2 p0,
  vec2 p1,
  vec2 p2,
  float smoothness) {

vec3 e0, e1, e2;

e0.xy = normalize(p1 - p0).yx * vec2(+1.0, -1.0);
e1.xy = normalize(p2 - p1).yx * vec2(+1.0, -1.0);
e2.xy = normalize(p0 - p2).yx * vec2(+1.0, -1.0);

e0.z = dot(e0.xy, p0) - smoothness;
e1.z = dot(e1.xy, p1) - smoothness;
e2.z = dot(e2.xy, p2) - smoothness;

float a = max(0.0, dot(e0.xy, st) - e0.z);
float b = max(0.0, dot(e1.xy, st) - e1.z);
float c = max(0.0, dot(e2.xy, st) - e2.z);

return smoothstep(smoothness * 2.0,
  1e-7,
  length(vec3(a, b, c)));
}

  void main() {

    vec2 st = vec2(gl_PointCoord);

    st -= vec2(0.5);
    st = rotate( -vAngle -PI / 2.) * st;
    st += vec2(0.5);

    vec3 color = vec3(triangle(st,
      vec2(0.3,0.2),
      vec2(0.7,0.2),
      vec2(0.5,1.00),
      0.01)
    );

  gl_FragColor = vec4(color, vAlpha / 2.);
}`;

// Particles animation based on this live coding session by @akella (Yuri Artiukh)
// #s3e19 ALL YOUR HTML, Particles, trails, mouse
// https://youtube.com/watch?v=QGnQeHjNALg

const vertexShader = glsl`
  uniform float time;
  uniform vec2 resolution;

  attribute float angle;
  attribute float distance;
  attribute float offset;

  varying float vAlpha;
  varying float vAngle;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vAngle = angle;

    float traveled = mod(offset + time, distance);

    vec3 newpos = position;

    newpos.x += cos(angle)*traveled;
    newpos.y += sin(angle)*traveled;

    float percent = traveled / distance;

    vAlpha =  smoothstep(0.,0.1, percent) -
              smoothstep(0.9,1.,percent);

    vec4 mvPosition = modelViewMatrix * vec4(newpos, 1.);

    // float arrowSize = resolution.x < 780. ? 40. : 20.;

    float arrowSize = resolution.x < 780. ? 40. : 20.;

    gl_PointSize = vAlpha * arrowSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

extend({ MapControls, LineMaterial, LineGeometry, Line2 });

const colors = {
  main: "white",
  directionalRight: "white",
  directionalLeft: "white",
  ambient: "white",
  red: "#E32F4E",
  blue: "#4C5DAE",
  bgDark: "#1C2230",
  bgLight: "#262F42",
  line: "#B2B7BE",
  airport: "#D6D6D6",
  airportFade: "#404040",
};

function Shader({ selected, isSalidas }) {
  const { viewport } = useThree();

  const data = useMemo(
    () => ({
      extensions: "#extension GL_OES_standard_derivatives : enable",
      side: THREE.FrontSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
      },
      transparent: true,
      fragmentShader,
      vertexShader,
      depthWrite: false,
      depthTest: false,
      // wireframe: true,
      // wireframeLinewidth: 1,
      // clipping: true,
      blending: THREE.AdditiveBlending,
    }),
    []
  );

  // attributes
  let coordsSelected = aeropuertos[`c${selected}`]?.centroid;
  let nNodes =
    aeropuertos[`c${selected}`][isSalidas ? "salidas" : "llegadas"].length;

  let positions = useMemo(() => new Float32Array(nNodes * 3), [
    selected,
    isSalidas,
  ]);

  let angle = new Float32Array(nNodes);
  let distance = new Float32Array(nNodes);
  let offset = new Float32Array(nNodes);

  aeropuertos[`c${selected}`][isSalidas ? "salidas" : "llegadas"].forEach(
    ([cod, d], i) => {
      // Swap origin and destination
      const coordsOrigin = isSalidas
        ? coordsSelected
        : aeropuertos[`c${cod}`]?.centroid;

      const coordsDestination = isSalidas
        ? aeropuertos[`c${cod}`]?.centroid
        : coordsSelected;

      positions.set([coordsOrigin[0], coordsOrigin[1], 10], 3 * i);

      angle.set(
        [
          getAngleVector(
            { x: coordsOrigin[0], y: coordsOrigin[1] },
            { x: coordsDestination[0], y: coordsDestination[1] }
          ),
        ],
        i
      );

      distance.set(
        [
          getDistance(
            { x: coordsOrigin[0], y: coordsOrigin[1] },
            { x: coordsDestination[0], y: coordsDestination[1] }
          ),
        ],
        i
      );

      offset.set([1000 * Math.random()], i);
    }
  );

  const mesh = useRef();

  useFrame((state) => {
    // Geo
    mesh.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    mesh.current.geometry.setAttribute(
      "angle",
      new THREE.BufferAttribute(angle, 1)
    );

    mesh.current.geometry.setAttribute(
      "distance",
      new THREE.BufferAttribute(distance, 1)
    );

    mesh.current.geometry.setAttribute(
      "offset",
      new THREE.BufferAttribute(offset, 1)
    );

    // Material
    mesh.current.material.uniforms.time.value =
      state.clock.getElapsedTime() * 20;
    mesh.current.material.uniforms.resolution.value = [
      viewport.width,
      viewport.height,
    ];
  });

  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry" />
      <shaderMaterial attach="material" {...data} />
    </points>
  );
}

const Airport = ({
  position,
  cod,
  data,
  selected,
  setSelected,
  isSalidas,
  colors,
}) => {
  const mesh = useRef();
  const mesh2 = useRef();
  useFrame(() => {
    mesh2.current.position.z = 15;
    mesh.current.visible = false;
  });

  const show =
    selected === data.cod ||
    aeropuertos[`c${selected}`]?.[isSalidas ? "salidas" : "llegadas"]
      .join()
      .indexOf(cod) >= 0;

  return (
    <>
      <mesh
        ref={mesh}
        position={position}
        scale={[10, 10, 10]}
        onPointerDown={() => setSelected(cod)}
      >
        <planeBufferGeometry attach="geometry" args={[5, 5, 1, 1]} />
        <meshBasicMaterial attach="material" />
      </mesh>

      {data[isSalidas ? "salidas" : "llegadas"].map((x) => {
        const [cod, num] = x;
        const origen = aeropuertos[`c${data.cod}`]?.centroid;
        const destino = aeropuertos[`c${cod}`]?.centroid;
        if (destino) {
          return (
            <LineShape
              key={`c${data.cod}-${cod}`}
              data={[...origen, 10, ...destino, 10]}
              width={num / 100000 + 0.5}
              color={isSalidas ? colors.red : colors.blue}
              isSelected={selected === data.cod ? true : false}
              selected={selected}
            />
          );
        }
      })}

      <mesh
        ref={mesh2}
        position={position}
        scale={[1, 1, 1]}
        style={{ cursor: "pointer" }}
      >
        <Text
          color={show ? "white" : "gray"}
          fontSize={14}
          anchorX={16}
          anchorY={
            cod === "LCG" || cod === "AEI" || cod === "BIO" || cod === "TFN"
              ? -25
              : 10
          }
        >
          {cod}
        </Text>

        <boxBufferGeometry attach="geometry" args={[10, 10, 2, 1]} />
        <meshBasicMaterial
          // wireframe
          attach="material"
          color={show ? colors.airport : colors.airportFade}
        />
      </mesh>
    </>
  );
};

const Airports = ({ selected, setSelected, isSalidas, colors }) => {
  const depth = 10;

  return (
    <group>
      {Object.entries(aeropuertos).map(([_, value]) => {
        return (
          <Airport
            position={[value.centroid[0], value.centroid[1], depth]}
            cod={value.cod}
            key={`c${value.cod}`}
            data={value}
            selected={selected}
            isSalidas={isSalidas}
            setSelected={setSelected}
            colors={colors}
          />
        );
      })}
    </group>
  );
};

const LineShape = ({
  data,
  width = 1,
  color = colors.line,
  isSelected = true,
}) => {
  const { size } = useThree();

  const ref = useUpdate((geom) => {
    geom.setPositions(data);
  }, []);

  return (
    <line2>
      <lineGeometry attach="geometry" ref={ref} />
      <lineMaterial
        attach="material"
        color={color}
        linewidth={isSelected ? width : 0}
        resolution={[size.width, size.height]}
      />
    </line2>
  );
};

const ExtrudeShape = ({ data, colors }) => {
  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: true,
  };

  var geoPoints = [];

  data.points.forEach((x) => {
    geoPoints.push(new THREE.Vector2(x[0], x[1]));
  });

  var pathShape = useMemo(() => new THREE.Shape(geoPoints), []);

  return (
    <mesh position={[0, 0, 0]} castShadow>
      <extrudeBufferGeometry
        attach="geometry"
        args={[[pathShape], extrudeSettings]}
      />
      <meshLambertMaterial attach="material" color={colors.blue} />
    </mesh>
  );
};

export default function () {
  const [selected, setSelected] = useState("MAD");
  const [isSalidas, setIsSalidas] = useState(true);
  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

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
        position: "relative",
        background: dark ? colors.bgDark : colors.bgLight,
      }}
    >
      <Ui
        isEnglish={isEnglish}
        isSalidas={isSalidas}
        setIsSalidas={setIsSalidas}
        colors={colors}
        language={language}
        selected={selected}
      />

      <Canvas
        pixelRatio={window.devicePixelRatio}
        orthographic={true}
        camera={{ position: [0, 0, 500] }}
      >
        <color
          attach="background"
          args={[dark ? colors.bgDark : colors.bgLight]}
        />
        {/* MAP */}
        {ex.map((x) => {
          return (
            <ExtrudeShape colors={colors} data={x} key={`extrude${x.name}`} />
          );
        })}

        <Airports
          selected={selected}
          isSalidas={isSalidas}
          setSelected={setSelected}
          colors={colors}
        />

        <LineShape data={border} />

        <Shader selected={selected} isSalidas={isSalidas} />

        <MapCon />
        <Lights colors={colors} />
      </Canvas>
    </div>
  );
}

const Lights = ({ colors }) => {
  return (
    <>
      <directionalLight
        position={[10, 10, 0]}
        intensity={0.5}
        color={colors.directionalRight}
      />
      <directionalLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color={colors.directionalLeft}
      />
      <ambientLight color={colors.ambient} intensity={0.1} />
    </>
  );
};

const MapCon = () => {
  const controls = useRef();

  const { camera, gl } = useThree();

  var minPan = new THREE.Vector3(-350, -350, -350);
  var maxPan = new THREE.Vector3(350, 350, 350);
  var _v = new THREE.Vector3();

  useFrame((state) => {
    _v.copy(controls.current.target);
    controls.current.target.clamp(minPan, maxPan);
    _v.sub(controls.current.target);
    state.camera.position.sub(_v);
    controls.current.update();
  });

  return (
    <mapControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.3}
      minZoom={0.35}
      maxZoom={1.5}
      enableRotate={false}
      enableZoom={true}
      enablePan={true}
      screenSpacePanning={true}
    />
  );
};

const Ui = ({
  isSalidas,
  setIsSalidas,
  colors,
  isEnglish,
  language,
  selected,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 400,
        pointerEvents: "none",
      }}
      className="menuSalidas"
      onClick={() => setIsSalidas(!isSalidas)}
    >
      <h4
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          background: isSalidas ? colors.red : colors.blue,
          padding: ".5em 1em .5em 1em",
          borderRadius: "2em",
          transition: "background 800ms",
        }}
      >
        {isSalidas
          ? isEnglish
            ? "Departures"
            : "Salidas"
          : isEnglish
          ? "Arrivals"
          : "Llegadas"}
      </h4>

      {aeropuertos[`c${selected}`][isSalidas ? "salidas" : "llegadas"].length >
        0 && (
        <Marquee
          selected={selected}
          isSalidas={isSalidas}
          language={language}
          colors={colors}
        />
      )}

      {aeropuertos[`c${selected}`][isSalidas ? "salidas" : "llegadas"]
        .length === 0 && (
        <div
          style={{
            textAlign: "center",
            height: "50px",
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isEnglish ? "No flights" : "Sin vuelos"}
        </div>
      )}
    </div>
  );
};

const Marquee = ({ selected, isSalidas, language, colors }) => {
  const connections =
    aeropuertos[`c${selected}`][isSalidas ? "salidas" : "llegadas"].length;

  const [randomAirportIndex, setRandomAirportIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomAirportIndex(
        (randomAirportIndex) => (randomAirportIndex + 1) % connections
      );
    }, 1500);
    return () => clearInterval(interval);
  }, [connections, randomAirportIndex]);

  // Animation
  const slides = aeropuertos[`c${selected}`][
    isSalidas ? "salidas" : "llegadas"
  ].map((x, i) => {
    return {
      id: `${selected.cod}-${i}`,
      ...x,
    };
  });

  const transitions = useTransition(
    slides[randomAirportIndex] || slides[0],
    (item) => item.id,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

  return (
    <div
      style={{
        textAlign: "center",
        height: "50px",
        position: "relative",
      }}
    >
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div
            key={key}
            className="pm"
            href={item.href}
            hrefLang="en"
            target="_blank"
            title={item.title}
            rel="noopener noreferrer"
            style={{
              ...props,
              textDecoration: "none",
              fontWeight: "400",
              cursor: "pointer",
              width: "100px",
              whiteSpace: "normal",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textShadow: "0.5px 0.5px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span style={{ flex: "1 0 40%" }}>
                {aeropuertos[`c${selected}`].cod}
              </span>
              <span
                style={{
                  flex: "1 0 20%",
                  color: isSalidas ? colors.red : colors.blue,
                }}
              >
                {isSalidas ? " → " : " ← "}
              </span>
              <span style={{ flex: "1 0 40%" }}> {item[0]}</span>
            </p>

            <p
              style={{
                fontWeight: 400,
                width: "100%",
                margin: 0,
                padding: 0,
                fontFeatureSettings: "tnum",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item[1].toLocaleString(language.id)}
            </p>
          </animated.div>
        );
      })}
    </div>
  );
};
