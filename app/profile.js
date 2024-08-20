import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { auth } from './firebaseconfig'; // ajuste o caminho conforme necessário

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissões para acessar a galeria de imagens.');
      }
    };

    getPermissions();
    
    const unsubscribe = auth.onAuthStateChanged(setUser);

    if (user) {
      fetchProfilePicture();
    }

    return () => unsubscribe();
  }, [user]);

  const fetchProfilePicture = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}profilePicture_${user.uid}.png`;
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (fileExists.exists) {
        setProfilePic(fileUri);
        setHasImage(true);
      } else {
        setProfilePic(null);
        setHasImage(false);
      }
    } catch (error) {
      console.log('Nenhuma foto de perfil encontrada, usando padrão.');
      setProfilePic(null);
      setHasImage(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        try {
          const fileUri = `${FileSystem.documentDirectory}profilePicture_${user.uid}.png`;
          await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
          });
          setProfilePic(fileUri);
          setHasImage(true);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível salvar a foto localmente.');
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a galeria de imagens.');
    }
  };

  const handleDeleteImage = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}profilePicture_${user.uid}.png`;
      await FileSystem.deleteAsync(fileUri);
      setProfilePic(null);
      setHasImage(false);
    } catch (error) {
      console.error('Erro ao excluir a imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Image
        source={profilePic ? { uri: profilePic } : require('../assets/imagens/profile.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Escolher Foto</Text>
      </TouchableOpacity>
      {hasImage && (
        <TouchableOpacity style={styles.button} onPress={handleDeleteImage}>
          <Text style={styles.buttonText}>Excluir Foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
