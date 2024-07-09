import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Lobby from './lobby.js'; 
import Jogo from './jogo.js';
import GameOver from './gameover.js';
import Tutoriais from './tutoriais.js';
import Recorde from './recorde.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Lobby" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lobby" component={Lobby} />
      <Stack.Screen name="Tutoriais" component={Tutoriais} />
      <Stack.Screen name="Jogo" component={Jogo} />
      <Stack.Screen name="GameOver" component={GameOver} />
      <Stack.Screen name="Recorde" component={Recorde} />
    </Stack.Navigator>
  );
}
