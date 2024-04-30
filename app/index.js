import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Jogo from './jogo.js';
import GameOver from './gameover.js';
import Tutoriais from './tutoriais.js';
import Recorde from './recorde.js'; // Importe o componente Recorde.js

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Tutoriais" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tutoriais" component={Tutoriais} />
      <Stack.Screen name="Jogo" component={Jogo} />
      <Stack.Screen name="GameOver" component={GameOver} />
      <Stack.Screen name="Recorde" component={Recorde} />
    </Stack.Navigator>
  );
}
