import React from 'react';
import {Image} from 'react-native';

const Logo = ({style, isAlternative}) => {
  return !isAlternative ? (
    <Image source={require('../assets/images/logo.png')} style={style} />
  ) : (
    <Image source={require('../assets/images/logo2.png')} style={style} />
  );
};

export default Logo;
