import firebaseApp from './firebase';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { SessionService } from 'services/SessionService';

const provider = new GoogleAuthProvider();

export const login = async () => {
  const auth = getAuth(firebaseApp);
  try {
    await signInWithRedirect(auth, provider);
  } catch (e) {
    console.error(e);
  }
};

export const sendRedirectResult = async () => {
  const auth = getAuth(firebaseApp);
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const idToken = await result.user.getIdToken(true);
      await SessionService.signin(idToken);
    }
  } catch (e) {
    console.error(e);
  }
};

export const logout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => resolve())
      .then(() => SessionService.signout())
      .then(() => window.location.reload())
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
