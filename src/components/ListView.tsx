// ListView.tsx
import { useState } from "react";
import { CardList } from "./CardList";
import { Link, Routes, Route } from "react-router-dom";
import "../styles/ListViewStyles.css";
import type { Card } from "./Card";
import EditCard from "./EditCard";

export const ListView = () => {
    const [cards, setCards] = useState<Card[]>([
        { id: "1", title: "First Card", description: "This is the first card" },
        { id: "2", title: "Second Card", description: "This is the second card" }
    ]);

    const handleUpdateCard = (updatedCard: Card) => {
        setCards(cards.map(card => 
            card.id === updatedCard.id ? updatedCard : card
        ));
    };

    return (
        <>
            <div className="list-view">
                <div className="list-view-header">
                    <h3 className="list-view-title">List of notes</h3>
                    <Link to="/create" className="list-view-add-button">
                        Add more notes
                    </Link>
                </div>
                <div className="list-view-content">
                    <CardList cards={cards} />
                </div>
            </div>

            <Routes>
                <Route 
                    path="/edit/:id" 
                    element={<EditCard cards={cards} onUpdateCard={handleUpdateCard} />} 
                />
            </Routes>
        </>
    );
}