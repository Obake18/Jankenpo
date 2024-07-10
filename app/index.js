import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Lobby from './lobby';
import Sobre from './sobre';
import Detalhes from './detalhes';
import Jogo from './jogo';
import GameOver from './gameover';
import Tutoriais from './tutoriais';
import Recorde from './recorde';
import MultPlayer from './multplayer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="MultPlayer" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MultPlayer" component={MultPlayer} />
      <Stack.Screen name="Lobby" component={Lobby} />
      <Stack.Screen name="Tutoriais" component={Tutoriais} />
      <Stack.Screen name="Jogo" component={Jogo} />
      <Stack.Screen name="GameOver" component={GameOver} />
      <Stack.Screen name="Recorde" component={Recorde} />
      <Stack.Screen name="Sobre" component={Sobre} />
      <Stack.Screen name="Detalhes" component={Detalhes} />
    </Stack.Navigator>
  );    
}