import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const navLinks = {
  padding: ".2em"
};

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const navAnimation = useSpring({
    transform: isNavOpen
      ? `translate3d(0,0,0) scale(1)`
      : `translate3d(100%,0,0) scale(0.8)`
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "RGBA(244, 244, 244, 0.80)",
        width: "100%",
        height: "100vh",
        padding: "2em",
        zIndex: 999
      }}
      className="navWrapper"
    >
      <button onClick={() => setNavOpen(!isNavOpen)}>MENU</button>
      <animated.nav
        style={{
          ...navAnimation,
          display: "flex",
          flexDirection: "column",
          padding: "1em",
          fontSize: "2.2em"
        }}
      >
        <a style={navLinks} href="#">
          Uno
        </a>
        <a style={navLinks} href="#">
          Dos
        </a>
        <a style={navLinks} href="#">
          Tres
        </a>
        <a style={navLinks} href="#">
          Cuatro
        </a>
        <a style={navLinks} href="#">
          Cinco
        </a>
        <a style={navLinks} href="#">
          Seis
        </a>
        <a style={navLinks} href="#">
          Siete
        </a>
        <a style={navLinks} href="#">
          Ocho
        </a>
      </animated.nav>
    </div>
  );
};

export default Nav;
