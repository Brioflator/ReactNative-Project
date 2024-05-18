import "react-native-gesture-handler";
import Router from "./src/router";
import { AuthContextProvider } from "./src/hooks/authContext";
import ThemeContext, { themes } from './theme';
import ColorButton from './src/components/ThemeButton';
import React, { useState } from 'react';


export default function App() {
  const [theme, setTheme] = useState(themes.color1);

  return (
    <AuthContextProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router />
      </ThemeContext.Provider>
    </AuthContextProvider>
  );
}
