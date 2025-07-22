import { useState } from "react";
import type { CardModel } from "../components/Card";
import { CardContext } from "./CardContext";
import type { CardContextType } from "./useCards";

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<CardModel[]>([
        { id: "1", title: "First Card", description: "This is the first card" },
        { id: "2", title: "Second Card", description: "This is the second card" },
        { id: "3", title: "FCard", description: "This is the card" },
        { id: "4", title: "SCard", description: " second card" },
    ]);

    const value: CardContextType = { cards, setCards };

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
};