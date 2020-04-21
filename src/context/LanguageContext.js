import React, { useState, createContext, useContext } from 'react';

// https://dev.to/halilcanozcelik/create-a-multi-language-website-with-react-context-api-4i27

export const languageOptions = [
  { id: 'en', text: 'English', isEnglish: true },
  { id: 'es', text: 'Español', isEnglish: false }
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

export default LanguageContext;

