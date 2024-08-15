import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import PopupDialog from 'react-native-popup-dialog';

const auth = getAuth();

export default function Profile({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Desconectado', 'Você foi desconectado com sucesso.');
      navigation.navigate('LoginScreen'); // Navega para a tela de login após o logout
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (user) {
        await deleteUser(user);
        Alert.alert('Conta Deletada', 'Sua conta foi deletada com sucesso.');
        navigation.navigate('LoginScreen'); // Navega para a tela de login após deletar a conta
      }
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      Alert.alert('Erro', 'Não foi possível deletar a conta.');
    }
  };

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <BlurView intensity={10} style={styles.absolute}>
        <View style={styles.container}>
          <Text style={styles.title}>Perfil</Text>

          {isLoggedIn ? (
            <View style={styles.profileContainer}>
              <Text style={styles.profileTitle}>Olá, {user ? user.displayName || 'Usuário' : 'Usuário'}!</Text>
              <Text style={styles.profileEmail}>{user ? user.email : 'Não disponível'}</Text>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleSignOut}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => setDialogVisible(true)}
              >
                <Text style={styles.deleteButtonText}>Deletar Conta</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </BlurView>

      {dialogVisible && (
        <PopupDialog
          visible={dialogVisible}
          onTouchOutside={() => setDialogVisible(false)}
          dialogStyle={styles.dialog}
        >
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Você tem certeza?</Text>
            <Text style={styles.dialogText}>Deseja realmente deletar sua conta?</Text>
            <TouchableOpacity style={styles.dialogButton} onPress={handleDeleteAccount}>
              <Text style={styles.dialogButtonText}>Sim, deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dialogButton} onPress={() => setDialogVisible(false)}>
              <Text style={styles.dialogButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      )}
    </ImageBackground>
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
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  logoutButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
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
    marginBottom: 10,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 20,
  },
  dialogButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  dialogButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
