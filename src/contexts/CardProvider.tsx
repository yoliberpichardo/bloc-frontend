import { useState, useEffect } from "react";
import type { CreateNoteDto, Note } from "../types/noteTypes";
import { notesApi } from "../services/notesApi";
import { CardContext } from "./CardContext";
import type { AxiosError } from "axios";

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshCards = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay sesión activa');
            }

            const data = await notesApi.getAllNotes();
            setCards(data);

        } catch (err) {
            let errorMessage = 'Error al cargar las notas';

            if (err instanceof Error) {
                if ('response' in err) {
                    const axiosError = err as AxiosError<{ message?: string }>;

                    if (axiosError.response) {
                        switch (axiosError.response.status) {
                            case 401:
                                errorMessage = 'Sesión expirada o no autorizada';
                                localStorage.removeItem('token');
                                break;
                            case 500:
                                errorMessage = 'Error del servidor';
                                break;
                            default:
                                errorMessage = axiosError.response.data?.message || 'Error en la petición';
                        }
                    }
                } else if (err.message === 'No hay sesión activa') {
                    errorMessage = 'Debes iniciar sesión';
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            console.error('Error en refreshCards:', err);

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
            const safeUpdates = {
                title: updates.title ?? '',
                description: updates.description ?? '',
                ...updates
            };
            const updatedCard = await notesApi.updateNote(id, safeUpdates);
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