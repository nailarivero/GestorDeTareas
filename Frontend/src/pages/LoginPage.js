import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Container = styled.div`
  max-width: 350px;
  margin: 3em auto;
  background: #fff;
  padding: 2.5em 2em 2em 2em;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.09);
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7em 1em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
  font-family: inherit;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7em 0;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5em;
  &:hover { background: #125ea2; }
`;

const Error = styled.div`
  color: #d32f2f;
  margin-bottom: 1em;
  text-align: center;
  font-size: 0.98em;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 0.5em;
  font-weight: 700;
  font-size: 1.5em;
  letter-spacing: 0.5px;
`;
const Subtitle = styled.div`
  text-align: center;
  color: #555;
  font-size: 1em;
  margin-bottom: 1.5em;
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
      const res = await api.get('/api/Usuario');
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
      <Title>Iniciar Sesión</Title>
      <Subtitle>Accede a tu cuenta para gestionar tus tareas</Subtitle>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5em', alignItems: 'center' }}>
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
        <Button type="submit" style={{ width: '100%', marginTop: '1em' }}>Ingresar</Button>
      </form>
    </Container>
  );
}

export default LoginPage;
