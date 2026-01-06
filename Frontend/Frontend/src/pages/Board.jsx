import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';
import CardModal from '../components/CardModal';
import './Board.css';

function Board() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetchBoardData();
  }, [boardId]);

  const fetchBoardData = async () => {
    try {
      const [boardData, listsData, cardsData] = await Promise.all([
        api.boards.getById(boardId),
        api.lists.getByBoard(boardId),
        api.cards.getByBoard(boardId)
      ]);

      setBoard(boardData);
      setLists(listsData);
      setCards(cardsData);
    } catch (error) {
      console.error('Error fetching board data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = (listId) => {
    setSelectedList(listId);
    setSelectedCard(null);
    setShowCardModal(true);
  };

  const handleEditCard = (card) => {
    setSelectedCard(card);
    setSelectedList(card.list);
    setShowCardModal(true);
  };

  const handleSaveCard = async (cardData) => {
    try {
      if (selectedCard) {
        const updatedCard = await api.cards.update(selectedCard._id, cardData);
        setCards(cards.map(c => c._id === updatedCard._id ? updatedCard : c));
      } else {
        const newCard = await api.cards.create({ ...cardData, list: selectedList });
        setCards([...cards, newCard]);
      }
      setShowCardModal(false);
      setSelectedCard(null);
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      await api.cards.delete(cardId);
      setCards(cards.filter(c => c._id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const getCardsByList = (listId) => {
    return cards.filter(card => card.list === listId);
  };

  if (loading) {
    return <div className="loading">Loading board...</div>;
  }

  if (!board) {
    return <div className="error">Board not found</div>;
  }

  return (
    <div className="board-page">
      <nav className="navbar">
        <div className="navbar-content">
          <button className="btn btn-secondary" onClick={() => navigate('/boards')}>
            ← Back to Boards
          </button>
          <h2>{board.title}</h2>
        </div>
      </nav>

      <div className="board-content">
        <div className="lists-container">
          {lists.map(list => (
            <div key={list._id} className="list">
              <div className="list-header">
                <h3>{list.title}</h3>
                <span className="card-count">{getCardsByList(list._id).length}</span>
              </div>

              <div className="cards-container">
                {getCardsByList(list._id).map(card => (
                  <Card
                    key={card._id}
                    card={card}
                    onEdit={() => handleEditCard(card)}
                    onDelete={() => handleDeleteCard(card._id)}
                  />
                ))}
              </div>

              <button
                className="btn btn-add-card"
                onClick={() => handleCreateCard(list._id)}
              >
                + Add Card
              </button>
            </div>
          ))}

          {lists.length === 0 && (
            <div className="empty-state">
              <p>No lists found. Create lists in your backend!</p>
            </div>
          )}
        </div>
      </div>

      {showCardModal && (
        <CardModal
          card={selectedCard}
          onSave={handleSaveCard}
          onClose={() => {
            setShowCardModal(false);
            setSelectedCard(null);
          }}
        />
      )}
    </div>
  );
}

export default Board;
