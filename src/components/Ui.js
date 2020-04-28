import React from "react";

import Burguer from "../components/ui/Burguer";
import Nav from "../components/ui/Nav";
import SwitchButton from "../components/ui/SwitchButton";
import LanguageSelector from "../components/ui/LanguageSelector";

import { useLocation } from "react-router-dom";

const Ui = () => {
  let { pathname } = useLocation();
  let isExp = pathname.split("/")[1] === "exp";
  const uiVisible = true;

  return (
    <div>
      {isExp && uiVisible && <Burguer />}
      {isExp && uiVisible && <Nav />}
      {isExp && uiVisible && <SwitchButton />}
      {isExp && uiVisible && <LanguageSelector />}
    </div>
  );
};

export default Ui;
