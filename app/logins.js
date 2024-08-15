import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!user.displayName) {
          navigation.navigate('ChooseUsername'); // Redireciona para escolher o nome de usuário
        } else {
          navigation.navigate('Home'); // Navega para a tela inicial ou outra página
        }
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível fazer o login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.linkText}>Não tem uma conta? Crie uma</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  linkText: {
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
  },
});
