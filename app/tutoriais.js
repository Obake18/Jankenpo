import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
    'Lembre-se, a estratégia é a chave para a vitória!',
    'Boa sorte e divirta-se jogando!'
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigation.navigate('Jogo');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.characterContainer}>
        <Image source={require('../assets/imagens/Shanti.png')} style={styles.character} />
        <View style={styles.balloonContainer}>
          <Text style={styles.balloon}>{steps[step]}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={nextStep}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#F5DEB3',
      padding: 20,
    },
    characterContainer: {
      alignSelf: 'flex-start',
      position: 'absolute',
      bottom: 20,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    character: {
      width: 280,
      height: 280,
    },
    balloonContainer: {
      marginLeft: 5,
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
    button: {
      backgroundColor: '#8B4513',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  

export default Tutorial;
