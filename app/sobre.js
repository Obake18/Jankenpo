// sobre.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { elementos } from './elementos'; // Certifique-se de ajustar o caminho conforme necessário

const { width } = Dimensions.get('window');
const pentagonSize = 120; // Tamanho das esferas

const Sobre = ({ navigation }) => {
  // Função para calcular a posição das esferas em um pentágono
  const getPentagonCoordinates = () => {
    const radius = width / 2 - pentagonSize;
    const angle = (2 * Math.PI) / 5;
    return Array.from({ length: 5 }, (_, i) => {
      const x = radius * Math.cos(i * angle) + width / 2 - pentagonSize / 2;
      const y = radius * Math.sin(i * angle) + width / 2 - pentagonSize / 2;
      return { x, y };
    });
  };

  const pentagonCoordinates = getPentagonCoordinates();

  return (
    <View style={styles.container}>
      {Object.keys(elementos).map((key, index) => {
        const elemento = elementos[key];
        const { x, y } = pentagonCoordinates[index];
        return (
          <TouchableOpacity
            key={key}
            style={[styles.runa, { backgroundColor: elemento.corBase, left: x, top: y }]}
            onPress={() => navigation.navigate('Detalhes', { elemento })}
          >
            <Image source={elemento.image} style={styles.image} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  runa: {
    width: pentagonSize,
    height: pentagonSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: pentagonSize / 2,
    position: 'absolute',
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default Sobre;
