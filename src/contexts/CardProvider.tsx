import { useState, useEffect } from "react";
import type { CreateNoteDto, Note } from "../types/noteTypes";
import { notesApi } from "../services/notesApi";
import { CardContext } from "./CardContext";

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshCards = async () => {
        setIsLoading(true);
        try {
            const data = await notesApi.getAllNotes();
            setCards(data);
            setError(null);
        } catch (err) {
            setError("Error al cargar las notas");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addCard = async (cardData: CreateNoteDto) => {
        try {
            setIsLoading(true);
            const newCard = await notesApi.createNote(cardData);
            setCards(prev => [...prev, newCard]);
        } catch (err) {
            await refreshCards();
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateCard = async (id: string, updates: Partial<Note>) => {
        try {
            setIsLoading(true);
            const updatedCard = await notesApi.updateNote(id, updates);
            setCards(prev => prev.map(card => card.id === id ? updatedCard : card));
        } catch (err) {
            setError("Error al actualizar la nota");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCard = async (id: string) => {
        try {
            setIsLoading(true);
            await notesApi.deleteNote(id);
            setCards(prev => prev.filter(card => card.id !== id));
        } catch (err) {
            setError("Error al eliminar la nota");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshCards();
    }, []);

    return (
        <CardContext.Provider
            value={{
                cards,
                isLoading,
                error,
                refreshCards,
                addCard,
                updateCard,
                deleteCard,
                setCards
            }}
        >
            {children}
        </CardContext.Provider>
    );
};