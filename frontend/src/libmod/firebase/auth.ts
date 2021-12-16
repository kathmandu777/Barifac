import firebaseApp from './firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged as onFirebaseAuthStateChanged,
} from 'firebase/auth';
import { SessionService } from 'services/SessionService';

const provider = new GoogleAuthProvider();

export const login = async () => {
  const auth = getAuth(firebaseApp);
  try {
    const credential = await signInWithPopup(auth, provider);
    const idToken = await credential.user.getIdToken(true);
    await SessionService.signin(idToken);
  } catch {
    console.error('Token Error');
  }
};

export const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => resolve())
      .catch(error => reject(error));
  });
};

export const onAuthStateChanged = (callback: (uid: string | null) => void) => {
  const auth = getAuth(firebaseApp);
  onFirebaseAuthStateChanged(auth, user => {
    const uid: string | null = user ? user?.uid : null;
    callback(uid);
  });
};
