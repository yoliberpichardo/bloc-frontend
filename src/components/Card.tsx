import type { FC } from "react"
import "../styles/CardStyles.css"
import { Link } from "react-router";

export interface Card {
    id: string;
    title: string;
    description: string;
}

export const Card: FC<Card> = ({ id, title, description }) => {
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-description">{description}</p>
                </div>
                <div className="card-actions">
                    <Link to={`/edit/${id}`} className="card-button">
                        Edit
                    </Link>
                    <button className="card-button">Delete</button>
                </div>
            </div>
        </div>
    )
}