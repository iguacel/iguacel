import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import * as THREE from "three";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useUpdate,
} from "react-three-fiber";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import ThemeContext from "../context/ThemeContext";

import { csv } from "d3";
import { getAngleVector, getDistance } from "../utils/utils";

import { map, line } from "../data/mov/map.js";
import nov from "../data/mov/NOV.csv";
import centroids from "../data/mov/centroids.js";

// Pointer event polyfill cuz safari sux
import "pepjs";

import "./css/mov.css";

const nodes = 63000;

// Linting
var glsl = (a, ...bb) =>
  a
    .map((x, i) => [x, bb[i]])
    .flat()
    .join("");

const fragmentShader = glsl`
uniform float time;
uniform float progress;
uniform float vProgress;
varying vec4 vPosition;
varying float vAlpha;


  void main() {
    vec3 color = vec3(0.25,0.32,0.65);

    float dist = length(gl_PointCoord - vec2(0.5));
    float circle = 1. - smoothstep(0.49,0.5,dist);
    gl_FragColor = vec4(color,circle*vAlpha/1.5);
}`;

const vertexShader = glsl`
  uniform float time;

  attribute float angle;
  attribute float distance;
  attribute float offset;
  attribute float flow;

  varying float vAlpha;

  void main() {

    float current = mod(offset + time, distance);

    float pct = current/distance;
    vec3 newpos = position;

    newpos.x += cos(angle)*current;
    newpos.y += sin(angle)*current;

    vAlpha = 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(newpos, 1.);
    float f = flow / 120.;
    float d1 = 100.;
    float x1 = 0.1;
    float d2 = d1 * sqrt(f / x1);
    gl_PointSize = d2 / 100.;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

extend({ MapControls, LineMaterial, LineGeometry, Line2 });

const colors = {
  main: "white",
  shape: "#0B0D11",
  bgDark: "#1C2230",
  bgLight: "#262F42",
  lines: "#404040",
};

function Shader({ data }) {
  const ref = useRef();

  const shader = useMemo(
    () => ({
      extensions: "#extension GL_OES_standard_derivatives : enable",
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      fragmentShader,
      vertexShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    }),
    []
  );

  let positions = useMemo(() => new Float32Array(nodes * 3), []);

  let angle = new Float32Array(nodes);
  let distance = new Float32Array(nodes);
  let offset = new Float32Array(nodes);
  let flow = new Float32Array(nodes);

  data.forEach((x, i) => {
    const { o, d, f } = x;
    const [lngO, latO] = centroids[`c${o}`];
    const [lngD, latD] = centroids[`c${d}`];

    const pos = [lngO, latO, 0];
    const ang = [getAngleVector({ x: lngO, y: latO }, { x: lngD, y: latD })];
    const dis = [
      getDistance({ x: lngO, y: latO }, { x: lngD, y: latD }) > 0
        ? getDistance({ x: lngO, y: latO }, { x: lngD, y: latD })
        : 0.1,
    ];

    positions.set(pos, 3 * i);

    angle.set(ang, i);

    distance.set(dis, i);

    offset.set([Math.random()], i);

    flow.set([f], i);
  });

  const refMaterial = useRef();
  const refGeo = useRef();

  useFrame((state) => {
    // Geo
    refGeo.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    refGeo.current.setAttribute("angle", new THREE.BufferAttribute(angle, 1));

    refGeo.current.setAttribute(
      "distance",
      new THREE.BufferAttribute(distance, 1)
    );

    refGeo.current.setAttribute("offset", new THREE.BufferAttribute(offset, 1));

    refGeo.current.setAttribute("flow", new THREE.BufferAttribute(flow, 1));

    // Material
    refMaterial.current.uniforms.time.value = state.clock.getElapsedTime() * 10;
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry" ref={refGeo} />
      <shaderMaterial attach="material" ref={refMaterial} {...shader} />
    </points>
  );
}

export default () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { dark } = useContext(ThemeContext);

  const [visible, setVisible] = useState({ data: null, meta: null });

  useEffect(() => {
    csv(nov).then((data) => {
      setVisible({
        data: data,
        meta: {
          id: "noviembre",
          date: "Noviembre 2019",
          num: 26090,
          max: 36943,
        },
      });
    });
  }, []);

  return (
    <div className="mov">
      <Canvas
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        orthographic={true}
        camera={{ position: [0, 0, 500] }}
      >
        <color
          attach="background"
          args={[dark ? colors.bgDark : colors.bgLight]}
        />

        <Map />

        {visible.data && <Shader data={visible.data} />}

        <MapCon />
      </Canvas>
    </div>
  );
};

const Map = () => {
  return (
    <>
      {map.map((x) => {
        return <ExtrudeShape data={x} key={`extrude${x.name}`} />;
      })}
      <LineShape data={line} />
    </>
  );
};

const LineShape = ({ data, width = 1, color = "gray" }) => {
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
        linewidth={width}
        resolution={[size.width, size.height]}
      />
    </line2>
  );
};

const ExtrudeShape = ({ data }) => {
  const extrudeSettings = {
    // steps: 1,
    // depth: 1,
    bevelEnabled: false,
  };

  var geoPoints = [];

  data.points.forEach((x) => {
    geoPoints.push(new THREE.Vector2(x[0], x[1]));
  });

  var pathShape = useMemo(() => new THREE.Shape(geoPoints), [geoPoints]);

  return (
    <mesh position={[0, 0, 0]} castShadow>
      <extrudeBufferGeometry
        attach="geometry"
        args={[[pathShape], extrudeSettings]}
      />
      <meshBasicMaterial attach="material" color={colors.shape} />
    </mesh>
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
      maxZoom={45}
      enableRotate={false}
      enableZoom={true}
      enablePan={true}
      screenSpacePanning={true}
    />
  );
};
