import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Runas from './runas';

export default function Jogo() {
  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.mostradorContainer}>
          <View style={styles.rodaGigante}>
            <Animatable.View>
              <Runas />
            </Animatable.View>
          </View>
          <View style={styles.mesa}>
            <Text style={styles.title}>Computador</Text>
            <Text style={styles.choice}>-</Text>
          </View>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}></Text>
        </View>
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
  mostradorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rodaGigante: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mesa: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Cor do texto
  },
  choice: {
    fontSize: 18,
    color: '#fff', // Cor do texto
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Cor do texto
  },
});
