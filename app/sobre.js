import React from 'react';
import { StatusBar, ImageBackground, View, TouchableOpacity, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { elementos } from './elementos';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const pentagonSize = width * 0.45;

const Sobre = () => {
  const router = useRouter();

  const getPentagonCoordinates = () => {
    const radius = width * 0.35;
    const angle = (2 * Math.PI) / 5;
    return Array.from({ length: 5 }, (_, i) => {
      const x = radius * Math.cos(i * angle) + width / 2 - pentagonSize / 2.5;
      const y = radius * Math.sin(i * angle) + height / 3 - pentagonSize / 1;
      return { x, y };
    });
  };

  const pentagonCoordinates = getPentagonCoordinates();

  const handlePress = (elemento) => {
    // Passando o elemento como uma string JSON na URL
    router.push({
      pathname: '/detalhes',
      params: { elemento: JSON.stringify(elemento) },
    });
  };

  return (
    <>

      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <View style= {styles.logoContainer}>
        <Image
          source={require('../assets/imagens/texto-sobre.png')} style={styles.logo}/>
      </View>
        <View style={styles.container}>
          {Object.keys(elementos).map((key, index) => {
            const elemento = elementos[key];
            const { x, y } = pentagonCoordinates[index];

            if (!elemento) {
              console.error(`Elemento com a chave ${key} está indefinido.`);
              return null; // Evita a renderização se o elemento for indefinido
            }

            return (
              <TouchableOpacity
                key={key}
                style={[styles.runa, { backgroundColor: elemento.corBase, left: x, top: y }]}
                onPress={() => handlePress(elemento)}
              >
                <Image source={elemento.image} style={styles.image} />
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity style={styles.githubButton} onPress={() => Linking.openURL('https://github.com/Obake18')}>
            <Text style={styles.githubText}>Sobre o autor</Text>
          </TouchableOpacity>
        </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runa: {
    width: pentagonSize * 0.7,
    height: pentagonSize * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: (pentagonSize * 0.7) / 2,
    position: 'absolute',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  githubButton: {
    position: 'absolute',
    bottom: 20,
    width: 150,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  githubText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  logo: {
    height: 250, // Aumente a altura conforme necessário
    width: 350,  // Aumente a largura conforme necessário
    resizeMode: "contain",
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
});


export default Sobre;
