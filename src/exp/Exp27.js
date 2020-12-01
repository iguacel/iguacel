import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { csvParse } from "d3-dsv";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  useThree,
  useUpdate,
  extend,
} from "react-three-fiber";
import { Html, MapControls } from "drei";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
import lines from "../data/population/lines";

import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";

import { colors } from "../data/population/palettes";
import dataPop from "../data/population/centroids2";

extend({ LineMaterial, LineGeometry, Line2 });

const _object = new THREE.Object3D();
const _color = new THREE.Color();

const xMax = 355;
const yMax = 134;

const getColor = (code) => {
  const { color } = dataPop[`c${code}`];
  return colors[color];
};

// Linting
var glsl = (a, ...bb) =>
  a
    .map((x, i) => [x, bb[i]])
    .flat()
    .join("");

//	VERTEX
//  VERTEX
//  VERTEX
const vertexShader = glsl`
uniform float time;

varying vec2 vUv;
varying vec4 vPosition;
uniform vec2 pixels;

attribute vec3 color;
varying vec3 c;

void main() {
  vUv = uv;
  c = color;

  vec4 mvPosition = vec4( position, 1.0 );
  #ifdef USE_INSTANCING

  mvPosition = instanceMatrix * mvPosition;
  #endif

  gl_Position = projectionMatrix * modelViewMatrix * mvPosition;
}
`;

//	FRAG
//  FRAG
//  FRAG
const fragmentShader = glsl`

uniform float time;
uniform float progress;
uniform bool dark;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
varying vec4 vPosition;
varying vec3 c;

void main() {
  float width = 0.01;
  float prec = 0.3;

  // Border = step(vUv.x, width);

  float borderX = max(
  smoothstep(width + prec, width - prec, vUv.x),
  smoothstep(width + prec, width - prec, 1. - vUv.x)
  );

  float borderY = max(
  smoothstep(width + prec, width - prec, vUv.y),
  smoothstep(width + prec, width - prec, 1. - vUv.y)
  );

  // 1 on the border, 0 else
  float border = max(borderX, borderY);

  vec3 borderColor = vec3(0.,0.,0.);
  vec3 fillColor = c;

  vec3 finalColor = mix(fillColor, borderColor, border / 4.);

	gl_FragColor = vec4(finalColor,1.);
}
`;

