import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api/api';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 700px;
  margin: 2em auto;
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
`;

const ListItem = styled.li`
  padding: 0.8em;
  background: #f1f1f1;
  margin-bottom: 0.6em;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6em;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const DangerButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  padding: 0.4em 0.8em;
  border-radius: 5px;
`;

function ListaTareasPage() {
  const { user } = useUser();
  const [listas, setListas] = useState([]);
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const cargarListas = async () => {
    try {
      const res = await api.get('/api/ListaTareas');
      const propias = res.data.filter(l => l.usuarioId === user.id);

      const compartidasRes = await api.get('/api/ListaCompartida');
      const idsCompartidas = compartidasRes.data
        .filter(c => c.usuarioCompartidoId === user.id)
        .map(c => c.listaTareasId);

      const compartidas = res.data.filter(l => idsCompartidas.includes(l.id));

      setListas([...propias, ...compartidas]);
    } catch (err) {
      alert('Error al cargar listas: ' + (err.response?.data?.message || err.message));
      console.error('Error al cargar listas:', err);
    }
  };

  useEffect(() => {
    if (user) cargarListas();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
   
    await api.post('/api/ListaTareas', { nombre, usuarioId: user.id });
    setNombre('');
    cargarListas();
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Eliminar esta lista?');
    if (!confirmar) return;
    await api.delete(`/api/ListaTareas/${id}`);
    cargarListas();
  };

  return (
    <Container>
      <h2>Mis Listas</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <Input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nueva lista..." required />
        <button type="submit">Crear</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listas.map(lista => (
          <ListItem key={lista.id}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/listas/${lista.id}`)}>
              {lista.nombre}
            </span>
            <DangerButton onClick={() => handleDelete(lista.id)}>Eliminar</DangerButton>
          </ListItem>
        ))}
      </ul>
    </Container>
  );
}

export default ListaTareasPage;
