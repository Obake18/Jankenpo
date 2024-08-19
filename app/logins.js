import React, { useState, useEffect } from 'react';
import { StatusBar, ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const auth = getAuth();
const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (!user.displayName) {
          router.push('/username');
        } else {
          router.push('/lobby');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível fazer o login.');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ImageBackground source={require('../assets/imagens/pergaminho-menu.png')} style={styles.scrollImage}>
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
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.linkText}>Não tem uma conta? Crie uma</Text>
              </TouchableOpacity>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollImage: {
    width: width * 0.8, // 80% da largura da tela
    aspectRatio: 1, // Mantém a proporção da imagem
    padding: 20,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#8B4513',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#8B4513',
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#ADD8E6',
    marginTop: 20,
    fontSize: 16,
  },
});