const Instanced = ({
  dark,
  count,
  data,
  selected,
  changeSelected,
  isEnglish,
}) => {
  const [hovered, set] = useState();
  const mesh = useRef();
  const previous = useRef();

  const mousePos = new THREE.Vector3();

  const tooltip = useRef();

  useEffect(() => void (previous.current = hovered), [hovered]);

  const uniforms = useMemo(
    () => ({
      time: { type: "float", value: 0 },
      dark: { type: "boolean", value: true },
      resolution: {
        type: "v4",
        value: new THREE.Vector4(),
      },
    }),
    []
  );

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        data.flatMap((d, i) => _color.set(getColor(d.CountryCode)).toArray())
      ),
    [data]
  );

  useFrame((state) => {
    // Tooltip
    const x = THREE.MathUtils.clamp(state.mouse.x, -0.75, 0.75);
    const y = THREE.MathUtils.clamp(state.mouse.y, -0.55, 0.55);

    const vector = mousePos.set(x, y, 0.5);

    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const targetZ = 0;
    const distance = (targetZ - state.camera.position.z) / dir.z;
    const pos = state.camera.position.clone().add(dir.multiplyScalar(distance));

    tooltip.current.position.copy(pos);

    // Loop
    const time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.time.value = time;
    mesh.current.material.uniforms.dark.value = dark;

    data.forEach((d, i) => {
      _object.position.set(+d.X - xMax / 2, +d.Y - yMax / 2, 0);

      // Color
      if (hovered !== previous.current) {
        _color
          .set(
            d.CountryCode === hovered
              ? dark
                ? "white"
                : "silver"
              : getColor(d.CountryCode)
          )
          .toArray(colorArray, i * 3);

        mesh.current.geometry.attributes.color.needsUpdate = true;
      }

      // Scale
      const scale = 1;
      _object.scale.set(scale, scale, scale);
      _object.updateMatrix();
      mesh.current.setMatrixAt(i, _object.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={mesh}
        args={[null, null, count]}
        onPointerMove={(e) => set(data[e.instanceId]?.CountryCode)}
        onPointerOut={(e) => set(null)}
        onClick={(e) => changeSelected(e)}
      >
        <planeBufferGeometry attach="geometry" args={[1, 1, 1]}>
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </planeBufferGeometry>

        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms,
              vertexShader: vertexShader,
              fragmentShader: fragmentShader,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </instancedMesh>

      <mesh ref={tooltip} style={{ pointerEvents: "none" }}>
        <Html style={{ pointerEvents: "none" }}>
          <div
            style={{
              transform: "translate3d(-100px,40px,0)",
              opacity: hovered ? 1 : 0,
              width: "200px",
              height: "auto",
              pointerEvents: "none",
              background: "var(--background-color)",
              border: "1px solid var(--foreground-color)",
              color: "var(--foreground-color)",
              transition: "all 200ms",
              position: "absolute",
              top: 0,
              left: 0,
              padding: "0.5em 1em",
            }}
          >
            <h4
              style={{
                color: hovered ? getColor(hovered) : "",
                transition: "color 60ms",
              }}
            >
              {isEnglish
                ? dataPop[`c${hovered}`]?.name
                : dataPop[`c${hovered}`]?.nombre}
            </h4>

            <p
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {isEnglish ? "Pop:" : "Pob:"}
              <strong style={{ marginLeft: "auto" }}>
                {(dataPop[`c${hovered}`]?.pop
                  ? dataPop[`c${hovered}`]?.pop * 1000
                  : "0"
                ).toLocaleString()}
              </strong>
            </p>

            <p>
              <span
                style={{
                  color: hovered ? getColor(hovered) : "",
                  transition: "color 60ms",
                }}
              >
                ■
              </span>
              <strong> {dataPop[`c${hovered}`]?.count}</strong>{" "}
              {isEnglish ? "square" : "cuadrado"}
              {dataPop[`c${hovered}`]?.count > 1 ? "s" : ""}
            </p>
          </div>
        </Html>
      </mesh>
    </>
  );
};

const Lines = ({ dark }) => {
  return (
    <>
      {lines.map((x, i) => {
        return (
          <LineShape
            key={`line${i}`}
            line={x}
            color={dark ? colors.lines.dark : colors.lines.light}
          />
        );
      })}
    </>
  );
};

export default () => {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState();

  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const changeSelected = (e) => {
    setSelected(data[e.instanceId].CountryCode);
  };

  useEffect(() => {
    const fetchData = () => {
      const uri =
        "https://raw.githubusercontent.com/mattdzugan/World-Population-Cartogram/master/data/year_2018__cell_500k/squares/cells.csv";
      fetch(uri)
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((text) => {
          setData(csvParse(text));
          setIsLoaded(true);
        });
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        cursor: "pointer",
      }}
    >
      <Canvas
        pixelRatio={window.devicePixeRatio}
        camera={{ position: [0, 0, 100] }}
      >
        <Lines dark={dark} />

        {isLoaded && (
          <Instanced
            data={data}
            count={data?.length}
            dark={dark}
            selected={selected}
            changeSelected={changeSelected}
            isEnglish={isEnglish}
          />
        )}

        <MapControls />
      </Canvas>
    </div>
  );
};

const LineShape = ({ line, width = 1, color = "#544E4B" }) => {
  const { size } = useThree();

  const material = useRef();
  const lineRef = useRef();

  const ref = useUpdate((geom) => {
    geom.setPositions(line);
    material.current.defines.USE_DASH = "";
    lineRef.current.computeLineDistances();
  }, []);

  return (
    <line2 ref={lineRef}>
      <lineGeometry attach="geometry" ref={ref} />
      <lineMaterial
        ref={material}
        attach="material"
        color={color}
        linewidth={width}
        resolution={[size.width, size.height]}
        dashed={true}
        dashSize={0.5}
        gapSize={0.5}
        dashScale={1}
      />
    </line2>
  );
};
