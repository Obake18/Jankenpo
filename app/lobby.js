import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function Lobby({ navigation }) {
    return (
        <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
            <BlurView intensity={10} style={styles.absolute}>
                <View style={styles.container}>
                    <Text style={styles.title}>Bem-vindo ao Jankenpon!</Text>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Tutoriais')}
                    >
                        <Text style={styles.cardText}>Iniciar Tutorial</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Jogo')}
                    >
                        <Text style={styles.cardText}>Continuar Jogo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Recorde')}
                    >
                        <Text style={styles.cardText}>Ver Recordes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Sobre')}
                    >
                        <Text style={styles.cardText}>Info.</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#000',
    },
    card: {
        backgroundColor: '#8B4513',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    cardText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
