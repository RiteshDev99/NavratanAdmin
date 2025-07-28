import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

type LogoProps = {
    style?: StyleProp<ImageStyle>;
};

const Logo: React.FC<LogoProps> = ({ style }) => {
    return (
        <Image
            source={require('../../../assets/icons/Navratan_Logo.png')}
            style={[{ width: 100, height: 100, resizeMode: 'contain' }, style]}
        />
    );
};

export default Logo;
