import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Jogo from './jogo.js';
import GameOver from './gameover.js';
import Tutoriais from './tutoriais.js'; // Certifique-se de que o caminho para tutoriais.js está correto

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName="Tutoriais" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tutoriais" component={Tutoriais} />
        <Stack.Screen name="Jogo" component={Jogo} />
        <Stack.Screen name="GameOver" component={GameOver} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
