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

export const login = (): void => {
  const auth = getAuth(firebaseApp);
  signInWithPopup(auth, provider)
    .then(credential => credential.user.getIdToken(true))
    .then(idToken => {
      SessionService.signin(idToken);
    })
    .catch(err => console.error(err));
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
