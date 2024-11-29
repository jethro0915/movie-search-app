import React, { useState, useEffect, createContext } from "react";
import { auth } from "@/database/server";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        setLoading(true);
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
        console.log(currentUser);
        console.log(currentUser?.photoURL);
        setLoading(false);
      });
    };
    unsubscribe();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, handleSignOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
