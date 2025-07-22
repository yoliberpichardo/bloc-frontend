import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCards } from '../contexts/useCards';
import RichTextEditor from '../components/RichTextEditor';
import '../styles/EditCardStyles.css';

const AddCard = () => {
    const navigate = useNavigate();
    const { addCard } = useCards();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [card, setCard] = useState({
        title: '',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await addCard({
                title: card.title,
                description: card.description
            });

            navigate('/');
        } catch (err) {
            setError('Error al crear la nota. Por favor, inténtalo de nuevo.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="edit-card">
            <h2 className="edit-card-title">Crear Nueva Nota</h2>

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
                        placeholder="Ingresa un título"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Contenido</label>
                    <RichTextEditor
                        content={card.description}
                        onUpdate={(content) => setCard({ ...card, description: content })}
                        placeholder="Escribe el contenido de tu nota aquí..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Creando...' : 'Crear Nota'}
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
    );
};

export default AddCard;