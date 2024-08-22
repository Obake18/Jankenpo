import React from 'react';
import { StatusBar, ImageBackground, View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Detalhes = () => {
  const { elemento } = useLocalSearchParams(); // Use useLocalSearchParams para acessar o parâmetro da rota

  const parsedElemento = elemento ? JSON.parse(elemento) : null; // Converte a string JSON de volta para um objeto

  if (!parsedElemento) {
    return (
      <View style={styles.container}>
        <Text>Detalhes não disponíveis.</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={[styles.runa, { backgroundColor: parsedElemento.corBase }]}>
            <Image source={parsedElemento.image} style={styles.image} />
          </View>
          <View style={styles.kamuyContainer}>
            <Image source={parsedElemento.kamuyImage} style={styles.kamuyImage} />
          </View>
        </View>
        <Text style={styles.title}>{parsedElemento.nome}</Text>
        <Text style={styles.kanji}>{parsedElemento.kanji}</Text>

        <Text style={styles.sectionTitle}>História</Text>
        <Text style={styles.description}>{parsedElemento.descricao.historia}</Text>

        <Text style={styles.sectionTitle}>Representação</Text>
        <Text style={styles.description}>{parsedElemento.descricao.representacao}</Text>

        <Text style={styles.sectionTitle}>Fraquezas e Forças</Text>
        <Text style={styles.description}>{parsedElemento.descricao.fraquezasForcas}</Text>

        <Text style={styles.combatInfo}>
          {parsedElemento.nome} vence {parsedElemento.vence} e perde para {parsedElemento.perde}.
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05, // Espaçamento responsivo
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Alinha os itens ao centro
    marginBottom: height * 0.02,
    width: '100%',
    maxWidth: width * 0.9, // Limita a largura máxima
  },
  runa: {
    width: width * 0.3, // Tamanho responsivo
    height: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: width * 0.15, // Responsivo
    marginRight: width * 0.03, // Espaçamento responsivo
    position: 'relative',
    bottom : height * 0.1,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: "Shojumaru_400Regular",
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  kanji: {
    fontSize: width * 0.08,
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontFamily: "Shojumaru_400Regular",
    fontSize: width * 0.05,
    marginBottom: height * 0.01,
    marginTop: height * 0.03,
  },
  description: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: height * 0.02,
    lineHeight: width * 0.05, // Ajusta o espaçamento das linhas
  },
  combatInfo: {
    fontSize: width * 0.04,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: height * 0.02,
  },
  kamuyContainer: {
    width: width * 0.6,
    height: height * 0.59,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kamuyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Detalhes;
