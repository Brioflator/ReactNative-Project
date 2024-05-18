import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import ThemeContext from '../../theme';

interface ColorButtonProps {
    color: string;
    onPress: () => void;
  }

const ColorButton: React.FC<ColorButtonProps> = ({ color, onPress }) => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <Button buttonStyle={{backgroundColor : color, borderRadius: 30, margin:10, padding:20, borderWidth: 2, borderColor: "black"}} onPress={onPress} />
  );
};

export default ColorButton;