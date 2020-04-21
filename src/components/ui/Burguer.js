import React, { useState } from "react";
import "../ui_styles/burguer.css";
import { useSpring, animated } from "react-spring";
import pageviews from "../../utils/pageviews";
// Sound imports
import useSound from "use-sound";
import burguerSound from "../sound/burguer.mp3";
import { volume } from "../sound/volume";

const Burguer = () => {
  const [on, toggle] = useState(false);

  const animation = useSpring({
    width: on ? "180px" : "32px",
    height: on ? "100px" : "34px",
    opacity: on ? 1 : 0,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const [playBurguer] = useSound(burguerSound, { volume });

  return (
    <>
      <div className="burguer-wrapper">
        <div className="navSquares n1"></div>
        <div className="navSquares n2"></div>
        <div className="navSquares n3"></div>
        <div className="navSquares n4"></div>
      </div>

      <animated.div
        onClick={() => {
          toggle(!on);
          playBurguer();
          pageviews(`burguer`);
        }}
        className="modal"
        style={{
          ...animation,
        }}
      >
        <div className="modalContent">
          <div className="name">
            <h1
              style={{
                fontSize: "1.2em",
                lineHeight: "1.2em",
                letterSpacing: "0.02em",
              }}
            >
              Iguacel
            </h1>
          </div>

          <div className="social">
            <a
              href="https://github.com/iguacel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://twitter.com/infoiguacel?lang=es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Burguer;
