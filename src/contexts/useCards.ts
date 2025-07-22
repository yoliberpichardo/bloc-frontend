import { useContext } from "react";
import { CardContext } from "./CardContext";
import type { CardModel } from "../components/Card";

export interface CardContextType {
  cards: CardModel[];
  setCards: React.Dispatch<React.SetStateAction<CardModel[]>>;
}

export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
};
