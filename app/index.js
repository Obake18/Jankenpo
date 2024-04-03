// index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Jogo from './jogo.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName="Jogo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Jogo" component={Jogo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
