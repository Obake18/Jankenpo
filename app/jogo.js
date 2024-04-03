import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { elementos } from './Elementos';
import Runas from './Runas';

export default function Jogo() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const runasRef = useRef(null);

  const playGame = (elemento) => {
    const computerIndex = Math.floor(Math.random() * elementos.length);
    const computer = elementos[computerIndex];

    setPlayerChoice(elemento);
    setComputerChoice(computer);

    if (elemento === computer.vence) {
      setResult('Você ganhou!');
    } else if (elemento === computer.perde) {
      setResult('Você perdeu!');
    } else {
      setResult('Empate!');
    }

    // Iniciar a animação
    runasRef.current.animate({
      0: { rotate: '0deg' },
      1: { rotate: '360deg' },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mostradorContainer}>
        <View style={styles.rodaGigante}>
          <Animatable.View ref={runasRef}>
            <Runas />
          </Animatable.View>
        </View>
        <View style={styles.mesa}>
          <Text style={styles.title}>Computador</Text>
          <Text style={styles.choice}>{computerChoice ? computerChoice.nome : '-'}</Text>
        </View>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DEB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mostradorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rodaGigante: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  mesa: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  choice: {
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
