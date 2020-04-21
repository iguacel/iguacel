import React, { useState, createContext, useContext } from 'react';

export const languageOptions = [
  { id: 'en', text: 'English' },
  { id: 'es', text: 'Español' }
];

const defaultLanguage = () => {
  if (navigator.language.includes("es")) {
    return languageOptions[1];
  } else {
    return languageOptions[0];
  }
}

// create the language context with default selected language
export const LanguageContext = createContext({
  language: defaultLanguage()
});

// it provides the language context to app
export const LanguageProvider = (props) => {
  const languageContext = useContext(LanguageContext);
  const [language, setLanguage] = useState(languageContext.language);

  const provider = {
    language,
    setLanguage: (selectedLanguage) => {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={provider}>
      {props.children}
    </LanguageContext.Provider>
  );
};
