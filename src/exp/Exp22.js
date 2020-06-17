import React, { useState, useEffect, useContext } from "react";
import useSound from "use-sound";
import LanguageContext from "../context/LanguageContext";
import { useSpring, animated } from "react-spring-9";

import white from "../data/noise/mp3/white.mp3";
import pink from "../data/noise/mp3/pink.mp3";
import brownian from "../data/noise/mp3/brownian.mp3";
import blue from "../data/noise/mp3/blue.mp3";
import purple from "../data/noise/mp3/purple.mp3";
import gray from "../data/noise/mp3/gray.mp3";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const interp = (i) => (r) =>
  `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

const colors = {
  white: {
    name: "white",
    name_es: "blanco",
    hex: "var(--foreground-color)",
    file: white,
    volume: 0.3,
  },
  pink: {
    name: "pink",
    name_es: "rosa",
    hex: "#E767A4",
    file: pink,
    volume: 0.1,
  },
  brownian: {
    name: "brownian",
    name_es: "rojo",
    hex: "#E24139",
    file: brownian,
    volume: 0.4,
  },
  blue: {
    name: "blue",
    name_es: "azul",
    hex: "#4575BC",
    file: blue,
    volume: 0.3,
  },
  purple: {
    name: "purple",
    name_es: "violeta",
    hex: "#662F8D",
    file: purple,
    volume: 0.3,
  },
  gray: {
    name: "gray",
    name_es: "gris",
    hex: "#bcbcc0",
    file: gray,
    volume: 0.7,
  },
};

export default function () {
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "repeat(8, 1fr)",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="empty"></div>
      {Object.entries(colors).map(([key, value]) => {
        return (
          <Color
            key={key}
            color={value.name}
            color_es={value.name_es}
            isEnglish={isEnglish}
            hex={value.hex}
            file={value.file}
            volume={value.volume}
          />
        );
      })}
    </div>
  );
}

const Color = ({ color, color_es, isEnglish, hex, file, volume }) => {
  const [on, toggle] = useState(false);

  const [playSound, { stop }] = useSound(file, {
    volume: volume,
    loop: true,
    interrupt: true,
  });

  useEffect(() => {
    if (on) {
      playSound();
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [on]);

  // Animation
  const props = useSpring({
    to: { radians: 2 * Math.PI },
    from: { radians: 0 },
    loop: true,
    config: { duration: 3500 },
  });

  return (
    <div
      onClick={() => {
        toggle(!on);
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: -4, left: 30, zIndex: 1 }}>
        {!on && <p>{isEnglish ? color : color_es}</p>}
      </div>

      {items.map((i) => (
        <animated.div
          key={`${color}-${i}`}
          style={{
            transform: on ? props.radians.interpolate(interp(i)) : "",
            width: "10%",
            height: "50%",
            backgroundColor: hex,
            willChange: "transform",
            transition: "transform 200ms",
          }}
        ></animated.div>
      ))}
    </div>
  );
};
