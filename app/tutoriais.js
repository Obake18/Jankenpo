import React, { useState, useEffect } from 'react';
import { StatusBar, View, ImageBackground, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import elementos from './elementos'; // Importa os dados dos elementos

const Tutorial = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);

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

  const toggleImageVisibility = () => {
    setImageVisible(!imageVisible);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      if (step === 5) {
        // Esconde a imagem após o passo 5
        setImageVisible(false);
      }
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (step >= 6) {
        // Alterna a visibilidade da imagem após o passo 6
        toggleImageVisibility();
      }
    }, 3000); // Alterna a cada 3 segundos

    return () => clearInterval(interval);
  }, [step]);

  const renderElementRunas = () => {
    return elementos.map((elemento) => (
      <View key={elemento.nome} style={[styles.runaContainer, { backgroundColor: elemento.cor }]}>
        <Image source={elemento.icone} style={styles.runaIcon} />
        <Text style={styles.runaText}>{elemento.nome}</Text>
      </View>
    ));
  };

  const renderCarousel = () => {
    return (
      <View style={styles.carouselContainer}>
        {/* Aqui você pode renderizar o carrossel usando o componente desejado */}
        <Text style={styles.carouselText}>Aqui está o carrossel de elementos. Use-o para explorar cada elemento e suas fraquezas.</Text>
      </View>
    );
  };

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

          {step >= 6 && (
            <View style={styles.elementContainer}>
              {renderElementRunas()}
            </View>
          )}

          {step === 11 && renderCarousel()}

          {imageVisible && step >= 5 && (
            <Image source={require('../assets/imagens/grafico.png')} style={styles.image} />
          )}

          {step > 0 && (
            <TouchableOpacity style={[styles.button, { bottom: step === 0 ? 80 : 20 }]} onPress={prevStep}>
              <Text style={styles.buttonText}>Anterior</Text>
            </TouchableOpacity>
          )}
          {step > 7 && (
            <TouchableOpacity style={[styles.skipButton, { bottom: step > 0 ? 85 : 20 }]} onPress={skipTutorial}>
              <Text style={styles.skipButtonText}>Pular Tutorial</Text>
            </TouchableOpacity>
          )}
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
    position: 'absolute',
    top: '30%',
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  balloon: {
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
  },
  elementContainer: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  runaContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  runaIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  runaText: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
  carouselContainer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    alignItems: 'center',
  },
  carouselText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
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
