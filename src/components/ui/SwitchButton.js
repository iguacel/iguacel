import React, { useContext } from "react";

import ThemeContext from "../../context/ThemeContext";
// Sound imports
import useSound from 'use-sound';
import { volume } from "../sound/volume";
import lightSound from '../sound/light.mp3';

import "../ui_styles/switch.css";

export default function SwitchButton() {
  const { dark, toggle } = useContext(ThemeContext);

  const [playLight] = useSound(lightSound,
    { volume });


  return (
    <div className="switch-wrapper">

      <label className="switch">
        <input
          type="checkbox"
          id="togBtn"
          onChange={() => {
            toggle();
            playLight();
          }}
          defaultChecked={true}
        />
        <div
          className="slider round"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <svg
            className="sun-icon"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 32 32"
            aria-hidden="true"
            style={{
              willChange: "fill",
              fill: "var(--foreground-color)",
              marginLeft: "4px"
            }}
          >
            <path d="M18.4 10.2l6.9-3.4-3.5 6.8 7.3 2.4-7.3 2.4 3.4 6.9-6.8-3.5-2.4 7.3-2.4-7.3-6.9 3.4 3.5-6.8L2.9 16l7.3-2.4-3.4-6.9 6.8 3.5L16 2.9z" />
            <title>Light theme</title>
          </svg>

          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 37 37"
            aria-hidden="true"
            style={{
              willChange: "fill",
              fill: "var(--foreground-color)",
              marginRight: "1px",
              marginTop: "3px"
            }}
          >
            <path d="M22.9,20.2c-5.2,0-9.5-4.2-9.5-9.5c0-3.2,1.6-6.1,4.1-7.8c-0.5-0.1-1.1-0.1-1.6-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12
	c5.1,0,9.4-3.2,11.2-7.6C25.8,19.8,24.4,20.2,22.9,20.2z"/>
            <title>Dark theme</title>
          </svg>
        </div>
      </label>
    </div>
  );
}
