import React, { createContext } from "react";

export const sidebarLinks = [
  { name: "home", link: "/" },
  { name: "collections", link: "/collections" },
  { name: "movies", link: "/movies" },
];

export const AuthContext = createContext(null);
