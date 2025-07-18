import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 700px;
  width: 96%;
  margin: 2.5em auto;
  background: #fff;
  padding: 2em 1.5em;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  @media (max-width: 600px) {
    padding: 1em 0.5em;
    margin: 1em 0.5em;
    max-width: 99vw;
  }
`;
const ListItem = styled.li`
  padding: 0.8em 1em;
  background: #f9f9f9;
  margin-bottom: 0.7em;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.04);
`;
const Actions = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  padding: 0.6em;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  background: #fff;
  font-size: 1em;
  margin-right: 0.5em;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
    outline: none;
  }
`;
const ShareButton = styled.button`
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  border-radius: 8px;
  padding: 0.4em 1em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover, &:focus {
    background: #bbdefb;
    color: #1565c0;
    outline: none;
  }
  margin-left: 0.3em;
`;
const CancelButton = styled.button`
  background: #f5f5f5;
  color: #888;
  border: none;
  border-radius: 8px;
  padding: 0.4em 1em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-left: 0.3em;
  &:hover, &:focus {
    background: #e0e0e0;
    color: #333;
    outline: none;
  }
`;
const DangerButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.4em 1em;
  font-size: 1em;
  font-weight: 500;
  margin-left: 0.5em;
  cursor: pointer;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #b71c1c;
    outline: none;
  }
`;

function ListaTareasPage() {
  const { user } = useUser();
  const [listas, setListas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editNombre, setEditNombre] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [compartirCon, setCompartirCon] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [mostrarCompartir, setMostrarCompartir] = useState({});

  const cargarListas = async () => {
    try {
      const res = await axios.get('/api/ListaTareas');
      const propias = res.data.filter(l => l.usuarioId === user.id);

      const compartidasRes = await axios.get('/api/ListaCompartida');
      const idsCompartidas = compartidasRes.data
        .filter(c => c.usuarioCompartidoId === user.id)
        .map(c => c.listaTareasId);

      const compartidas = res.data.filter(l => idsCompartidas.includes(l.id));

      setListas([...propias, ...compartidas]);
    } catch {
      setError('No se pudieron cargar las listas.');
    }
  };

  useEffect(() => {
    if (user) cargarListas();
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/ListaTareas', { nombre, usuarioId: user.id });
      setNombre('');
      cargarListas();
    } catch {
      setError('Error al crear lista');
    }
  };

  const handleShare = async (listaId) => {
    if (!compartirCon) return;
    try {
      const res = await axios.get(`/api/Usuario?nombre=${compartirCon}`);
      const usuario = res.data.find(u => u.nombre === compartirCon);
      if (!usuario) return alert('Usuario no encontrado');
      await axios.post('/api/ListaCompartida', {
        listaTareasId: listaId,
        usuarioCompartidoId: usuario.id
      });
      alert('Lista compartida correctamente');
      setCompartirCon('');
      setMostrarCompartir(prev => ({ ...prev, [listaId]: false }));
    } catch {
      alert('No se pudo compartir la lista');
    }
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que querés eliminar esta lista?');
    if (!confirmar) return;
    try {
      await axios.delete(`/api/ListaTareas/${id}`);
      cargarListas();
    } catch {
      alert('No se pudo eliminar la lista');
    }
  };

  const handleEditNombre = async (lista) => {
    if (!nuevoNombre || nuevoNombre === lista.nombre) {
      setEditNombre(null);
      setNuevoNombre('');
      return;
    }
    try {
      await axios.put(`/api/ListaTareas/${lista.id}`, { ...lista, nombre: nuevoNombre });
      setEditNombre(null);
      setNuevoNombre('');
      cargarListas();
    } catch {
      alert('No se pudo editar el nombre');
      setEditNombre(null);
      setNuevoNombre('');
    }
  };

  return (
    <Container>
      <h2>Mis Listas</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <Input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nueva lista..." required />
        <button type="submit">Crear</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listas.map(l => (
          <ListItem key={l.id}>
            {editNombre === l.id ? (
              <form onSubmit={e => { e.preventDefault(); handleEditNombre(l); }} style={{ display: 'inline' }}>
                <Input
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  autoFocus
                />
              </form>
            ) : (
              <span onClick={() => navigate(`/listas/${l.id}`)} style={{ cursor: 'pointer' }}>{l.nombre}</span>
            )}
            <Actions>
              {editNombre === l.id ? (
                <button onClick={() => handleEditNombre(l)} type="button">Guardar</button>
              ) : (
                <button onClick={() => { setEditNombre(l.id); setNuevoNombre(l.nombre); }}>Editar</button>
              )}
              <button onClick={() => setMostrarCompartir(prev => ({ ...prev, [l.id]: !prev[l.id] }))}>Compartir</button>
              {mostrarCompartir[l.id] && (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5em' }}>
                  <input
                    type="text"
                    value={compartirCon}
                    onChange={(e) => setCompartirCon(e.target.value)}
                    placeholder="Usuario"
                    style={{ width: '120px', marginRight: '0.3em', borderRadius: '8px', border: '1px solid #cfd8dc', padding: '0.4em 0.7em' }}
                  />
                  <ShareButton onClick={() => handleShare(l.id)}>Confirmar</ShareButton>
                  <CancelButton onClick={() => { setMostrarCompartir(prev => ({ ...prev, [l.id]: false })); setCompartirCon(''); }}>Cancelar</CancelButton>
                </div>
              )}
              <DangerButton onClick={() => handleDelete(l.id)}>Eliminar</DangerButton>
            </Actions>
          </ListItem>
        ))}
      </ul>
    </Container>
  );
}

export default ListaTareasPage;
