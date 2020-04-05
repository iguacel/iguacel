import React, { useState } from "react";

const Modal = ({ closeModal }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        display: "flex",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid black",
          borderRadius: "2px",
          boxShadow: "3px 3px 3px rgba(0,0,0,0.2)",
          padding: "20px",
          maxWidth: "400px",
          width: "100%"
        }}
        className="modalCard"
      >
        <button onClick={() => closeModal()}>Close</button>

        <h3>Modal</h3>
      </div>
    </div>
  );
};

const ModalWrapper = () => {
  const [on, toggle] = useState(false);

  return (
    <div className="center" style={{ border: "1px solid orange" }}>
      <button onClick={() => toggle(true)}>Open Modal</button>
      {on && <Modal closeModal={() => toggle(false)} />}
    </div>
  );
};

export default ModalWrapper;
