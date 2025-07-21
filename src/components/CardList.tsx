// CardList.tsx
import { type FC } from "react";
import { Card } from "./Card";
import "../styles/CardlistStyles.css";

interface CardListProps {
    cards: Card[];
}

export const CardList: FC<CardListProps> = ({cards}) => {
    return (
        <div className="card-list-container">
            {cards.map((card) => (
                <Card key={card.id} {...card} />
            ))}
        </div>
    )
}