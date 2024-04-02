import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Jogo() {
  return (
    <View style={styles.container}>
      {/* Aqui você pode adicionar os componentes da sua tela */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DEB3', // Cor de fundo semelhante ao papel antigo
    alignItems: 'center',
    justifyContent: 'center',
  },
});
