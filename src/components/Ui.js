import React from 'react';

import Burguer from "../components/ui/Burguer";
import Nav from "../components/ui/Nav";
import SwitchButton from "../components/ui/SwitchButton";

import {
  useLocation,
} from "react-router-dom";

const Ui = () => {
  let { pathname } = useLocation();
  let isExp = pathname.split("/")[1] === "exp";

  return (
    <div>
      {isExp && <Burguer />}
      {isExp && <Nav />}
      {isExp && <SwitchButton />}
    </div>
  );
};

export default Ui;