import React, { useState, useEffect } from 'react';
import { StatusBar, View, ImageBackground, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, PermissionsAndroid } from 'react-native';

const Tutorial = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const steps = [
    'Bem-vindo ao nosso jogo de elementos! O objetivo é usar o poder dos elementos para vencer o computador.',
    'Existem cinco elementos no jogo: Fogo, Vento, Trovão, Terra e Água.',
    'Cada elemento possui forças e fraquezas baseadas em suas propriedades naturais e interações elementares.',
    'Por exemplo, o Fogo é poderoso contra o Vento porque o fogo se intensifica com o vento, mas é vulnerável à Água porque a água apaga o fogo.',
    'Vamos ver alguns exemplos:',
    'Aqui está um gráfico mostrando as interações de vitória: Fogo -> Vento -> Trovão -> Terra -> Água -> Fogo',
    'Aqui está um gráfico mostrando as interações de derrota: Fogo <- Terra <- Vento <- Trovão <- Água <- Fogo',
    'Durante cada rodada, você e o computador escolherão um elemento. Se seu elemento vencer o do computador, você ganha a rodada!',
    'Lembre-se de que você só pode perder cinco vezes, então escolha sabiamente!',
    'Dicas rápidas: observe os padrões do computador e ajuste sua estratégia de acordo.',
    'Agora é a sua vez! Boa sorte e divirta-se jogando!',
    'Use essas informações para criar sua estratégia e vencer o jogo!'
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
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
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
    </>
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
    alignItems: 'center',
    justifyContent: 'flex-end',
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
