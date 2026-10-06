import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext(null)

const DarkModeContextProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    // If user has set a preference, use it
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Otherwise, check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  })

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const contextValue = {
    isDarkMode,
    toggleDarkMode
  }

  return (
    <DarkModeContext.Provider value={contextValue}>
      {props.children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeContextProvider;
