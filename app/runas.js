import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { elementos } from './elementos';

const Runa = ({ elemento, selecionado }) => {
  const borderColor = selecionado ? brightenColor(elementos[elemento].corBase, 0.3) : 'transparent';
  return (
    <View style={[styles.runa, { backgroundColor: elementos[elemento].corBase, borderColor }]}>
      <Text style={styles.kanji}>{elementos[elemento].kanji}</Text>
    </View>
  );
};

const Runas = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current; // Usamos useRef para persistir o valor entre as renderizações

  const randomComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(elementos).length);
    return elementos[Object.keys(elementos)[randomIndex]];
  };

  const playGame = (elemento, index) => {
    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);

    if (!computer) {
      setResult('Erro ao selecionar a escolha do computador.');
      return;
    }

    if (elemento === computer.perde) {
      setResult('Você ganhou!');
    } else if (elemento === computer.vence) {
      setResult('Você perdeu!');
    } else {
      setResult('Empate!');
    }

    // Girar a mesa
    Animated.timing(
      spinValue,
      {
        toValue: index, // Giramos para o índice do elemento selecionado
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, Object.keys(elementos).length], // O intervalo de entrada agora corresponde ao número de elementos
    outputRange: ['0deg', `${360 * Object.keys(elementos).length}deg`], // O intervalo de saída agora corresponde ao número de elementos
  });

  const radius = 120;
  const numRunas = Object.keys(elementos).length;
  const angleIncrement = (2 * Math.PI) / numRunas;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Computador</Text>
        <Text style={styles.choice}>{computerChoice ? computerChoice.nome : '-'}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.runasContainer}>
        <Animated.View style={[styles.rodaGigante, { transform: [{ rotate: spin }] }]}>
          {Object.keys(elementos).map((elemento, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.runaContainer,
                {
                  left: radius * Math.cos(angleIncrement * index + Math.PI / 2) - 50,
                  top: radius * Math.sin(angleIncrement * index + Math.PI / 2) - 50,
                },
              ]}
              onPress={() => playGame(elemento, index)} // Passamos o índice para playGame
              disabled={playerChoice !== null}
            >
              <Runa elemento={elemento} selecionado={elemento === playerChoice} />
            </TouchableOpacity>
          ))}
        </Animated.View>
        <View style={styles.mesa}>
        </View>
      </View>
    </View>
  );
};


  

const brightenColor = (color, percent) => {
  const bigint = parseInt(color.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const brightenedR = Math.round(r + (255 - r) * percent);
  const brightenedG = Math.round(g + (255 - g) * percent);
  const brightenedB = Math.round(b + (255 - b) * percent);

  return `#${(brightenedR << 16 | brightenedG << 8 | brightenedB).toString(16).padStart(6, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,


  },
  runasContainer: {

    flexDirection: 'column',
    alignItems: 'center', // Alterado de 'center' para 'flex-start'
  },
  rodaGigante: {
    flexDirection: 'row',
  },
  mesa: {
    marginBottom: 0,
  },
  title: {
    top : 0,
    justifyContent : 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  choice: {
    fontSize: 18,
  },
  runaContainer: {
    position: 'absolute',
  },
  runa: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 50,
  },
  kanji: {
    fontSize: 20,
    color: '#fff',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Runas;