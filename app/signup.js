import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const auth = getAuth();
const { width } = Dimensions.get('window'); // Definido corretamente

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/username'); // Navega para a tela de escolha de nome de usuário
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    }
  };

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImageBackground source={require('../assets/imagens/pergaminho-menu.png')} style={styles.scrollImage}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Criar Conta</Text>
              <View style={styles.formContent}>
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
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/logins')}>
                  <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
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
    height: '100%',
    width: width * 1.2, // Ajuste a largura da imagem de acordo com a necessidade
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '50%', // Ajustado para melhor visibilidade
    alignItems: 'center',
    backgroundColor: 'white', // Fundo branco para destaque
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adiciona uma sombra sutil
  },
  formContent: {
    width: '100%',
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
    backgroundColor: '#b94c02cf',
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
    color: '#522500e1',
    marginTop: 20,
    fontSize: 16,
  },
});
