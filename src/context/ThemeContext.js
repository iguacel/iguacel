import React, { useState, useLayoutEffect } from "react";

const ThemeContext = React.createContext({
  dark: true,
  toggle: () => { }
});

export default ThemeContext;

export function ThemeProvider(props) {
  // keeps state of the current theme
  const [dark, setDark] = useState(true);

  // paints the app before it renders elements
  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem("darkTheme");

    if (lastTheme === "true" || dark === true) {
      setDark(true);
      applyTheme(darkTheme);
    } else {
      setDark(false);
      applyTheme(lightTheme);
    }
    // if state changes, repaints the app
  }, [dark]);

  // rewrites set of css variablels/colors
  const applyTheme = theme => {
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

  const toggle = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.cssText = "transition: background .5s ease";

    setDark(!dark);
    window.localStorage.setItem("darkTheme", !dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

// styles
export const lightTheme = [
  "--foreground-color-rgb: 40, 40, 40",
  "--foreground-color-a: 1",
  "--background-color: white"
];

export const darkTheme = [
  "--foreground-color-rgb: 255, 255, 255",
  "--foreground-color-a: 1",
  "--background-color: RGBA(26, 27, 30, 1.00)"
];
