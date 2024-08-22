import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopupDialog from "react-native-popup-dialog";

const auth = getAuth();
const { width, height } = Dimensions.get("window");

export default function Lobby() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    const checkTutorialStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("@tutorialCompleted");
        setTutorialCompleted(status === "true");
      } catch (error) {
        console.error("Erro ao verificar o status do tutorial:", error);
      }
    };

    checkTutorialStatus();

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setDialogVisible(false);
      Alert.alert("Desconectado", "Você foi desconectado com sucesso.");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const navigateToScreen = (screen) => {
    if (screen === 'game' && !tutorialCompleted) {
      Alert.alert('Acesso Negado', 'Você precisa completar o tutorial antes de acessar o jogo.');
    } else {
      router.push(screen);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/imagens/pergaminho.png")}
        style={styles.background}
      >
        <BlurView intensity={10} style={styles.absolute}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={() => router.push('logins')}
            >
              <Text style={styles.menuText}>
                {isLoggedIn ? 'Perfil' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <ImageBackground 
              source={require("../assets/imagens/jankenpon.png")} 
              style={styles.logo} 
            />

            <ImageBackground 
              source={require("../assets/imagens/pergaminho-menu.png")} 
              style={[styles.scrollImage, { height: height * 1.2 }]} 
              imageStyle={styles.scrollImageInner}
            >
              <View style={styles.cardsContainer}>
                <TouchableOpacity 
                  style={[styles.card, { width: width * 0.5 }]} 
                  onPress={() => router.push('tutoriais')}
                >
                  <Text style={styles.cardText}>Tutoriais</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.card, { width: width * 0.5 }]} 
                  onPress={() => navigateToScreen('jogo')}
                >
                  <Text style={styles.cardText}>Jogo</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.card, { width: width * 0.5 }]} 
                  onPress={() => router.push('recorde')}
                >
                  <Text style={styles.cardText}>Recordes</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.card, { width: width * 0.5 }]} 
                  onPress={() => router.push('sobre')}
                >
                  <Text style={styles.cardText}>Sobre</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </BlurView>
      </ImageBackground>

      {dialogVisible && (
        <PopupDialog
          visible={dialogVisible}
          onTouchOutside={() => setDialogVisible(false)}
          dialogStyle={styles.dialog}
        >
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Bem-vindo de volta!</Text>
            <TouchableOpacity
              style={styles.dialogButton}
              onPress={handleSignOut}
            >
              <Text style={styles.dialogButtonText}>Deslogar</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center", 
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  menuButton: {
    backgroundColor: "rgba(139, 69, 19, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  menuText: {
    fontFamily: "Shojumaru_400Regular",
    color: "#FFF",
    fontSize: 16,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
    padding: 20,
  },
  logo: {
    padding: 20,
    height: height * 0.09, 
    width: width * 0.8, 
    resizeMode: "contain",
    marginBottom: -270,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollImage: {
    marginBottom: -270,
    width: width * 1.2, 
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollImageInner: {
    resizeMode: 'contain',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 10,
  },
  card: {
    backgroundColor: "#FFF", 
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontFamily: "Shojumaru_400Regular",
    fontSize: 18,
    color: "#8B4513", 
  },
  dialog: {
    borderRadius: 10,
    padding: 20,
  },
  dialogContainer: {
    alignItems: "center",
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dialogButton: {
    backgroundColor: "rgba(139, 69, 19, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  dialogButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
