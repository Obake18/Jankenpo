import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { elementos } from './elementos';

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
      <Image source={elementoObj.image} style={styles.image} />
    </View>
  );
};

const LastElements = ({ lastElements }) => {
  const { player, computer } = lastElements;

  return (
    <View style={styles.lastElementsContainer}>
      <Text style={styles.lastElementsTitle}>Últimas Jogadas</Text>
      <View style={styles.lastElementsList}>
        {computer && (
          <View style={[styles.smallElement, { backgroundColor: elementos[computer].corBase }]}>
            <Image source={elementos[computer].image} style={styles.smallImage} />
          </View>
        )}
        {player && (
          <View style={[styles.smallElement, { backgroundColor: elementos[player].corBase }]}>
            <Image source={elementos[player].image} style={styles.smallImage} />
          </View>
        )}
      </View>
    </View>
  );
};

const Runas = () => {
  const router = useRouter();
  const [lastElements, setLastElements] = useState({ player: null, computer: null });
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [round, setRound] = useState(1);
  const [playerLives, setPlayerLives] = useState(1);
  const [phase, setPhase] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const [record, setRecord] = useState({
    maxWins: 0,
    lastPlayerChoice: 'Nenhum',
    lastComputerChoice: 'Nenhum',
    mostChosenElements: {},
  });
  const [gameOver, setGameOver] = useState(false);

  const saveRecord = async (data) => {
    try {
      await AsyncStorage.setItem('@recordData', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar o recorde:', error);
    }
  };

  const loadRecord = async () => {
    try {
      const recordData = await AsyncStorage.getItem('@recordData');
      return recordData ? JSON.parse(recordData) : {
        maxWins: 0,
        lastPlayerChoice: 'Nenhum',
        lastComputerChoice: 'Nenhum',
        mostChosenElements: {},
      };
    } catch (error) {
      console.error('Erro ao carregar o recorde:', error);
      return {
        maxWins: 0,
        lastPlayerChoice: 'Nenhum',
        lastComputerChoice: 'Nenhum',
        mostChosenElements: {},
      };
    }
  };

  useEffect(() => {
    const loadGame = async () => {
      const data = await loadRecord();
      setRecord(data);
    };
    loadGame();
  }, []);

  const updateRecord = (playerElement, computerElement) => {
    setRecord(prevRecord => {
      const newMostChosenElements = { ...prevRecord.mostChosenElements };
      newMostChosenElements[playerElement] = (newMostChosenElements[playerElement] || 0) + 1;
      newMostChosenElements[computerElement] = (newMostChosenElements[computerElement] || 0) + 1;

      const newMaxWins = winStreak > prevRecord.maxWins ? winStreak : prevRecord.maxWins;

      const newRecord = {
        ...prevRecord,
        maxWins: newMaxWins,
        lastPlayerChoice: playerElement,
        lastComputerChoice: computerElement,
        mostChosenElements: newMostChosenElements,
      };

      saveRecord(newRecord);
      return newRecord;
    });
  };

  const randomComputerChoice = () => {
    const keys = Object.keys(elementos);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  const playGame = (elemento) => {
    if (gameOver) {
      return; // Não execute a lógica do jogo se o jogo está em "Game Over"
    }

    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);
    setActiveIndex(Object.keys(elementos).indexOf(elemento));

    updateRecord(elemento, computer);
    setLastElements({ player: elemento, computer });

    if (!computer) {
      setResult('Erro ao selecionar a escolha do computador.');
      return;
    }
    if (elemento === computer) {
      setResult('Empate!');
      setWinStreak(0);
    } else if (elementos[elemento].vence === computer || elementos[computer].perde === elemento) {
      setResult('Você ganhou!');
      setWinStreak(winStreak + 1);
      if (winStreak + 1 >= 2) {
        setPlayerLives(playerLives + 1);
        setWinStreak(0);
      }
      if (round % 7 === 0) {
        setPhase(phase + 1);
      }
    } else if (elementos[computer].vence === elemento || elementos[elemento].perde === computer) {
      setResult('Você perdeu!');
      setWinStreak(0);
      if (playerLives - 1 === 0) {
        setResult('Game Over');
        setGameOver(true); // Atualize o estado de gameOver
        setTimeout(() => {
          router.push('/gameover');
        }, 2000);
      } else {
        setPlayerLives(playerLives - 1);
      }
    } else {
      setResult('Reação desconhecida! Próxima rodada!!');
    }

    setRound(prevRound => prevRound + 1);

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
      disabled={playerChoice !== null || gameOver} // Desabilite o botão se o jogo estiver em "Game Over"
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
            <Image source={elementos[computerChoice].image} style={styles.image} />
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
          sliderWidth={screenWidth / 0.9}
          itemWidth={screenWidth / 3.7}
          activeSlideAlignment={'center'}
          firstItem={2}
          loop={true}
          loopClonesPerSide={9}
          onSnapToItem={(index) => setActiveIndex(index)}
          inactiveSlideScale={0.76}
          inactiveSlideOpacity={0.96}
        />
      </View>

      <LastElements lastElements={lastElements} />
    </View>
  );
};

const brightenColor = (color, percentage) => {
  const decimalPercentage = percentage / 100;
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const newR = Math.min(255, Math.floor(r + (255 - r) * decimalPercentage));
  const newG = Math.min(255, Math.floor(g + (255 - g) * decimalPercentage));
  const newB = Math.min(255, Math.floor(b + (255 - b) * decimalPercentage));

  const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

  return newColor;
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
    objectFit: 'contain',
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
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 70,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lastElementsContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    alignItems: 'flex-start',
  },
  lastElementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lastElementsList: {
    right: -25,
    top : 650,
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallElement: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  smallImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Runas;
