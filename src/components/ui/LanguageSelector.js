import React, { useContext } from 'react';
import { LanguageContext, languageOptions } from "../../context/LanguageContext";
import "../ui_styles/lang.css";

// Sound imports
import useSound from "use-sound";
import { volume } from "../sound/volume";
import lightSound from "../sound/light.mp3";

function LanguageSelector() {
  const languageContext = useContext(LanguageContext);
  let id = languageContext.language.id;

  const [playLight] = useSound(lightSound, { volume });

  const toggleLanguage = () => {
    playLight();
    if (id === 'en') {
      languageContext.setLanguage(languageOptions[1])
    }
    if (id === 'es') {
      languageContext.setLanguage(languageOptions[0])
    }
  }

  return (
    <div onClick={() => toggleLanguage()} className="language-wrapper">
      <div className="language">
        <h6>{id}</h6>
      </div>
    </div>
  );
}

export default LanguageSelector;