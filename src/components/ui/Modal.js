import React from "react";
import ReactDOM from "react-dom";
import NavExp from "./Nav";

import "../ui_styles/modal.css";

const Modal = ({ children }) =>
  ReactDOM.createPortal(
    <div className="modalWrapper">
      <NavExp />
      {children}
    </div>,
    document.getElementById("modal-root")
  );

export default Modal;
