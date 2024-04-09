import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Button } from 'react-native';
import { elementos } from './elementos';
import { useNavigation } from '@react-navigation/native';

const Runa = ({ elemento, selecionado }) => {

  const borderColor = selecionado ? brightenColor(elementos[elemento].corBase, 0.3) : 'transparent';
  return (
    <View style={[styles.runa, { backgroundColor: elementos[elemento].corBase, borderColor }]}>
      <Text style={styles.kanji}>{elementos[elemento].kanji}</Text>
    </View>
  );
};

const Runas = () => {
  const navigation = useNavigation();
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [round, setRound] = useState(1);
  const [playerLives, setPlayerLives] = useState(5); // Inicia com 5 vidas
  const [phase, setPhase] = useState(1); // Inicia na fase 1
  const spinValue = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        spinValue.setValue(gestureState.dx / 100);
      },
      onPanResponderRelease: (evt, gestureState) => {
      },
    })
  ).current;

  const randomComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(elementos).length);
    return elementos[Object.keys(elementos)[randomIndex]];
  };

  const playGame = (elemento) => {
    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);

    if (!computer) {
      setResult('Erro ao selecionar a escolha do computador.');
      return;
    }

    if (elemento === computer.vence) {
      setResult('Você perdeu!');
      setPlayerLives(playerLives - 1); // Perde uma vida quando perde a partida

      if (playerLives === 1) { // Se o jogador perder todas as vidas
        setResult('Game Over');
        navigation.navigate('GameOver');
        setRound(1);
        setPlayerLives(5); // Reseta as vidas
        setPhase(1); // Reseta a fase
      }
    } else if (elemento === computer.perde) {
      setResult('Você ganhou!');
      if (round % 7 === 0) { // Se o jogador ganhar 7 partidas
        setPhase(phase + 1); // Avança para a próxima fase
      }
    } else {
      setResult('Empate!');
    }

    setRound(round + 1);
    setTimeout(() => {
      setPlayerChoice(null);
      setComputerChoice(null);
      setResult(null);
    }, 1000);

  };

  const spin = spinValue.interpolate({
    inputRange: [0, Object.keys(elementos).length],
    outputRange: ['0deg', `${360 * Object.keys(elementos).length}deg`],
  });

  const radius = 120;
  const numRunas = Object.keys(elementos).length;
  const angleIncrement = (2 * Math.PI) / numRunas;

  const reloadGame = () => {
    setRound(1);
    setPlayerLives(5); // Reseta as vidas do jogador para 5
    setPhase(1); // Reseta a fase para 1
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Computador</Text>
        <Text style={styles.choice}>{computerChoice ? computerChoice.nome : '-'}</Text>
      </View>
      <View>
      <Text style={styles.title}>Rodada {round}</Text>
      </View>
      <View>
        <Text style={styles.resultText}>{result}</Text>

        <Text style={styles.title}>Vidas: {playerLives}</Text> 
        <Text style={styles.title}>Fase: {phase}</Text> 
      </View>


      <View style={styles.runasContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.rodaGigante, { transform: [{ rotate: spin }] }]}
        >
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
              onPress={() => playGame(elemento)}
              disabled={playerChoice !== null}
            >
              <Runa elemento={elemento} selecionado={elemento === playerChoice} />
            </TouchableOpacity>
          ))}
        </Animated.View>
        <View style={styles.mesa}></View>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  runasContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rodaGigante: {
    flexDirection: 'row',
  },
  mesa: {
    marginBottom: 0,
  },
  title: {
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
