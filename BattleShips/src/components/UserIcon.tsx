import * as React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

interface UserIconProps {
    color: string;
}

const UserIcon: React.FC<UserIconProps> = ({ color }) => (
    <Svg width="100" height="100" viewBox="0 0 30 30">
        <Circle cx="15" cy="15" r="15" fill={color} />
        <Circle cx="15" cy="11" r="6.5" fill={"white"} />
        <Path
    d="M15 20c-5.52 0-10 3.48-10 8v2h20v-2c0-4.52-4.48-8-10-8z"
    fill={"white"}
  />
    </Svg>
);

export default UserIcon;