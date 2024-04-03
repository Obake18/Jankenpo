import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

  const randomComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(elementos).length);
    return elementos[Object.keys(elementos)[randomIndex]];
  };

  useEffect(() => {
    // Simulação de escolha da máquina após 2 segundos
    const timer = setTimeout(() => {
      setComputerChoice(randomComputerChoice());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const playGame = (elemento) => {
    const computer = randomComputerChoice();
    setPlayerChoice(elemento);
    setComputerChoice(computer);

    if (!computer) {
      setResult('Erro ao selecionar a escolha do computador.');
      return;
    }

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
      <ScrollView horizontal style={styles.machineChoices}>
        {Object.keys(elementos).map((elemento, index) => (
          <Runa key={index} elemento={elemento} selecionado={elemento === computerChoice} />
        ))}
      </ScrollView>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.playerChoices}>
        {Object.keys(elementos).map((elemento, index) => {
          const angle = (index * (360 / Object.keys(elementos).length)) - 90; // Ângulo para dispor as runas em um círculo
          const radius = 150; // Raio do círculo
          const x = radius * Math.cos((angle * Math.PI) / 180); // Coordenada x do centro do círculo
          const y = radius * Math.sin((angle * Math.PI) / 180); // Coordenada y do centro do círculo

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.runaContainer,
                { transform: [{ translateX: x }, { translateY: y }] }
              ]}
              onPress={() => playGame(elemento)}
              disabled={playerChoice !== null}
            >
              <Runa elemento={elemento} selecionado={elemento === playerChoice} />
            </TouchableOpacity>
          );
        })}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  machineChoices: {
    height: 100,
    marginBottom: 20,
  },
  playerChoices: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    color: '#000',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Runas;
