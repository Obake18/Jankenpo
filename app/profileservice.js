import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from './firebaseconfig'; // ajuste o caminho conforme necessário

export const uploadProfilePicture = async (uri) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(getStorage(), `profile_pictures/${user.uid}/profile.png`);
  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Opcional: Verificar o progresso do upload
      },
      (error) => {
        console.error('Erro ao fazer upload da imagem:', error);
        reject('Não foi possível fazer o upload da foto.');
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, { profilePicture: url }, { merge: true });
          resolve(url);
        } catch (error) {
          console.error('Erro ao obter URL da imagem:', error);
          reject('Não foi possível obter a URL da foto.');
        }
      }
    );
  });
};
