import { useState, useEffect } from 'react';
import './CardModal.css';
function CardModal({ card, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setDescription(card.description || '');
      setAssignTo(card.assignTo || '');
      setDueDate(card.dueDate ? card.dueDate.split('T')[0] : '');
      setPriority(card.priority || 'medium');
    }
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardData = {
      title,
      description,
      assignTo,
      dueDate: dueDate || null,
      priority
    };

    onSave(cardData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{card ? 'Edit Card' : 'Create New Card'}</h2>
          <button className="btn-icon" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description (optional)"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assignTo">Assign To</label>
              <input
                type="text"
                id="assignTo"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                placeholder="Enter assignee name (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {card ? 'Update Card' : 'Create Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;

