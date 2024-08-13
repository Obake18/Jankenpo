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

  const renderKamuyInfo = (kamuy) => (
    <View style={styles.kamuyInfoContainer}>
      <Image source={kamuy.image} style={styles.kamuyImage} />
      <Text style={styles.kamuyName}>{kamuy.nome}</Text>
      <Text style={styles.kamuyDescription}>{kamuy.descricao}</Text>
      <View style={styles.elementsContainer}>
        {kamuy.elementos.map(element => (
          <View key={element.nome} style={styles.elementContainer}>
            <Image source={element.image} style={styles.elementImage} />
            <Text style={styles.elementName}>{element.nome}</Text>
            <Text style={styles.elementDescription}>{element.descricao.fraquezasForcas}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const getKamuyForStep = () => {
    switch (step) {
      case 7:
        return elementos.Katon; // Kamuy Huci
      case 8:
        return elementos.Fuuton; // Kamuy Fujin
      case 9:
        return elementos.Raiton; // Kanna Kamuy
      case 10:
        return elementos.Doton; // Kamuy Omoikane
      case 11:
        return elementos.Suiton; // Kamuy Toyo
      default:
        return null;
    }
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
            {step === 2 && (
              <View style={styles.graphicContainer}>
                <Image source={require('../assets/imagens/grafico.png')} style={styles.graphic} />
              </View>
            )}
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
    bottom: 20,
    left: 20,
  },
  character: {
    width: 180,
    height: 180,
  },
  balloonContainer: {
    position: 'absolute',
    bottom: '60%',
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
  kamuyInfoContainer: {
    position: 'absolute',
    top: '30%',
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
  kamuyImage: {
    width: 100,
    height: 100,
  },
  kamuyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  kamuyDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 5,
  },
  elementsContainer: {
    marginTop: 10,
  },
  elementContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  elementImage: {
    width: 50,
    height: 50,
  },
  elementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  elementDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 5,
  },
});

export default Tutorial;
