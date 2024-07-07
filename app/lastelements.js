import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { elementos } from './elementos';

const LastElements = ({ playerChoice, computerChoice }) => {
  console.log('Player Choice:', playerChoice);
  console.log('Computer Choice:', computerChoice);

  // Filtra os elementos não definidos e cria uma lista
  const elements = [playerChoice, computerChoice].filter(Boolean);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimos Elementos Jogados:</Text>
      {elements.length === 0 ? (
        <Text>Nenhum elemento jogado ainda.</Text>
      ) : (
        elements.map((elemento, index) => (
          <View key={index} style={styles.elementContainer}>
            {elementos[elemento]?.image ? (
              <Image source={elementos[elemento]?.image} style={styles.image} />
            ) : (
              <Text>Imagem não disponível</Text>
            )}
            <Text style={styles.elementText}>{elemento}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  elementText: {
    fontSize: 16,
  },
});

export default LastElements;
