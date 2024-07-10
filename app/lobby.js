import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Lobby({ navigation }) {
    return (
        <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Bem-vindo ao Jankenpon!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Tutoriais')}
                >
                    <Text style={styles.buttonText}>Iniciar Tutorial</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Jogo')}
                >
                    <Text style={styles.buttonText}>Continuar Jogo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Recorde')}
                >
                    <Text style={styles.buttonText}>Ver Recordes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Sobre')}
                >
                    <Text style={styles.buttonText}>Info.</Text>
                </TouchableOpacity>


            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Cobrir toda a área
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#8B4513',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

