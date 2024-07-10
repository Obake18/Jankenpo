import React from 'react';
import { ImageBackground, View, TouchableOpacity, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import { elementos } from './elementos'; // Certifique-se de ajustar o caminho conforme necessário

const { width } = Dimensions.get('window');
const pentagonSize = 120; // Tamanho das esferas

const Sobre = ({ navigation }) => {
    // Função para calcular a posição das esferas em um pentágono
    const getPentagonCoordinates = () => {
        const radius = width / 2 - pentagonSize;
        const angle = (2 * Math.PI) / 5;
        return Array.from({ length: 5 }, (_, i) => {
            const x = radius * Math.cos(i * angle) + width / 2 - pentagonSize / 2;
            const y = radius * Math.sin(i * angle) + width / 2 - pentagonSize / 2;
            return { x, y };
        });
    };

    const pentagonCoordinates = getPentagonCoordinates();

    // Função para abrir o perfil do GitHub
    const openGitHubProfile = () => {
        Linking.openURL('https://github.com/Obake18');
    };

    return (
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
        width: pentagonSize,
        height: pentagonSize,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: pentagonSize / 2,
        position: 'absolute',
    },
    image: {
        width: '90%',
        height: '90%',
    },
    githubButton: {
        width: 120, // Ajuste o tamanho conforme necessário
        height: 120, // Ajuste o tamanho conforme necessário
        marginTop: '170%', // Ajuste o espaço conforme necessário
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 30, // Ajuste o arredondamento conforme necessário
    },
    githubIcon: {
        width: '90%',
        height: '90%',
    },
});

export default Sobre;
