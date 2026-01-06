import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Boards from './pages/Boards';
import Board from './pages/Board';
import Example from './components/Example';
import './App.css';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return !user ? children : <Navigate to="/boards" />;
}

function App() {
  return (
<BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Example />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/boards" element={ <Boards />} />
          <Route path="/board/:boardId" element={ <Board />} />
          <Route path="/" element={<Navigate to="/boards" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
