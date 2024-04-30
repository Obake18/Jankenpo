import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recorde = ({ navigation }) => {
  const [maxWins, setMaxWins] = useState(0);
  const [lastPlayerChoice, setLastPlayerChoice] = useState(null);
  const [lastComputerChoice, setLastComputerChoice] = useState(null);
  const [mostChosenElements, setMostChosenElements] = useState({});

  useEffect(() => {
    loadRecord();
  }, []);

  const loadRecord = async () => {
    try {
      const recordData = await AsyncStorage.getItem('@recordData');
      if (recordData !== null) {
        const { maxWins, lastPlayerChoice, lastComputerChoice, mostChosenElements } = JSON.parse(recordData);
        setMaxWins(maxWins || 0); // Add null-check and fallback value
        setLastPlayerChoice(lastPlayerChoice);
        setLastComputerChoice(lastComputerChoice);
        setMostChosenElements(mostChosenElements || {}); // Add null-check and fallback value
      } else {
        // Handle case where record data is null
      }
    } catch (error) {
      console.error('Erro ao carregar o recorde:', error);
    }
  };
  

  const navigateBackToGame = () => {
    navigation.navigate('Jogo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordes</Text>
      <Text>Máximo de Partidas Ganhas: {maxWins}</Text>
      <Text>Último Elemento Escolhido pelo Jogador: {lastPlayerChoice}</Text>
      <Text>Último Elemento Escolhido pelo Computador: {lastComputerChoice}</Text>
      <Text>Elementos Mais Escolhidos:</Text>
      <View style={styles.mostChosenContainer}>
        {Object.entries(mostChosenElements).map(([elemento, frequencia]) => (
          <Text key={elemento}>{elemento}: {frequencia}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateBackToGame}>
        <Text style={styles.buttonText}>Voltar para o Jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mostChosenContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#8B4513', // Cor terrosa
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Recorde;
