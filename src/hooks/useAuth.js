import React, { useContext } from "react";
import { AuthContext } from "@/constants/index";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Theme context must be set");
  }
  return context;
}
