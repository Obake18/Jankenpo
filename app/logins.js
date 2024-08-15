import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import PopupDialog from 'react-native-popup-dialog';

const auth = getAuth();
const db = getFirestore();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        navigation.navigate('Recorde'); // Navega para a tela de recordes se o usuário estiver logado
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    if (userId) {
      // Se o usuário já estiver logado, exibe o pop-up em vez de navegar
      setDialogVisible(true);
      return;
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserId(user.uid);
      navigation.navigate('Recorde'); // Navega para a tela de recordes após o login
    } catch (error) {
      setErrorMessage('Senha ou e-mail incorretos.');
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserId(user.uid);
      // Criação de documento no Firestore para o novo usuário
      await setDoc(doc(db, 'users', user.uid), { email }, { merge: true });
      navigation.navigate('Recorde'); // Navega para a tela de recordes após a criação
    } catch (error) {
      setErrorMessage('Erro ao criar conta.');
      console.error('Erro ao criar conta:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserId(null);
      setDialogVisible(false);
      Alert.alert('Desconectado', 'Você foi desconectado com sucesso.');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('E-mail Enviado', 'Instruções para redefinir a senha foram enviadas para o seu e-mail.');
    } catch (error) {
      setErrorMessage('Erro ao enviar e-mail de redefinição de senha.');
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Fazer Login" onPress={handleLogin} />
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Esqueci a Senha</Text>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
        </View>
      </ImageBackground>

      <PopupDialog
        visible={dialogVisible}
        onTouchOutside={() => setDialogVisible(false)}
        dialogStyle={styles.dialog}
      >
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Você já está logado!</Text>
          <TouchableOpacity style={styles.dialogButton} onPress={handleSignOut}>
            <Text style={styles.dialogButtonText}>Deslogar</Text>
          </TouchableOpacity>
        </View>
      </PopupDialog>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
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

export default LoginScreen;
