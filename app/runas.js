import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Button, Dimensions } from 'react-native';
import { elementos } from './elementos';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel'; // Adicione esta biblioteca


// Obtenha as dimensões da tela
const { width: screenWidth } = Dimensions.get('window');

const Runa = ({ elemento, selecionado }) => {
  const elementoObj = elementos[elemento];
  if (!elementoObj) {
    console.warn(`Elemento '${elemento}' não encontrado em 'elementos'`);
    return null;
  }

  const borderColor = selecionado ? brightenColor(elementoObj.corBase, 0.3) : 'transparent';
  return (
    <View style={[styles.runa, { backgroundColor: elementoObj.corBase, borderColor }]}>
      <Text style={styles.kanji}>{elementoObj.kanji}</Text>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const [record, setRecord] = useState({ phase: 1, playerElement: null, computerElement: null, round: 1 });


  const resetGame = () => {
    setRound(1);
    setPlayerLives(5);
    setPhase(1);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setRecord({ phase: 1, playerElement: null, computerElement: null, round: 1 }); // Reset the record
  };

  const randomComputerChoice = () => {
    const keys = Object.keys(elementos);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };


  const playGame = (elemento) => {
    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);
    setActiveIndex(Object.keys(elementos).indexOf(elemento));

    // Update the record
    setRecord({ phase, playerElement: elemento, computerElement: computer, round });


    if (!computer) {
      setResult('Erro ao selecionar a escolha do computador.');
      return;
    }
    if (elemento === computer) {
      setResult('Empate!');
      setWinStreak(0); // Reset the win streak on a draw
    } else if (elementos[elemento].vence === computer || elementos[computer].perde === elemento) {
      setResult('Você ganhou!');
      setWinStreak(winStreak + 1); // Increment the win streak on a win
      if (winStreak >= 2) { // Check if the player has won 3 times in a row
        setPlayerLives(playerLives + 1); // Give the player an extra life
        setWinStreak(0); // Reset the win streak
      }
      if (round % 7 === 0) {
        setPhase(phase + 1);
      }
    } else if (elementos[computer].vence === elemento || elementos[elemento].perde === computer) {
      setResult('Você perdeu!');
      setWinStreak(0); // Reset the win streak on a loss
      setPlayerLives(playerLives - 1);
        // Se o jogador não tiver mais vidas, termina o jogo e reseta tudo
        if (playerLives - 1 === 0) {
          setResult('Game Over');
          resetGame(); // Chame resetGame antes de navegar
          navigation.navigate('GameOver');
        }
        

    
  
    } else {
      setResult('Reação desconhecida! Próxima rodada!!')
    }


    setRound(round + 1);
    setTimeout(() => {
      setPlayerChoice(null);
      setComputerChoice(null);
      setResult(null);
    }, 2000);
  };





  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.runaContainer}
      onPress={() => playGame(item)}
      disabled={playerChoice !== null}
    >
      <Runa elemento={item} selecionado={item === playerChoice} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imagens/mesa.png')} style={styles.mesa} />
      <Image source={require('../assets/imagens/mara.png')} style={styles.robo} />
      <View style={styles.topSection}>
        {computerChoice && (
          <View style={[styles.runa, { backgroundColor: elementos[computerChoice].corBase, position: 'absolute', top: '70%', left: '50%', transform: [{ translateX: -50 }, { translateY: -50 }] }]}>
            <Text style={styles.kanji}>{elementos[computerChoice].kanji}</Text>
          </View>
        )}
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.title}>Rodada {round}</Text>
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.title}>Vidas: {'❤️'.repeat(playerLives)}</Text>
        <Text style={styles.title}>Fase: {phase}</Text>
      </View>

      <View style={styles.runasContainer}>
        <Carousel
          data={Object.keys(elementos)}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth / 3}
          activeSlideAlignment={'center'}
          firstItem={activeIndex}
        />
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
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  mesa: {
    marginTop: '40%',
    position: 'absolute',
    objectFit: 'contain'
  },
  robo: {
    marginTop: '15%',
    objectFit: 'contain',
    position: 'absolute',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  runasContainer: {
    width: '100%',
    justifyContent: 'flex-end',
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
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export default Runas;
