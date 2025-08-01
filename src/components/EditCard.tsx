import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCards } from '../contexts/useCards'
import RichTextEditor from '../components/RichTextEditor'
import '../styles/EditCardStyles.css'
import type { Note } from '../types/noteTypes'

const EditCard = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { cards, updateCard } = useCards()
    const [card, setCard] = useState<Note>({
        id: id || '',
        title: '',
        description: ''
    })
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const foundCard = cards.find(c => c.id === id)
        if (foundCard) {
            setCard({
                id: foundCard.id,
                title: foundCard.title,
                description: foundCard.description || ''
            })
        } else {
            navigate('/not-found')
        }
    }, [id, cards, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            await updateCard(card.id, {
                title: card.title,
                description: card.description
            })
            navigate('/')
        } catch (err) {
            console.error('Error updating note:', err)
            setError('Failed to update note. Please try again.')
        }
    }

    return (
        <div className="edit-card">
            <h2 className="edit-card-title">Editar Nota</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="edit-card-form">
                <div className="form-group">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        value={card.title}
                        onChange={(e) => setCard({ ...card, title: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Contenido</label>
                    <RichTextEditor
                        content={card.description}
                        onUpdate={(content) => setCard({ ...card, description: content })}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-button">
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => navigate('/')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditCard