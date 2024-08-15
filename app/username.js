import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';

const auth = getAuth();

export default function ChooseUsername({ navigation }) {
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
      navigation.navigate('Home'); // Navega para a tela inicial ou outra tela após a configuração do nome de usuário
    } catch (error) {
      console.error('Erro ao atualizar nome de usuário:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o nome de usuário.');
    }
  };

  return (
    <View style={styles.container}>
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
});
