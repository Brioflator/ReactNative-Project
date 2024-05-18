import {Colors} from 'react-native-ui-lib';
import React from 'react';
import { color } from 'react-native-elements/dist/helpers';



export const themes = {
  color1: '#372554',
  color2: '#7D4E57',
  color3: '#D66853',
  color4: '#F3C677',
  color5: '#71816D',
  color6: '#364156',
  // Add more colors as needed
};

const ThemeContext = React.createContext({
  theme: themes.color1,
  setTheme: (color: string) => {},
});

export default ThemeContext;