import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupDialog from 'react-native-popup-dialog';

const auth = getAuth();

export default function Lobby({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        setDialogVisible(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setDialogVisible(false);
      }
    });

    const checkTutorialStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('@tutorialCompleted');
        if (status === 'true') {
          setTutorialCompleted(true);
        }
      } catch (error) {
        console.error('Erro ao verificar o status do tutorial:', error);
      }
    };

    checkTutorialStatus();

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setDialogVisible(false);
      Alert.alert('Desconectado', 'Você foi desconectado com sucesso.');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <>
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <BlurView intensity={10} style={styles.absolute}>
          <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Jankenpon!</Text>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Tutoriais')}
            >
              <Text style={styles.cardText}>Iniciar Tutorial</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, !tutorialCompleted && { backgroundColor: '#ccc' }]}
              onPress={() => tutorialCompleted ? navigation.navigate('Jogo') : Alert.alert('Tutorial Incompleto', 'Por favor, complete o tutorial primeiro.')}
              disabled={!tutorialCompleted}
            >
              <Text style={styles.cardText}>Continuar Jogo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Recorde')}
            >
              <Text style={styles.cardText}>Ver Recordes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Sobre')}
            >
              <Text style={styles.cardText}>Info.</Text>
            </TouchableOpacity>

            {isLoggedIn ? (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                <Text style={styles.profileButtonText}>Perfil</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </BlurView>
      </ImageBackground>

      {dialogVisible && (
        <PopupDialog
          visible={dialogVisible}
          onTouchOutside={() => setDialogVisible(false)}
          dialogStyle={styles.dialog}
        >
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Bem-vindo de volta!</Text>
            <TouchableOpacity style={styles.dialogButton} onPress={handleSignOut}>
              <Text style={styles.dialogButtonText}>Deslogar</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    marginBottom: 40,
    color: '#000',
  },
  card: {
    backgroundColor: '#8B4513',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 18,
    color: '#FFF',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  profileButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  dialog: {
    borderRadius: 10,
    padding: 20,
  },
  dialogContainer: {
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dialogButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  dialogButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
