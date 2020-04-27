import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import data from "../data/criterion-ar";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useTransition, useSpring, animated } from "react-spring";
import chroma from "chroma-js";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
import "./css/criterion.css";
import { randomInt } from "../utils/utils";

export default () => {
  const [refDiv, { width, height }] = useMeasure({ polyfill: ResizeObserver });
  const [isOpen, setIsOpen] = useState(false);

  // Views
  const [view, setView] = useState(0);
  const nViews = Object.keys(data).length;
  const selectedData = Object.values(data)[view];

  // Change views
  const nextView = useCallback(() => {
    setView((view) => (view + 1) % nViews);
    setIsOpen(false);
  }, []);

  const prevView = useCallback(() => {
    setView((view) => (view - 1 + nViews) % nViews);
    setIsOpen(false);
  }, []);

  const selectView = (v) => {
    setView(v);
    setIsOpen(false);
  };

  // Context
  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  // Colors
  const colors = {
    bg: dark ? "RGBA(32, 33, 36, 1.00)" : "RGBA(242, 242, 242, 1.00)",
    borders: dark ? "RGBA(255, 255, 255, 0.4)" : "RGBA(0, 0, 0, 0.4)",
    ratioBg: "var(--background-color)",
  };

  const palette = chroma
    .scale(["#61A7F3", "#B95AA4"])
    .mode("lch")
    .colors(nViews);

  return (
    <div
      ref={refDiv}
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Screen
        data={data}
        selectedData={selectedData}
        view={view}
        nViews={nViews}
        setIsOpen={setIsOpen}
        colors={colors}
        palette={palette}
        isEnglish={isEnglish}
        nextView={nextView}
        prevView={prevView}
      />

      <Modal
        selectView={selectView}
        view={view}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dark={dark}
        width={width}
        height={height}
        palette={palette}
      />

      <FilmGrain
        width={width}
        height={height}
        patternAlpha={25}
        blendMode={dark ? "screen" : "multiply"}
      />

      <Bg selectedData={selectedData} view={view} palette={palette} />
    </div>
  );
};

const Modal = ({ selectView, isOpen, setIsOpen, dark, view, palette }) => {
  const tipAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  });

  return (
    <>
      <animated.div
        onClick={() => setIsOpen(false)}
        style={{
          ...tipAnimation,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          background: dark
            ? "RGBA(26, 27, 30, 0.90)"
            : "RGBA(252, 252, 252, 0.90)",
          backdropFilter: "blur(10px)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isOpen && (
          <Menu view={view} selectView={selectView} palette={palette} />
        )}
      </animated.div>
    </>
  );
};

const Menu = ({ selectView, view, palette }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        flexWrap: "wrap",
      }}
    >
      {Object.entries(data).map(([key, value], index) => {
        const scale = 12;
        const [w, h] = value.aspect_ratio.split(":");

        return (
          <div
            onClick={() => selectView(index)}
            key={`menu${value.aspect_ratio}`}
            style={{
              display: "flex",
              alignItems: "center",
              width: "170px",
            }}
          >
            <div
              style={{
                flex: "55px 0 0",
              }}
            >
              <p className="numbers" style={{ fontSize: "80%" }}>
                {value.aspect_ratio}
              </p>
            </div>
            <div
              style={{ background: "#D4D1D4", flex: `${scale * 2.88}px 0 0` }}
            >
              <div
                style={{
                  height: `${scale * h}px`,
                  width: `${scale * w}px`,
                  background: index === view ? palette[view] : "gray",
                }}
              ></div>
            </div>

            <div
              style={{
                flex: "50px 0 0",
              }}
            >
              <p
                className="numbers"
                style={{
                  fontSize: "80%",
                  textAlign: "right",
                  fontWeight: "700",
                  paddingRight: "0.5em",
                }}
              >
                {value.nFilms}
              </p>
            </div>
            <div
              style={{
                flex: "12px 0 0",
              }}
            >
              <p
                className="numbers"
                style={{ fontSize: "80%", opacity: "0.8" }}
              >
                {value.nFilms > 1 ? "films" : "film"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ButtonGroup = ({
  setIsOpen,
  nextView,
  prevView,
  view,
  data,
  isEnglish,
  nViews,
}) => {
  const prevAr = Object.values(data)[(view - 1 + nViews) % nViews].aspect_ratio;
  const nextAr = Object.values(data)[(view + 1) % nViews].aspect_ratio;

  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
      }}
    >
      <div onClick={() => prevView()} className="buttonGroup prev">
        <span
          className="buttonGroup-ar numbers"
          style={{ paddingRight: "1em", fontSize: "80%" }}
        >
          {prevAr}
        </span>
        🡐
      </div>
      <div
        onClick={() => setIsOpen(true)}
        className="buttonGroup selectAspectRatio"
      >
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "70%",
            lineHeight: "1.5em",
          }}
        >
          {isEnglish ? "Select" : "Selecciona"} <br></br>aspect ratio
        </p>
      </div>
      <div onClick={() => nextView()} className="buttonGroup next">
        <span className={view === 0 ? "animationNext" : ""}>🡒</span>
        <span
          className="buttonGroup-ar numbers"
          style={{ paddingLeft: "1em", fontSize: "80%" }}
        >
          {nextAr}
        </span>
      </div>
    </div>
  );
};

