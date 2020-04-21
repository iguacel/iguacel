import React from "react";
import { Link } from "react-router-dom";
import "../ui_styles/NotFound.css";

const NotFound = () => {
  return (
    <Link to="/exp/1" className="td">
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
          <h2>404</h2>
          <h3 className="light hug">Home</h3>
        </div>
      </div>
    </Link>
  );
};

export default NotFound;
