import React, { useState, useEffect } from 'react';
import { StatusBar, View, ImageBackground, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, PermissionsAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';


const Tutorial = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const steps = [
    '(Clique aqui)',
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
        <TouchableWithoutFeedback onPress={nextStep}>
          <View style={styles.container}>
            {step % 2 !== 0 && (
              <View style={styles.characterContainer}>
                <Image source={require('../assets/imagens/Shanti.png')} style={styles.character} />
              </View>
            )}
            <Animatable.View animation="fadeIn" duration={800} style={styles.balloonContainer}>
              <Text style={styles.balloon}>{steps[step]}</Text>
            </Animatable.View>
            {step === 2 && (
              <View style={styles.graphicContainer}>
                <Image source={require('../assets/imagens/grafico.png')} style={styles.graphic} />
              </View>
            )}
            {step > 0 && (
              <TouchableOpacity style={[styles.button, { bottom: step === 0 ? 80 : 20 }]} onPress={() => setStep(step - 1)}>
                <Text style={styles.buttonText}>Anterior</Text>
              </TouchableOpacity>
            )}
            {step > 7 && (
              <TouchableOpacity style={[styles.skipButton, { bottom: step > 0 ? 85 : 20 }]} onPress={() => navigation.navigate('Jogo')}>
                <Text style={styles.skipButtonText}>Pular Tutorial</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
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
    bottom: 20,
    left: 20,
  },
  character: {
    width: 180,
    height: 180,
  },
  balloonContainer: {
    position: 'absolute',
    bottom: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balloon: {
    fontSize: 20,
    textAlign: 'center',
  },
  graphicContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
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
    position: 'absolute',
    right: 20,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Tutorial;
