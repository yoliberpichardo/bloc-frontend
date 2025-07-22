
import Card, { type CardModel } from "./Card";
import "../styles/CardlistStyles.css";
import { useCards } from "../contexts/useCards";

export const CardList = () => {
    const { cards, setCards } = useCards();

    const handleDeleteCard = (id: string) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const handleUpdateCard = (updatedCard: CardModel) => {
        setCards(prevCards =>
            prevCards.map(card => card.id === updatedCard.id ? updatedCard : card)
        );
    };

    return (
        <div className="card-list-container">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    onDelete={handleDeleteCard}
                    onUpdate={handleUpdateCard}
                />
            ))}
        </div>
    );
};