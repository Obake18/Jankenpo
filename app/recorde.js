import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        setMaxWins(maxWins || 0);
        setLastPlayerChoice(lastPlayerChoice || 'Nenhum');
        setLastComputerChoice(lastComputerChoice || 'Nenhum');
        setMostChosenElements(mostChosenElements || {});
      }
    } catch (error) {
      console.error('Erro ao carregar o recorde:', error);
    }
  };

  const navigateBackToGame = () => {
    navigation.navigate('Jogo');
  };

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>


      <View style={styles.container}>
        <Text style={styles.title}>Recordes</Text>
        <View style={styles.mostChosenContainer}>
          {Object.entries(mostChosenElements).map(([elemento, frequencia]) => (
            <Text key={elemento}>{elemento}: {frequencia}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={navigateBackToGame}>
          <Text style={styles.buttonText}>Voltar para o Jogo</Text>
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
    backgroundColor: '#8B4513',
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
