import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tutorial = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const tutorialSteps = [
    'Toque aqui para aprender a mover seu personagem.',
    'Toque aqui para aprender a coletar itens.',
    'Toque aqui para aprender a derrotar inimigos.',
    // Adicione mais passos conforme necessário
  ];

  const goToNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Jogo');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bubble} onPress={goToNextStep}>
        <Text style={styles.text}>{tutorialSteps[currentStep]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5DEB3', // Cor de fundo da tela
  },
  bubble: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    // Estilize conforme o design da sua tela
  },
  text: {
    textAlign: 'center',
    // Estilize o texto conforme necessário
  },
});

export default Tutorial;
