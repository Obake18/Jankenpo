import React from 'react';
import { StatusBar, ImageBackground, View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

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
    <>

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
    </>
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
    padding: 20,
  },
  contentContainer: {
    top : 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end', // Alinha os itens na parte inferior
    marginBottom: 20,
  },
  runa: {
    bottom : 60,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 100,
    marginRight: 10, // Adiciona um espaço entre a runa e o kamuy
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: "Shojumaru_400Regular",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  kanji: {
    fontSize: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Shojumaru_400Regular",
    fontSize: 20,
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
    width: 250,
    height: 350,
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
