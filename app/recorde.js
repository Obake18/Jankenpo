import React, { useState, useEffect } from 'react';
import { StatusBar, ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from './firebaseconfig'; // Ajuste o caminho conforme necessário
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Importando useRouter

const Recorde = () => {
  const router = useRouter(); // Inicializando o useRouter
  const [maxWins, setMaxWins] = useState(0);
  const [lastPlayerChoice, setLastPlayerChoice] = useState('Nenhum');
  const [lastComputerChoice, setLastComputerChoice] = useState('Nenhum');
  const [mostChosenElements, setMostChosenElements] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        await loadRecord(user.uid);
      } else {
        console.error('Usuário não autenticado');
      }
    };

    loadUser();
  }, []);

  const loadRecord = async (userId) => {
    try {
      // Carregar dados do AsyncStorage
      const recordData = await AsyncStorage.getItem('@recordData');
      if (recordData) {
        const { maxWins, lastPlayerChoice, lastComputerChoice, mostChosenElements } = JSON.parse(recordData);
        setMaxWins(maxWins || 0);
        setLastPlayerChoice(lastPlayerChoice || 'Nenhum');
        setLastComputerChoice(lastComputerChoice || 'Nenhum');
        setMostChosenElements(mostChosenElements || {});
      }

      // Carregar dados do Firebase
      const docRef = doc(db, 'recordData', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMaxWins(data.maxWins || 0);
        setLastPlayerChoice(data.lastPlayerChoice || 'Nenhum');
        setLastComputerChoice(data.lastComputerChoice || 'Nenhum');
        setMostChosenElements(data.mostChosenElements || {});
      }
    } catch (error) {
      console.error('Erro ao carregar o recorde:', error);
    }
  };

  const saveRecord = async () => {
    if (userId) {
      try {
        // Salvar dados no Firebase
        await setDoc(doc(db, 'recordData', userId), {
          maxWins,
          lastPlayerChoice,
          lastComputerChoice,
          mostChosenElements
        });

        // Salvar dados no AsyncStorage
        await AsyncStorage.setItem('@recordData', JSON.stringify({
          maxWins,
          lastPlayerChoice,
          lastComputerChoice,
          mostChosenElements
        }));
      } catch (error) {
        console.error('Erro ao salvar o recorde:', error);
      }
    }
  };

  useEffect(() => {
    saveRecord();
  }, [maxWins, lastPlayerChoice, lastComputerChoice, mostChosenElements]);

  const navigateBackToGame = () => {
    router.push('/'); // Atualizado para usar router.push
  };

  return (
    <>

      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Recordes</Text>
          <View style={styles.card}>
            <Text style={styles.recordText}>Maior número de vitórias consecutivas:</Text>
            <Text style={styles.recordValue}>{maxWins}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.recordText}>Última escolha do jogador:</Text>
            <Text style={styles.recordValue}>{lastPlayerChoice}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.recordText}>Última escolha do computador:</Text>
            <Text style={styles.recordValue}>{lastComputerChoice}</Text>
          </View>
          <View style={styles.mostChosenContainer}>
            <Text style={styles.sectionTitle}>Elementos mais escolhidos:</Text>
            {Object.entries(mostChosenElements).map(([elemento, frequencia]) => (
              <View key={elemento} style={styles.elementRow}>
                <Text style={styles.recordText}>{elemento}</Text>
                <Text style={styles.recordValue}>{frequencia}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={navigateBackToGame}>
            <Text style={styles.buttonText}>Voltar para o Jogo</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFFFFF80',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  recordText: {
    fontSize: 18,
    color: '#333',
  },
  recordValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  mostChosenContainer: {
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Recorde;
