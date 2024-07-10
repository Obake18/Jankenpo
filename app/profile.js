
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [name, setName] = useState('');
  const [photoUri, setPhotoUri] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('profileName');
        const storedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (storedName) setName(storedName);
        if (storedPhoto) setPhotoUri(storedPhoto);
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };
    loadProfile();
  }, []);

  const handleNameChange = async (newName) => {
    try {
      await AsyncStorage.setItem('profileName', newName);
      setName(newName);
    } catch (error) {
      console.error('Failed to save name', error);
    }
  };

  const handlePhotoPick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Oh! Precisamos que você nos permita ver sua foto. . .');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        await AsyncStorage.setItem('profilePhoto', result.uri);
        setPhotoUri(result.uri);
      } catch (error) {
        console.error('Failed to save photo', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={handlePhotoPick} style={styles.photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <Text>Select a Photo</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Seu nome de xamã é. . ."
        value={name}
        onChangeText={handleNameChange}
      />
      <Button title="Save" onPress={() => handleNameChange(name)} />
      <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Photo URI: {photoUri}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 60,
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Profile;
