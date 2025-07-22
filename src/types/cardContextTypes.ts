import type { CardModel } from "./noteTypes";

export interface CardContextType {
  cards: CardModel[];
  isLoading: boolean;
  error: string | null;
  addCard: (card: Omit<CardModel, "id">) => Promise<void>;
  updateCard: (id: string, card: Partial<CardModel>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  refreshCards: () => Promise<void>;
  setCards: React.Dispatch<React.SetStateAction<CardModel[]>>;
}
