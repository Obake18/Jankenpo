import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tutoriais" options={{ headerShown: false }} />
      <Stack.Screen name="jogo" options={{ headerShown: false }} />
      <Stack.Screen name="logins" options={{ headerShown: false }} />
      <Stack.Screen name="gameover" options={{ headerShown: false }} />
      <Stack.Screen name="recorde" options={{ headerShown: false }} />  
      <Stack.Screen name="sobre" options={{ headerShown: false }} /> 
      <Stack.Screen name="detalhes" options={{ headerShown: false }} /> 
    </Stack>
  );
}
