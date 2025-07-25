import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Container = styled.div`
  max-width: 360px;
  width: 94%;
  margin: 3.5em auto;
  background: #fff;
  padding: 1.2em 0.7em 1em 0.7em;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 0.7em 0.2em;
    margin: 2em 0.5em;
    max-width: 98vw;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 0.7em;
  margin-bottom: 1em;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1em;
  background: #f9f9f9;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
    outline: none;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 0.8em;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.08em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 0.5em;
  &:hover, &:focus {
    background: #1565c0;
    outline: none;
  }
`;
const Error = styled.div`
  color: #d32f2f;
  margin-bottom: 1em;
  text-align: center;
  font-size: 0.98em;
`;

function LoginPage() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.get(`/api/Usuario?nombre=${nombre}`);
      const usuario = res.data.find(u => u.nombre === nombre && u.contraseña === contraseña);
      if (usuario) {
        login(usuario);
        navigate('/listas');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <Container>
      <h2 style={{marginBottom: '0.1em', fontWeight: 600, fontSize: '1.7em', color: '#1976d2'}}>Iniciar Sesión</h2>
      <div style={{ color: '#555', fontSize: '1.05em', marginBottom: '0', textAlign: 'center' }}>
        Inicia sesión para ver tus tareas
      </div>
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={e => setContraseña(e.target.value)}
          required
        />
        {error && <Error>{error}</Error>}
        <Button type="submit">Ingresar</Button>
      </form>
      <div style={{ marginTop: '1.2em', textAlign: 'center', fontSize: '1em' }}>
        ¿No tienes cuenta? <Link to="/register" style={{ color: '#1976d2', fontWeight: 500 }}>Regístrate</Link>
      </div>
    </Container>
  );
}

export default LoginPage;