import { createContext } from "react";
import type { CardContextType } from "./useCards";

export const CardContext = createContext<CardContextType | undefined>(
  undefined
);
