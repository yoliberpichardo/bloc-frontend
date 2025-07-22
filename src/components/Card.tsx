import { type FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import '../styles/CardStyles.css'

export interface CardModel {
    id: string
    title: string
    description: string
}

interface CardProps extends CardModel {
    onDelete: (id: string) => void
    onUpdate?: (card: CardModel) => void
}

const Card: FC<CardProps> = ({ id, title, description, onDelete, onUpdate }) => {
    const [content, setContent] = useState('')

    useEffect(() => {
        // Sanitizar el HTML para mostrar solo contenido seguro
        const cleanHtml = sanitizeHtml(description, {
            allowedTags: ['p', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'img'],
            allowedAttributes: {
                'a': ['href', 'target'],
                'img': ['src', 'alt']
            },
            allowedSchemes: ['http', 'https', 'data']
        })
        setContent(cleanHtml)
    }, [description])

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <div
                        className="card-description"
                        dangerouslySetInnerHTML={{ __html: content || 'Sin contenido' }}
                    />
                </div>
                <div className="card-button">
                    {onUpdate && (
                        <Link
                            to={`/edit/${id}`}
                            state={{ card: { id, title, description } }}
                            className="edit-button"
                        >
                            Edit
                        </Link>
                    )}
                    <button
                        className="delete-button"
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card