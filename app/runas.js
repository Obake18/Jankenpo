import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { elementos } from './elementos';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <Text style={styles.title}>Últimos Elementos Jogados:</Text>
      {player || computer ? (
        <>
          {computer && (
            <View style={styles.elementContainer}>
              {elementos[computer]?.image ? (
                <Image source={elementos[computer]?.image} style={styles.image} />
              ) : (
                <Text>Imagem não disponível</Text>
              )}
              <Text>{computer}</Text>
            </View>
          )}
          {player && (
            <View style={styles.elementContainer}>
              {elementos[player]?.image ? (
                <Image source={elementos[player]?.image} style={styles.image} />
              ) : (
                <Text>Imagem não disponível</Text>
              )}
              <Text>{player}</Text>
            </View>
          )}
        </>
      ) : (
        <Text>Nenhum elemento jogado ainda.</Text>
      )}
    </View>
  );
};

const Runas = () => {
  const navigation = useNavigation();
  const [lastElements, setLastElements] = useState({ player: null, computer: null });
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [round, setRound] = useState(1);
  const [playerLives, setPlayerLives] = useState(5);
  const [phase, setPhase] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [winStreak, setWinStreak] = useState(0);

  const [record, setRecord] = useState({
    maxWins: 0,
    lastPlayerChoice: 'Nenhum',
    lastComputerChoice: 'Nenhum',
    mostChosenElements: {},
  });

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
    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);
    setActiveIndex(Object.keys(elementos).indexOf(elemento));

    updateRecord(elemento, computer);

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
        navigation.navigate('GameOver', { resetGame });
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
            <Image source={elementos[computerChoice].image} style={styles.image} />
          </View>
        )}
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.title}>Rodada {round}</Text>
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.title}>Vidas: {'❤️'.repeat(playerLives)}</Text>
        <Text style={styles.title}>Fase: {phase}</Text>
        <View style={styles.container}>
          <LastElements lastElements={lastElements} />
        </View>
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
    width: '60%',
    alignItems: 'center',
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Runas;
