import React from 'react';
import { StatusBar, ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GameOver = ({ navigation, route }) => {
  // A função resetGame é passada como parte das props através da navegação
  const { resetGame } = route.params || {};

  const reloadGame = () => {
    // Chamando a função resetGame recebida como prop
    if (resetGame) {
      resetGame();
    }
    // Navegar de volta para a tela do jogo
    navigation.navigate('Jogo');
  };

  const goToRecords = () => {
    // Navegar para a tela de recordes
    navigation.navigate('Recorde');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#000000" />
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Game Over!</Text>
          <Text style={styles.message}>As runas não estavam ao seu lado desta vez...</Text>
          <TouchableOpacity style={styles.button} onPress={reloadGame}>
            <Text style={styles.buttonText}>Tentar Novamente!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recordsButton} onPress={goToRecords}>
            <Text style={styles.buttonText}>Ver Recordes</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cobrir toda a área
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  recordsButton: {
    backgroundColor: '#D25802', // Cor azul aço
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
