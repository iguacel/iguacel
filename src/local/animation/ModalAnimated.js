import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const Modal = ({ closeModal, transition, pointerEvents }) => {
  return (
    <div
      style={{
        pointerEvents: pointerEvents,
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
      <animated.div
        style={{
          ...transition,
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
        <button onClick={() => closeModal()
        }>Close</button>

        <h3>Modal</h3>
      </animated.div>
    </div >
  );
};

const ModalWrapperAnimated = () => {

  const [on, toggle] = useState(false);
  const transition = useTransition(on, null, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" }
  });
  const pointerEvents = on ? "all" : "none";

  return (
    <div className="center" style={{ border: "1px solid orange" }}>
      {transition.map(
        ({ item, key, props: transition }) =>
          item && (
            <Modal key={key} pointerEvents={pointerEvents} transition={transition} closeModal={() => toggle(false)} />
          )
      )}
      <button onClick={() => toggle(true)}>Open Modal</button>
    </div>
  );
};

export default ModalWrapperAnimated;
