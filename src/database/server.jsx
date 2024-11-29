import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPvnxAMEDPfXBgF0QrVJoJerUwqxItvHQ",
  authDomain: "movie-search-app-8f2fd.firebaseapp.com",
  projectId: "movie-search-app-8f2fd",
  storageBucket: "movie-search-app-8f2fd.firebasestorage.app",
  messagingSenderId: "885622322516",
  appId: "1:885622322516:web:8e5eeed28274fb881ec4c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
