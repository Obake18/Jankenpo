import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { useRouter } from 'expo-router';

const auth = getAuth();

export default function ChooseUsername() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleSaveUsername = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Nenhum usuário encontrado.');
      return;
    }

    try {
      await updateProfile(user, { displayName: `@${username}` });
      Alert.alert('Sucesso', 'Nome de usuário atualizado com sucesso.');
      router.push('/lobby'); // Navega para a tela inicial ou outra tela após a configuração do nome de usuário
    } catch (error) {
      console.error('Erro ao atualizar nome de usuário:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o nome de usuário.');
    }
  };

  return (
    <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ImageBackground source={require('../assets/imagens/pergaminho-menu.png')} style={styles.scrollImage}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Escolha um Nome de Usuário</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário (sem espaços)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.button} onPress={handleSaveUsername}>
                <Text style={styles.buttonText}>Salvar Nome de Usuário</Text>
              </TouchableOpacity>
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
    width: '100%', // Ajusta para ocupar a largura total
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 20,
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
});
