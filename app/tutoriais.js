import React, { useState, useEffect } from 'react';
import { StatusBar, View, ImageBackground, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, PermissionsAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { elementos } from './elementos';

const Tutorial = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const steps = [
    '(Clique aqui)',
    'Ainda bem que você chegou . . .',
    'O meu nome é Asirpa, sou uma nativa destas terras. Prazer em te conhecer.',
    'Há muito tempo atrás, meu povo, os Ainu, vivia em paz. Mas então os "Sisam" chegaram aqui nestas terras. Eles trouxeram consigo, um monstro de metal, que sugou a magia de nosso solo, nossos rios, nossos ventos, nossos céus, e apagou nossas chamas.',
    'Este Monstro, ou como os mais velhos chamam, "Kanep Wenkamuy", é a fonte de nosso sofrimento. Você é a chave para salvar nossas terras! Por favor nos ajude!',
    'Você não sabe como? Eu te ensino!',
    'Os Kamuy, os deuses de nossas terras, nos enviaram cada qual uma "benção". Essas bençãos podem nos ajudar a derrotar este Wenkamuy!',
    'Kamuy Huci, nos deu o Fogo',
    'Kamuy Fujin, nos deu o Vento',
    'Kanna Kamuy, nos deu o Trovão',
    'Kamuy Omoikane, nos deu o Terra',
    'Kamuy Toyo, nos deu o Água',
    'Você escolherá uma benção para combater o Wenkamuy! Mas tome cuidado, ele roubou a magia de nossas terras, então ele também pode usar nossas bençãos.',
    'Cada benção tem um poder sobre outra, para fins de equilíbrio.',
    'Você tem 5 vidas. Quando você perder todas as vidas, você perderá o jogo.',
    'Boa sorte, jogador! E divirta-se'
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

  const getKamuyForStep = () => {
    switch (step) {
      case 7: return 'Katon';
      case 8: return 'Fuuton';
      case 9: return 'Raiton';
      case 10: return 'Doton';
      case 11: return 'Suiton';
      default: return null;
    }
  };

  const renderKamuyInfo = (element) => {
    if (!elementos[element]) return null;

    const { image, nome, descricao, kamuyImage } = elementos[element];

    return (
      <View style={styles.kamuyInfoContainer}>
        <Image source={kamuyImage} style={styles.kamuyImage} />
        <Text style={styles.kamuyName}>{nome}</Text>
        <Text style={styles.kamuyDescription}>{elementos[element].kamuy}</Text>
        <View style={styles.elementsContainer}>
          <View style={[styles.elementContainer, { backgroundColor: elementos[element].corBase }]}>
            <Image source={image} style={styles.elementImage} />
            <Text style={styles.elementName}>{nome}</Text>
            <Text style={styles.elementDescription}>{descricao.fraquezasForcas}</Text>
          </View>
        </View>
      </View>
    );
  };

  const showCharacter = step === 2 || step === 3 || step === 4 || step === 5 || step === 6;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <TouchableWithoutFeedback onPress={nextStep}>
          <View style={styles.container}>
            {showCharacter && (
              <View style={styles.characterContainer}>
                <Image source={require('../assets/imagens/Shanti.png')} style={styles.character} />
              </View>
            )}
            <Animatable.View animation="fadeIn" duration={800} style={styles.balloonContainer}>
              <Text style={styles.balloon}>{steps[step]}</Text>
            </Animatable.View>
            {step > 6 && renderKamuyInfo(getKamuyForStep())}
            {step > 0 && (
              <TouchableOpacity style={[styles.button, { bottom: step === 0 ? 80 : 20 }]} onPress={() => setStep(step - 1)}>
                <Text style={styles.buttonText}>Anterior</Text>
              </TouchableOpacity>
            )}
            {step > 6 && (
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
    bottom: 0,
    left: 20,
    width: 320, // Aumentado para melhor visualização
    height: 320, // Aumentado para melhor visualização
  },
  character: {
    width: 250, // Aumentado para melhor visualização
    height: 250, // Aumentado para melhor visualização
  },
  balloonContainer: {
    position: 'absolute',
    bottom: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25, // Aumentado para melhor visualização
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balloon: {
    fontSize: 24, // Aumentado para melhor legibilidade
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
    height: 250, // Aumentado para melhor visualização
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 15, // Aumentado para melhor visualização
    borderRadius: 5,
    position: 'absolute',
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Aumentado para melhor legibilidade
  },
  skipButton: {
    backgroundColor: '#8B4513',
    padding: 15, // Aumentado para melhor visualização
    borderRadius: 5,
    position: 'absolute',
    right: 20,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 18, // Aumentado para melhor legibilidade
  },
  kamuyInfoContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25, // Aumentado para melhor visualização
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  kamuyImage: {
    width: 150, // Aumentado para melhor visualização
    height: 150, // Aumentado para melhor visualização
    resizeMode: 'contain',
  },
  kamuyName: {
    fontSize: 22, // Aumentado para melhor legibilidade
    fontWeight: 'bold',
    marginVertical: 10,
  },
  kamuyDescription: {
    fontSize: 18, // Aumentado para melhor legibilidade
    textAlign: 'center',
  },
  elementsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  elementContainer: {
    fontSize: '52',
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15, // Aumentado para melhor visualização
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  elementImage: {
    width: 100, // Aumentado para melhor visualização
    height: 100, // Aumentado para melhor visualização
    resizeMode: 'contain',
  },
  elementName: {
    fontSize: 18, // Aumentado para melhor legibilidade
    fontWeight: 'bold',
    marginVertical: 5,
  },
  elementDescription: {
    fontSize: 16, // Aumentado para melhor legibilidade
    textAlign: 'center',
  },
});

export default Tutorial;
