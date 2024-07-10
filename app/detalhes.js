// detalhes.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Detalhes = ({ route }) => {
  const { elemento } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.runa, { backgroundColor: elemento.corBase }]}>
        <Image source={elemento.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{elemento.nome}</Text>
      <Text style={styles.kanji}>{elemento.kanji}</Text>

      <Text style={styles.sectionTitle}>História</Text>
      <Text style={styles.description}>{elemento.descricao.historia}</Text>

      <Text style={styles.sectionTitle}>Representação</Text>
      <Text style={styles.description}>{elemento.descricao.representacao}</Text>

      <Text style={styles.sectionTitle}>Fraquezas e Forças</Text>
      <Text style={styles.description}>{elemento.descricao.fraquezasForcas}</Text>

      <Text style={styles.combatInfo}>
        {elemento.nome} vence {elemento.vence} e perde para {elemento.perde}.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  runa: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 100,
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  kanji: {
    fontSize: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  combatInfo: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Detalhes;
