import { useEffect, useState } from 'react';
import Card from "./Card";
import "../styles/CardlistStyles.css";
import { useCards } from "../contexts/useCards";
import type { Note } from "../types/noteTypes";

export const CardList = () => {
    const { cards, deleteCard, updateCard, isLoading, error } = useCards();
    const [localCards, setLocalCards] = useState<Note[]>([]);
    const [operationError, setOperationError] = useState<string | null>(null);

    useEffect(() => {
        if (Array.isArray(cards)) {
            setLocalCards([...cards]);
        } else {
            console.error('cards is not an array:', cards);
            setLocalCards([]);
        }
    }, [cards]);

    const handleDelete = async (id: string) => {
        try {
            setOperationError(null);
            await deleteCard(id);
            console.log('Note deleted successfully');
        } catch (error) {
            console.error("Error deleting note:", error);
            setOperationError("Failed to delete note. Please try again.");
        }
    };

    const handleUpdate = async (updatedNote: Note) => {
        try {
            setOperationError(null);
            await updateCard(updatedNote.id, {
                title: updatedNote.title,
                description: updatedNote.description
            });
            console.log('Note updated successfully');
        } catch (error) {
            console.error("Error updating note:", error);
            setOperationError("Failed to update note. Please try again.");
        }
    };

    if (isLoading) {
        return <div className="loading-message">Loading notes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!Array.isArray(localCards)) {
        return <div className="error-message">Error loading cards</div>;
    }

    return (
        <div className="card-list-container">
            {operationError && <div className="error-message">{operationError}</div>}
            {localCards.length === 0 ? (
                <div className="empty-message">You have no notes available. "Create a new one."</div>
            ) : (
                localCards.map(note => (
                    <Card
                        key={note.id}
                        note={note}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            )}
        </div>
    );
};