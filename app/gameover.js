// GameOver.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GameOver = ({ navigation }) => {
  const reloadGame = () => {
    // Navegar de volta para a tela do jogo
    navigation.navigate('Jogo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.message}>As runas não estavam ao seu lado desta vez. . . </Text>
      <TouchableOpacity style={styles.button} onPress={reloadGame}>
        <Text style={styles.buttonText}>Tentar Novamente!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5DEB3', // Cor de pergaminho
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#8B4513', // Cor terrosa
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOver;
