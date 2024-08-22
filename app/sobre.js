import React from 'react';
import { StatusBar, ImageBackground, Linking, View, TouchableOpacity, StyleSheet, Image, Dimensions, Text } from 'react-native';
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
      const y = radius * Math.sin(i * angle) + height / 2 - pentagonSize / 2;
      return { x, y };
    });
  };

  const pentagonCoordinates = getPentagonCoordinates();

  const handlePress = (elemento) => {
    router.push({
      pathname: '/detalhes',
      params: { elemento: JSON.stringify(elemento) },
    });
  };

  return (
    <>
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/imagens/texto-sobre.png')} style={styles.logo}/>
        </View>
        <View style={styles.container}>
          <View style={styles.pentagon}>

          
          {Object.keys(elementos).map((key, index) => {
            const elemento = elementos[key];
            const { x, y } = pentagonCoordinates[index];

            if (!elemento) {
              console.error(`Elemento com a chave ${key} está indefinido.`);
              return null;
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
          </View>
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
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Certifique-se de que o contêiner é um elemento de referência para o posicionamento absoluto
  },
  runa: {
    width: pentagonSize * 0.7,
    height: pentagonSize * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: pentagonSize * 0.35,
    position: 'absolute',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  githubButton: {
    position: 'absolute',
    bottom: height * 0.05,
    width: width * 0.4,
    height: height * 0.07,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  githubText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  logo: {
    height: height * 0.2,
    width: width * 0.7,
    resizeMode: "contain",
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05, // Espaçamento abaixo do logo
  },
  pentagon:{
    padding:  10,
    position: 'absolute',
    top: height * -0.25, // Ajuste a posição para que o pentágono fique acima da tela e abaixo da imagem
    width: width,
    height: height * 0.2, // Ajuste a altura conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Garante que o pentágono está abaixo do logo
  }
});

export default Sobre;
