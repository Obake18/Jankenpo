import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Runas from './runas';

if (__DEV__) {
  // Sobrescreve as funções de log do console para não fazerem nada
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}


export default function Jogo() {
  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <View style={styles.container}>

            <Animatable.View>
              <Runas />
            </Animatable.View>

        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cobrir toda a área
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Tornar o contêiner transparente para mostrar o fundo
    alignItems: 'center',
    justifyContent: 'center',
  },
});
