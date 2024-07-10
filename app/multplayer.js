import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const SERVER_URL = 'http://192.168.1.100:8080'; // Substitua pelo IP real do servidor

const MultPlayer = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('playerDiscovery', (player) => {
      console.log('Player discovery event:', player);
      setPlayers((prevPlayers) => {
        // Atualize a lista de jogadores
        const updatedPlayers = prevPlayers.filter(p => p.id !== player.id);
        if (!player.disconnected) {
          updatedPlayers.push(player);
        }
        return updatedPlayers;
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players in the Lobby:</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playerContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  playerName: {
    fontSize: 18,
  },
});

export default MultPlayer;
