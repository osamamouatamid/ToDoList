import React from 'react';
import './Card.css';

function Card({ card, onEdit, onDelete }) {
    const getPriorityColor = (priority) => {
      switch (priority?.toLowerCase()) {
        case 'high':
          return '#ef4444';
        case 'medium':
          return '#f59e0b';
        case 'low':
          return '#10b981';
        default:
          return '#6b7280';
      }
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
  
    return (
      <div className="card" onClick={onEdit}>
        <div className="card-header">
          <h4>{card.title}</h4>
          <button
            className="btn-icon btn-delete-small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            ×
          </button>
        </div>
  
        {card.description && (
          <p className="card-description">{card.description}</p>
        )}
  
        <div className="card-footer">
          {card.priority && (
            <span
              className="card-badge"
              style={{ backgroundColor: getPriorityColor(card.priority) }}
            >
              {card.priority}
            </span>
          )}
  
          {card.dueDate && (
            <span className="card-date">
              📅 {formatDate(card.dueDate)}
            </span>
          )}
  
          {card.assignTo && (
            <span className="card-assignee">
              👤 {card.assignTo}
            </span>
          )}
        </div>
      </div>
    );
  }
  
  export default Card;
  