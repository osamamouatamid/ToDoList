import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Boards.css';

function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await api.boards.getAll();
      setBoards(data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    try {
      const newBoard = await api.boards.create({ title: newBoardTitle });
      setBoards([...boards, newBoard]);
      setNewBoardTitle('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (!window.confirm('Are you sure you want to delete this board?')) return;

    try {
      await api.boards.delete(boardId);
      setBoards(boards.filter(board => board._id !== boardId));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading boards...</div>;
  }

  return (
    <div className="boards-page">
      <nav className="navbar">
        <div className="navbar-content">
          <h2>Task Manager</h2>
          <div className="navbar-right">
            <span className="user-name">Hi, {user?.name}</span>
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="boards-container">
        <div className="boards-header">
          <h1>Your Boards</h1>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            + Create Board
          </button>
        </div>

        <div className="boards-grid">
          {boards.map(board => (
            <div key={board._id} className="board-card">
              <div className="board-card-content" onClick={() => navigate(`/board/${board._id}`)}>
                <h3>{board.title}</h3>
                <p className="board-owner">Owner: {board.owner?.name || 'You'}</p>
              </div>
              <button
                className="btn-icon btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(board._id);
                }}
              >
                🗑️
              </button>
            </div>
          ))}

          {boards.length === 0 && (
            <div className="empty-state">
              <p>No boards yet. Create your first board to get started!</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Board</h2>
            <form onSubmit={handleCreateBoard}>
              <div className="form-group">
                <label htmlFor="boardTitle">Board Title</label>
                <input
                  type="text"
                  id="boardTitle"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  placeholder="Enter board title"
                  autoFocus
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Boards;
