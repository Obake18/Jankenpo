import React, { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopupDialog from "react-native-popup-dialog";

const auth = getAuth();

export default function Lobby({ navigation }) {
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
        setDialogVisible(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setDialogVisible(false);
      }
    });

    const checkTutorialStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("@tutorialCompleted");
        if (status === "true") {
          setTutorialCompleted(true);
        }
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

  return (
    <>
      <ImageBackground
        source={require("../assets/imagens/pergaminho.png")}
        style={styles.background}
      >
        <BlurView intensity={10} style={styles.absolute}>
          <View style={styles.container}>
            <ImageBackground 
              source={require("../assets/imagens/jankenpon.png")} 
              style={styles.logo} 
            />

            {isLoggedIn ? (
              <TouchableOpacity style={styles.card}>
                <Text style={styles.profileButtonText}>Perfil</Text>
              </TouchableOpacity>
            ) : (
              <Link href="logins" asChild>
                <TouchableOpacity style={styles.card}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </Link>
            )}
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
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#8B4513",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  profileButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  logo: {
    height: 45,
    width: 250,
    resizeMode: "contain",
    marginBottom: 200,
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
    backgroundColor: "#8B4513",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  dialogButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
