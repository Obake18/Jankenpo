import React, { useEffect } from 'react';
import { BackHandler, ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const GameOver = ({ route }) => {
  const router = useRouter();
  const resetGame = route?.params?.resetGame;

  useEffect(() => {
    const handleBackPress = () => {
      router.push('/'); // Navegar para a tela inicial
      return true; // Indica que você tratou o evento
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Limpar o listener quando o componente for desmontado
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [router]);

  const reloadGame = () => {
    if (resetGame) {
      resetGame();
    }
    router.push('/'); // Navegar para a tela inicial
  };

  const goToRecords = () => {
    router.push('/recorde'); // Navegar para a tela de Recordes
  };

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.message}>Os Kamuy não estavam ao seu lado desta vez...</Text>
        <TouchableOpacity style={styles.button} onPress={reloadGame} accessibilityLabel="Tentar novamente" accessibilityHint="Reinicia o jogo">
          <Text style={styles.buttonText}>Tentar Novamente!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recordsButton} onPress={goToRecords} accessibilityLabel="Ver recordes" accessibilityHint="Mostra a lista de recordes">
          <Text style={styles.buttonText}>Ver Recordes</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  recordsButton: {
    backgroundColor: '#D25802',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOver;
