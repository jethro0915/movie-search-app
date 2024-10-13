import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("Theme context must be set");
  }
  return context;
}
