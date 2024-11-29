import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Theme context must be set");
  }
  return context;
}
