import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Shojumaru_400Regular, useFonts } from '@expo-google-fonts/shojumaru';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

// Previne o auto-hide da tela de splash
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Carrega a fonte Shojumaru
  const [loaded, error] = useFonts({
    Shojumaru_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tutoriais" options={{ headerShown: false }} />
        <Stack.Screen name="jogo" options={{ headerShown: false }} />
        <Stack.Screen name="logins" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="username" options={{ headerShown: false }} />
        <Stack.Screen name="gameover" options={{ headerShown: false }} />
        <Stack.Screen name="recorde" options={{ headerShown: false }} />
        <Stack.Screen name="sobre" options={{ headerShown: false }} />
        <Stack.Screen name="detalhes" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
