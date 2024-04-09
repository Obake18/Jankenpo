import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Jogo from './jogo.js';
import GameOver from './gameover.js'; // Certifique-se de que este componente existe e está sendo exportado corretamente

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Jogo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Jogo" component={Jogo} />
        <Stack.Screen name="GameOver" component={GameOver} /> {/* Adicione a tela GameOver aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
