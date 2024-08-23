import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { elementos } from './elementos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; // Importar Toast

const { width } = Dimensions.get('window');
const scale = width / 320;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const Tutorial = () => {
  const [step, setStep] = useState(0);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [kamuyVisible, setKamuyVisible] = useState(false);
  const router = useRouter();
  const soundRef = useRef(null);

  const steps = [
    '(Clique aqui)',
    'Que bom que você chegou!',
    'Meu nome é Asirpa. Sou uma nativa destas terras. Prazer em conhecê-lo.',
    'Há muito tempo, meu povo, os Ainu, vivia em paz. Mas então os "Sisam" chegaram e trouxeram consigo um monstro de metal que sugou a magia do nosso solo, dos nossos rios, dos nossos ventos, dos nossos céus e apagou nossas chamas.',
    'Esse monstro, conhecido pelos mais velhos como "Kanep Wenkamuy", é a fonte do nosso sofrimento. Você é a nossa esperança para salvar essas terras! Por favor, nos ajude!',
    'Não sabe como? Eu te ensino!',
    'Os Kamuy, deuses de nossas terras, nos enviaram bênçãos especiais. Essas bênçãos podem nos ajudar a derrotar o Wenkamuy!',
    'Kamuy Huci nos deu o poder do Fogo.',
    'Kamuy Fujin nos deu o poder do Vento.',
    'Kanna Kamuy nos deu o poder do Trovão.',
    'Kamuy Omoikane nos deu o poder da Terra.',
    'Kamuy Toyo nos deu o poder da Água.',
    'Você escolherá uma bênção para combater o Wenkamuy! Mas cuidado, ele roubou a magia das nossas terras e pode usar as mesmas bênçãos contra você.',
    'Cada bênção tem poder sobre outra, criando um equilíbrio entre elas.',
    'Você só pode perder cinco vezes antes que seja tarde demais...',
    '...',
    'Boa sorte, Forasteiro! Que as bênçãos dos Kamuy estejam com você.'
  ];

  useEffect(() => {
    const checkTutorialCompletion = async () => {
      const completed = await AsyncStorage.getItem('tutorialCompleted');
      setTutorialCompleted(completed === 'true');

      // Exibir o Toast com estilo personalizado
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'Dica',
        text2: 'Para voltar passos, basta clicar no botão de voltar.',
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 50,
        style: styles.toast, // Aplicar estilo personalizado
        text1Style: styles.toastText1, // Estilo para o título do Toast
        text2Style: styles.toastText2 // Estilo para a mensagem do Toast
      });
    };

    checkTutorialCompletion();
  }, []);

  useEffect(() => {
    let sound;

    async function playMusic() {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/music/tutorial-music.mp3')
      );
      soundRef.current = newSound;
      await soundRef.current.playAsync();
    }

    playMusic();

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync().catch(error => console.error("Error stopping sound:", error));
        soundRef.current.unloadAsync().catch(error => console.error("Error unloading sound:", error));
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (soundRef.current) {
          soundRef.current.stopAsync().catch(error => console.error("Error stopping sound:", error));
          soundRef.current.unloadAsync().catch(error => console.error("Error unloading sound:", error));
        }
      };
    }, [])
  );

  const nextStep = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await AsyncStorage.setItem('tutorialCompleted', 'true');
      router.replace('/jogo');
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
      case 7: return 'Fogo';
      case 8: return 'Vento';
      case 9: return 'Trovão';
      case 10: return 'Terra';
      case 11: return 'Agua';
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
        <Text style={styles.kamuyDescription}>{descricao.kamuy}</Text>
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

  useEffect(() => {
    setKamuyVisible(step > 6 && (step >= 7 && step <= 11));
  }, [step]);

  useEffect(() => {
    const handleBackPress = () => {
      if (step > 0) {
        setStep(step - 1);
        return true; // Intercepta o comportamento padrão
      }
      return false; // Permite o comportamento padrão (sair da tela)
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [step]);

  const showCharacter = step === 2 || step === 3 || step === 4 || step === 5 || step === 6 || step === 12 || step === 13 || step === 14 || step === 15 || step === 16 || step === 17;

  return (
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
          {step > 6 && (
            <TouchableOpacity
              style={[
                styles.skipButton,
                {
                  bottom: normalize(20),
                  right: normalize(20),
                }
              ]}
              onPress={() => router.replace('/jogo')}
            >
              <Text style={styles.skipButtonText}>Pular</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterContainer: {
    position: 'absolute',
    bottom: normalize(0),
    left: normalize(10),
    width: normalize(150),
    height: normalize(150),
  },
  character: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  balloonContainer: {
    position: 'absolute',
    bottom: '30%',
    backgroundColor: 'white',
    borderRadius: normalize(20),
    padding: normalize(15),
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balloon: {
    fontSize: normalize(16),
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#8B4513',
    padding: normalize(10),
    borderRadius: normalize(5),
    position: 'absolute',
    bottom: normalize(20),
    right: normalize(20),
  },
  skipButtonText: {
    color: 'white',
    fontSize: normalize(14),
  },
  kamuyInfoContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: normalize(20),
    padding: normalize(10),
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  kamuyImage: {
    width: '100%',
    height: normalize(180),
    resizeMode: 'contain',
  },
  kamuyName: {
    fontSize: normalize(18),
    fontFamily: "Shojumaru_400Regular",
    marginVertical: normalize(10),
  },
  kamuyDescription: {
    fontFamily: "Shojumaru_400Regular",
    fontSize: normalize(12),
    textAlign: 'center',
  },
  elementsContainer: {
    flexDirection: 'row',
    marginTop: normalize(10),
  },
  elementContainer: {
    alignItems: 'center',
    padding: normalize(10),
    borderRadius: normalize(10),
    margin: normalize(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elementImage: {
    width: normalize(50),
    height: normalize(50),
    resizeMode: 'contain',
  },
  elementName: {
    fontFamily: "Shojumaru_400Regular",
    color: 'white',
    fontSize: normalize(14),
    marginTop: normalize(10),
  },
  elementDescription: {
    fontSize: normalize(12),
    textAlign: 'center',
    color: 'white',
  },
  toast: {
    backgroundColor: '#333', // Cor de fundo do Toast
    borderRadius: normalize(10), // Borda arredondada
    padding: normalize(20), // Espaçamento interno
  },
  toastText1: {
    fontSize: normalize(18), // Tamanho da fonte do título
    color: 'white', // Cor do texto
  },
  toastText2: {
    fontSize: normalize(16), // Tamanho da fonte da mensagem
    color: 'white', // Cor do texto
  },
});

export default Tutorial;
