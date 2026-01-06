const API_BASE_URL = 'http://localhost:4000/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const api = {
  users: {
    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return response.json();
    },

    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return response.json();
    },

    getProfile: async () => {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: getAuthHeaders()
      });
      return response.json();
    }
  },

  boards: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },

    getById: async (boardId) => {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },

    create: async (boardData) => {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(boardData)
      });
      return response.json();
    },

    update: async (boardId, boardData) => {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(boardData)
      });
      return response.json();
    },

    delete: async (boardId) => {
      const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return response.json();
    }
  },

  lists: {
    getByBoard: async (boardId) => {
      const response = await fetch(`${API_BASE_URL}/lists?board=${boardId}`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },

    create: async (listData) => {
      const response = await fetch(`${API_BASE_URL}/lists`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(listData)
      });
      return response.json();
    },

    update: async (listId, listData) => {
      const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(listData)
      });
      return response.json();
    },

    delete: async (listId) => {
      const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return response.json();
    }
  },

  cards: {
    getByList: async (listId) => {
      const response = await fetch(`${API_BASE_URL}/cards?list=${listId}`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },

    getByBoard: async (boardId) => {
      const response = await fetch(`${API_BASE_URL}/cards?board=${boardId}`, {
        headers: getAuthHeaders()
      });
      return response.json();
    },

    create: async (cardData) => {
      const response = await fetch(`${API_BASE_URL}/cards`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cardData)
      });
      return response.json();
    },

    update: async (cardId, cardData) => {
      const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(cardData)
      });
      return response.json();
    },

    delete: async (cardId) => {
      const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return response.json();
    }
  }
};

export default api;
