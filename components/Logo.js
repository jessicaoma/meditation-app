// @ts-nocheck
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LogoAppHeader from '../constants/LogoAppHeader';
import LogoApp from '../constants/LogoApp';

/**
 * @typedef {Object} Props
 * @prop {boolean} [isAlternative] Indicated that use the alternative Logo image
 */
/**
 * Component that crear a Logo Image
 * @param {Props} props
 */
const Logo = ({isAlternative}) => {
  return !isAlternative ? (
    <View style={styles.full}>
      <LogoAppHeader />
    </View>
  ) : (
    <View style={styles.compact}>
      <LogoApp />
    </View>
  );
};

const styles = StyleSheet.create({
  full: {width: 192, height: 44},
  compact: {width: 84, height: 90, alignItems: 'center'},
});

export default Logo;
