// components/EditCard.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import '../styles/EditCardStyles.css';

interface Card {
    id: string;
    title: string;
    description: string;
}

interface EditCardProps {
    onUpdateCard: (updatedCard: Card) => void;
    cards: Card[];
}

const EditCard = ({cards, onUpdateCard }: EditCardProps) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [card, setCard] = useState<Card>({
        id: id || '',
        title: '',
        description: ''
    });

    const config = {
        readonly: false,
        height: 400,
        toolbarButtonSize: 'medium',
        buttons: 'bold,italic,underline,strikethrough,ul,ol,link',
    };

    useEffect(() => {

        const foundCard = cards!.find(c => c.id === id);
        if (foundCard) {
            setCard(foundCard);
        } else {
            navigate('/not-found');
        }
    }, [id, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateCard(card);
        navigate('/');
    };

    const handleUpdate = (newContent: string) => {
        setCard(prev => ({ ...prev, description: newContent }));
    };

    return (
        <div className="edit-card-container">
            <h2>Editar Nota</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        value={card.title}
                        onChange={(e) => setCard({ ...card, title: e.target.value })}
                        required
                        onBlur={() => handleUpdate(card.description)}
                    />
                </div>

                <div className="form-group">
                    <label>Contenido</label>
                    <JoditEditor
                        value={card.description}
                        config={config}
                        onBlur={(newContent: string) => handleUpdate(newContent)}
                        onChange={(newContent: string) => setCard({...card, description: newContent})}
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
    );
};

export default EditCard;