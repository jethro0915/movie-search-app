import React, { useState, useEffect } from "react";
import { auth } from "@/database/server";
import { AuthContext } from "@/constants/index";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/database/server";
import { useToast } from "@/hooks/use-toast";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const deleteMovieFromCollections = async (docId) => {
    try {
      await deleteDoc(doc(db, "movieCollections", docId));
      toast({
        title: "A movie is removed from your collections",
        variant: "successful",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please retry.",
      });
    }
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
        setLoading(false);
      });
    };
    unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, "movieCollections"),
        where("uid", "==", currentUser?.uid),
        orderBy("createdAt", "desc")
      );
      const getUserCollections = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) =>
          data.push({ ...doc.data(), id: doc.id })
        );

        setUserCollections(data);
      });

      return getUserCollections;
    } else {
      setUserCollections([]);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userCollections,
        deleteMovieFromCollections,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
