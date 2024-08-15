// detalhes.js
import React from 'react';
import { StatusBar, ImageBackground, View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Detalhes = ({ route }) => {
  const { elemento } = route.params;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#000000" />
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.runa, { backgroundColor: elemento.corBase }]}>
            <Image source={elemento.image} style={styles.image} />
          </View>
          <View style={styles.kamuyContainer}>
            <Image source={elemento.kamuyImage} style={styles.kamuyImage} />
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

          {/* Imagem do Kamuy */}

        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cobrir toda a área
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 190,
    height: 190,
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
  kamuyContainer: {
    width: '100%',
    height:'auto',
    marginTop: 30,
    alignItems: 'center',
  },
  kamuyImage: {
    width: 250,
    height: 150,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Detalhes;
