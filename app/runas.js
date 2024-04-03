import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { elementos } from './Elementos';

const Runa = ({ elemento }) => (
  <View style={styles.runa}>
    <Text style={styles.kanji}>{elementos[elemento].kanji}</Text>
  </View>
);

const Runas = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const randomComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * elementos.length);
    return elementos[randomIndex];
  };

  const playGame = (elemento) => {
    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);

    if (elemento === computer.vence) {
      setResult('Você ganhou!');
    } else if (elemento === computer.perde) {
      setResult('Você perdeu!');
    } else {
      setResult('Empate!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.runasContainer}>
        {elementos.map((elemento, index) => (
          <TouchableOpacity
            key={index}
            style={styles.runa}
            onPress={() => playGame(elemento)}
            disabled={playerChoice !== null}
          >
            <Runa elemento={elemento} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  runasContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  runa: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
  kanji: {
    fontSize: 20,
    color: '#000',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Runas;
