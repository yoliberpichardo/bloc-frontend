import { createContext } from "react";
import type { CardContextType } from "../types/cardContextTypes";

export const CardContext = createContext<CardContextType | undefined>(
  undefined
);
