import React, { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged } from 'libmod/firebase/auth';

type AuthContextProps = {
  uid: string | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ uid: undefined });

export const AuthProvider: React.FC = ({ children }) => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(uid => {
      setUid(uid);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ uid: uid }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
