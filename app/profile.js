import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from './firebaseConfig'; // ajuste o caminho conforme necessário
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    if (user) {
      fetchProfilePicture();
    }

    return () => unsubscribe();
  }, [user]);

  const fetchProfilePicture = async () => {
    try {
      const storageRef = ref(storage, `profile_pictures/${user.uid}.png`);
      const url = await getDownloadURL(storageRef);
      setProfilePic(url);
      setHasImage(true);
    } catch (error) {
      console.log('No profile picture found, using default.');
      setProfilePic(null);
      setHasImage(false);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profile_pictures/${user.uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.error('Upload error:', error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setProfilePic(url);
          setHasImage(true);
        } catch (error) {
          console.error('Error fetching download URL:', error);
        }
      }
    );
  };

  const handleDeleteImage = async () => {
    const storageRef = ref(storage, `profile_pictures/${user.uid}.png`);
    try {
      await deleteObject(storageRef);
      setProfilePic(null);
      setHasImage(false);
    } catch (error) {
      console.error('Error deleting image:', error);
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
