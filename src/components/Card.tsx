import { useEffect, type FC } from 'react';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import '../styles/CardStyles.css';
import type { Note } from '../types/noteTypes';

interface CardProps {
    note: Note;
    onDelete: (id: string) => void;
    onUpdate?: (note: Note) => void;
}

const Card: FC<CardProps> = ({ note, onDelete, onUpdate }) => {
    const cleanHtml = sanitizeHtml(note.description || '', {
        allowedTags: ['p', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'img'],
        allowedAttributes: {
            'a': ['href', 'target', 'rel'],
            'img': ['src', 'alt', 'width', 'height']
        },
        allowedSchemes: ['http', 'https', 'data'],
        transformTags: {
            'a': (tagName, attribs) => ({
                tagName,
                attribs: {
                    ...attribs,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }
            })
        }
    });

    useEffect(() => {
        console.log(note.id, "sasdsad");
    }, [note.id])

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <h3 className="card-title">{note.title}</h3>
                    <div
                        className="card-description"
                        dangerouslySetInnerHTML={{ __html: cleanHtml || 'Sin contenido' }}
                    />
                </div>
                <div className="card-actions">
                    {onUpdate && (
                        <Link
                            to={`/edit/${note.id}`}
                            className="edit-button"
                        >
                            Editar
                        </Link>
                    )}
                    <button
                        className="delete-button"
                        onClick={() => onDelete(note.id)}
                        aria-label={`Eliminar nota ${note.title}`}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;