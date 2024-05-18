import {Colors} from 'react-native-ui-lib';
import React from 'react';



export const themes = {
  color1: 'purple',
  color2: 'red',
  color3: 'blue',
  // Add more colors as needed
};

const ThemeContext = React.createContext({
  theme: themes.color1,
  setTheme: (color: string) => {},
});

export default ThemeContext;