import React, { useState } from "react";
import "../ui_styles/NotFound.css";
import useInterval from "../../hooks/useInterval";
import { moveToEnd } from "../../utils/utils";

const Loader = () => {
  const [data, setData] = useState(["█", "▓", "▒", "░"]);

  useInterval(() => {
    setData(moveToEnd(data));
  }, 200);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="animated show center animated fast"
        style={{ transform: "scale(2)" }}
      >
        <p style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          {data.map((x, i) => (
            <span key={`Loader${i}`}>{x}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Loader;
