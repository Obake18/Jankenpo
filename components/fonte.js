// components/CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Shojumaru_400Regular } from '@expo-google-fonts/shojumaru';

const MeuTexto = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Shojumaru_400Regular',
  },
});

export default MeuTexto;
