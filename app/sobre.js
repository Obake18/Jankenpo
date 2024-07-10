import React from 'react';
import { StatusBar, ImageBackground, View, TouchableOpacity, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import { elementos } from './elementos';

const { width, height } = Dimensions.get('window');
const pentagonSize = width * 0.45; // Ajuste do tamanho das esferas baseado na largura da tela

const Sobre = ({ navigation }) => {
    // Função para calcular a posição das esferas em um pentágono
    const getPentagonCoordinates = () => {
        const radius = (width * 0.35); // Ajuste o raio para centralizar o pentágono
        const angle = (2 * Math.PI) / 5;
        return Array.from({ length: 5 }, (_, i) => {
            const x = radius * Math.cos(i * angle) + width / 2 - pentagonSize / 2.5;
            const y = radius * Math.sin(i * angle) + height / 2 - pentagonSize / 1; // Ajuste para centralizar verticalmente
            return { x, y };
        });
    };

    const pentagonCoordinates = getPentagonCoordinates();

    // Função para abrir o perfil do GitHub
    const openGitHubProfile = () => {
        Linking.openURL('https://github.com/Obake18');
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <ImageBackground source={require('../assets/imagens/pergaminho.png')} style={styles.background}>
                <View style={styles.container}>
                    {Object.keys(elementos).map((key, index) => {
                        const elemento = elementos[key];
                        const { x, y } = pentagonCoordinates[index];
                        return (
                            <TouchableOpacity
                                key={key}
                                style={[styles.runa, { backgroundColor: elemento.corBase, left: x, top: y }]}
                                onPress={() => navigation.navigate('Detalhes', { elemento })}
                            >
                                <Image source={elemento.image} style={styles.image} />
                            </TouchableOpacity>
                        );
                    })}

                    {/* Botão para abrir o perfil do GitHub */}
                    <TouchableOpacity style={styles.githubButton} onPress={openGitHubProfile}>
                        <Image source={require('../assets/icons/github.png')} style={styles.githubIcon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
};

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
    runa: {
        width: pentagonSize * 0.7, // Ajuste proporcional ao tamanho do pentágono
        height: pentagonSize * 0.7, // Ajuste proporcional ao tamanho do pentágono
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: (pentagonSize * 0.7) / 2,
        position: 'absolute',
    },
    image: {
        width: '90%',
        height: '90%',
    },
    githubButton: {
        bottom: 20, // Ajuste o espaço conforme necessário
        width: 60, // Ajuste o tamanho conforme necessário
        height: 60, // Ajuste o tamanho conforme necessário
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 30, // Ajuste o arredondamento conforme necessário
    },
    githubIcon: {
        width: '100%',
        height: '100%',
    },
});

export default Sobre;