const RandomFilm = ({ selectedData }) => {
  const [randomFilmIndex, setRandomFilmIndex] = useState(
    randomInt(0, selectedData.films.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomFilmIndex(
        (randomFilmIndex) => (randomFilmIndex + 1) % selectedData.films.length
      );
    }, 1500);
    return () => clearInterval(interval);
  }, [selectedData, randomFilmIndex]);

  // Animation
  const slides = selectedData.films.map((x) => {
    return {
      id: x.spine,
      ...x,
    };
  });

  const transitions = useTransition(
    slides[randomFilmIndex] || slides[0],
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
        height: "110px",
        position: "relative",
      }}
    >
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.a
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
              paddding: "1em",
              cursor: "pointer",
              whiteSpace: "normal",
              position: "absolute",
              width: "100%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="pm" style={{ fontWeight: 700 }}>
              {item.title}{" "}
              <span className="pm" style={{ fontWeight: 400 }}>
                ({item.year})
              </span>
            </p>

            <div>
              <p className="pm" style={{ fontWeight: 400 }}>
                {item.director}
              </p>
            </div>
          </animated.a>
        );
      })}
    </div>
  );
};

const FilmInfo = ({ selectedData, isEnglish }) => {
  return (
    <div
      className="center"
      style={{
        width: "100%",
        padding: "1em",
      }}
    >
      <h4 className="pm">
        {selectedData.nFilms} film{selectedData.nFilms > 1 ? "s" : ""}
      </h4>

      <p className="pm" style={{ fontWeight: 400 }}>
        (
        {selectedData.first === selectedData.last
          ? selectedData.first
          : `${selectedData.first}-${selectedData.last}`}
        )
      </p>

      <RandomFilm selectedData={selectedData} />

      <div className="hideMobile">
        <p
          className="pm center"
          style={{ fontWeight: 400, flex: "100px 1 1" }}
        >
          {isEnglish ? "B&W:" : "B/N"}{" "}
          <strong>{selectedData.nFilms - selectedData.color}</strong>
        </p>

        <p
          className="pm center"
          style={{ fontWeight: 400, flex: "100px 1 1" }}
        >
          Color: <strong>{selectedData.color}</strong>
        </p>
      </div>
    </div>
  );
};

const Bg = ({ selectedData, view, palette }) => {
  const [w, h] = selectedData.aspect_ratio.split(":");

  const bgH = (h / w) * 100;
  const maxW = (w / h) * 100;

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: `${bgH}vw`,
          maxHeight: "100vh",
          maxWidth: `${maxW}vh`,
          margin: "auto",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          background: palette[view],
          opacity: 0.5,
          transition: "all 600ms ease",
          willChange: "height, maxWidth, background",
          zIndex: -2,
        }}
      ></div>
    </>
  );
};

const Screen = ({
  selectedData,
  view,
  setIsOpen,
  colors,
  palette,
  isEnglish,
  nextView,
  prevView,
  width,
  nViews,
  data
}) => {
  const scale = width < 500 ? 80 : 92;
  const [w, h] = selectedData.aspect_ratio.split(":");

  return (
    <div>
      <div className="click" style={{ cursor: "pointer" }}>
        <div style={{ margin: "1em" }}>
          <h3 style={{ textAlign: "center" }}>
            {isEnglish ? selectedData.name : selectedData.name_es}
          </h3>
        </div>

        <ButtonGroup
          view={view}
          setIsOpen={setIsOpen}
          isEnglish={isEnglish}
          nextView={nextView}
          prevView={prevView}
          nViews={nViews}
          data={data}
        />

        <div
          onClick={() => setIsOpen(true)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                background: colors.bg,
                flex: `${scale * 2.88}px 0 0`,
                transition: "all 200ms ease-in",
                willChange: "flex, width, height",
              }}
            >
              <animated.div
                style={{
                  height: `${scale * h}px`,
                  width: `${scale * w}px`,
                  background: palette[view],
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 200ms ease-in",
                  willChange: "background flex",
                }}
              >
                <h2
                  className="pm numbers"
                  style={{
                    opacity: 0.8,
                    color:
                      chroma(palette[view]).get("lab.l") < 50
                        ? "white"
                        : "black",
                    fontSize: "140%",
                  }}
                >
                  {selectedData.aspect_ratio}
                </h2>
              </animated.div>
            </div>
          </div>
        </div>
      </div>

      <FilmInfo
        selectedData={selectedData}
        isEnglish={isEnglish}
      />
    </div>
  );
};


/// FILM GRAIN
const FilmGrain = ({
  width,
  height,
  patternAlpha = 255,
  blendMode = "screen",
}) => {
  let refCanvas = useRef();

  // https://codepen.io/zadvorsky/pen/PwyoMm
  let patternSize = 90;

  let patternPixelDataLength = patternSize * patternSize * 4;
  let patternCanvas;
  let patternCtx;
  let patternData;

  // create a canvas which will be used as a pattern
  function initGrain() {
    patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    patternCtx = patternCanvas.getContext("2d");
    patternData = patternCtx.createImageData(patternSize, patternSize);
  }

  // put a random shade of gray into every pixel of the pattern
  function update() {
    let value;

    for (let i = 0; i < patternPixelDataLength; i += 4) {
      value = (Math.random() * 255) | 0;

      patternData.data[i] = value;
      patternData.data[i + 1] = value;
      patternData.data[i + 2] = value;
      patternData.data[i + 3] = patternAlpha;
    }

    patternCtx.putImageData(patternData, 0, 0);
  }

  useEffect(() => {
    let canvas = refCanvas.current;
    let ctx = canvas.getContext("2d");

    // Scale
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);

    // Raf
    let requestId;

    // Animation
    const animation = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      initGrain();
      update();

      ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
      ctx.fillRect(0, 0, width, height);

      requestId = requestAnimationFrame(animation);
    };

    animation();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <canvas
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        mixBlendMode: blendMode,
      }}
      width={width}
      height={height}
      ref={refCanvas}
    />
  );
};
