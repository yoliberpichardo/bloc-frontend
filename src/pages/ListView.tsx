import { CardList } from "../components/CardList";
import { Link } from "react-router-dom";
import "../styles/ListViewStyles.css";

export const ListView = () => {
    return (
        <div className="list-view">
            <div className="list-view-header">
                <h3 className="list-view-title">List of notes</h3>
                <Link to="/create" className="list-view-add-button">
                    Add more notes
                </Link>
            </div>
            <div className="list-view-content">
                <CardList />
            </div>
        </div>
    );
};