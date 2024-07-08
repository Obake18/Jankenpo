import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, PermissionsAndroid } from 'react-native';

const Tutorial = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const steps = [
    'Bem-Vindo Jogador!',
    'Neste jogo, você estará usando o poder dos elementos para enfrentar o computador.',
    'Existem cinco elementos no jogo: Fogo (Katon), Vento (Fuuton), Trovão (Raiton), Terra (Doton) e Água (Suiton).',
    'Cada elemento tem um elemento que pode vencer e um elemento que pode perder. Por exemplo, Fogo (Katon) vence Vento (Fuuton), mas perde para Água (Suiton).',
    'Vamos ver como isso funciona:',
    'Fogo (Katon) -> Vento (Fuuton) -> Trovão (Raiton) -> Terra (Doton) -> Água (Suiton) -> Fogo (Katon)',
    'Isso significa que Fogo vence Vento, Vento vence Trovão, Trovão vence Terra, Terra vence Água, e Água vence Fogo.',
    'Durante cada rodada do jogo, você e o computador escolherão um elemento. Se o seu elemento vencer o elemento do computador, você ganha a rodada!',
    'Mas atente-se: você só pode perder cinco vezes...',
    'Lembre-se, a estratégia e a sorte são as chaves para a vitória!',
    'Boa sorte e divirta-se jogando!'
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigation.navigate('Jogo');
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const skipTutorial = () => {
    navigation.navigate('Jogo');
  };

  const requestFilePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão para acessar arquivos concedida');
      } else {
        console.log('Permissão para acessar arquivos negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestFilePermission();
  }, []);

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.characterContainer}>
          <Image source={require('../assets/imagens/Shanti.png')} style={styles.character} />
        </View>
        <TouchableWithoutFeedback onPress={nextStep}>
          <View style={styles.balloonContainer}>
            <Text style={styles.balloon}>{steps[step]}</Text>
          </View>
        </TouchableWithoutFeedback>
        {step === 4 && (
          <View style={styles.graphicContainer}>
            <Image source={require('../assets/imagens/grafico.png')} style={styles.graphic} />
          </View>
        )}
        {step > 0 && (
          <TouchableOpacity style={[styles.button, { bottom: step === 0 ? 80 : 20 }]} onPress={prevStep}>
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.skipButton, { bottom: step > 0 ? 85 : 20 }]} onPress={skipTutorial}>
          <Text style={styles.skipButtonText}>Pular Tutorial</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    alignItems: 'center',
    justifyContent: 'flex-end', // Manter o conteúdo alinhado ao fundo
  },
  characterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  character: {
    width: 380,
    height: 380,
  },
  balloonContainer: {
    bottom: '40%',
    marginLeft: 85,
    maxWidth: '85%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balloon: {
    fontSize: 18,
  },
  graphicContainer: {
    position: 'absolute',
    top: '20%',
    left: '35%',
    right: '10%',
    alignItems: 'center',
  },
  graphic: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 20,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Tutorial;
