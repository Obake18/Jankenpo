import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tutoriais" options={{ headerShown: false }} />
      <Stack.Screen name="jogo" options={{ headerShown: false }} />
      <Stack.Screen name="recorde" options={{ headerShown: false }} />    
    </Stack>
  );
}
