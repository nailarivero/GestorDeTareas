import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListaTareasPage from './pages/ListaTareasPage';
import ListaDetallePage from './pages/ListaDetallePage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/listas" element={<ListaTareasPage />} />
        <Route path="/listas/:id" element={<ListaDetallePage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </UserProvider>
  );
}

export default App;