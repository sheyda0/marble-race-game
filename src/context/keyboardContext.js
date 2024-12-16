import React, { createContext, useContext, useState } from "react";

const KeyboardContext = createContext();

const KeyboardProvider = ({ children }) => {
  const [keyboard, setKeyboard] = useState();

  const clickKeyboard = (value) => {
    setKeyboard(value);
  };

  return (
    <KeyboardContext.Provider value={{ keyboard, clickKeyboard }}>
      {children}
    </KeyboardContext.Provider>
  );
};

const useKeyboard = () => {
  return useContext(KeyboardContext);
};

export { KeyboardProvider, useKeyboard };
