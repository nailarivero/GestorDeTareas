import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

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
  display: flex;
  flex-direction: column;
  padding: 0.7em 1em;
  border-bottom: 1px solid #e3f2fd;
  border-radius: 8px;
  background: #f9f9f9;
  margin-bottom: 0.7em;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.04);
`;
const Input = styled.input`
  margin-bottom: 0.4em;
  border-radius: 8px;
  border: 1px solid #cfd8dc;
  background: #fff;
  font-size: 1em;
  padding: 0.5em 0.8em;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
    outline: none;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DangerButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.3em 0.9em;
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

function ListaDetallePage() {
  const { id } = useParams();
  const { user } = useUser();
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [usuariosCompartidos, setUsuariosCompartidos] = useState([]);
  const [nombreLista, setNombreLista] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarTareas();
    cargarCompartidos();
    cargarNombreLista();
  }, [id]);

  const cargarTareas = async () => {
    const res = await axios.get('/api/Tarea');
    setTareas(res.data.filter(t => t.listaTareasId === parseInt(id)));
  };

  const cargarCompartidos = async () => {
    try {
      const res = await axios.get('/api/ListaCompartida');
      const compartidos = res.data.filter(c => c.listaTareasId === parseInt(id));
      if (compartidos.length === 0) { setUsuariosCompartidos([]); return; }
      const usuariosRes = await axios.get('/api/Usuario');
      const usuarios = usuariosRes.data.filter(u => compartidos.some(c => c.usuarioCompartidoId === u.id));
      setUsuariosCompartidos(usuarios.map(u => u.nombre));
    } catch {
      setUsuariosCompartidos([]);
    }
  };

  const cargarNombreLista = async () => {
    try {
      const res = await axios.get(`/api/ListaTareas/${id}`);
      setNombreLista(res.data.nombre);
    } catch {
      setNombreLista('');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('/api/Tarea', {
      titulo,
      etiqueta,
      comentario,
      completada: false,
      listaTareasId: parseInt(id)
    });
    setTitulo(''); setComentario(''); setEtiqueta('');
    cargarTareas();
  };

  const toggleEstado = async (tarea) => {
    const updated = { ...tarea, completada: !tarea.completada };
    await axios.put(`/api/Tarea/${tarea.id}`, updated);
    cargarTareas();
  };

  const editarCampo = async (tarea, campo, valor) => {
    if (!valor || valor === tarea[campo]) return;
    const updated = { ...tarea, [campo]: valor };
    await axios.put(`/api/Tarea/${tarea.id}`, updated);
    cargarTareas();
  };

  const eliminarTarea = async (idTarea) => {
    const confirmar = window.confirm('¿Estás seguro de que querés eliminar esta tarea?');
    if (!confirmar) return;
    await axios.delete(`/api/Tarea/${idTarea}`);
    cargarTareas();
  };

  const eliminarLista = async () => {
    const confirmar = window.confirm('¿Estás seguro de que querés eliminar esta lista? Esta acción no se puede deshacer.');
    if (!confirmar) return;
    await axios.delete(`/api/ListaTareas/${id}`);
    navigate('/listas');
  };

  return (
    <Container>
      <h2>Detalle de Lista</h2>
      <div style={{ marginBottom: '1em' }}>
        <strong>Nombre:</strong> {nombreLista}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <strong>Compartida con:</strong> {usuariosCompartidos.length > 0 ? usuariosCompartidos.join(', ') : 'Nadie'}
      </div>
      <DangerButton onClick={eliminarLista} style={{ marginBottom: '2em' }}>Eliminar lista</DangerButton>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1em', marginBottom: '2em' }}>
        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" required />
        <input value={etiqueta} onChange={e => setEtiqueta(e.target.value)} placeholder="Etiqueta (opcional)" />
        <input value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Comentario (opcional)" />
        <button type="submit">Agregar</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.map(t => (
          <ListItem key={t.id}>
            <Row>
              <Input
                defaultValue={t.titulo}
                onBlur={(e) => editarCampo(t, 'titulo', e.target.value)}
              />
              <div>
                <button onClick={() => toggleEstado(t)}>{t.completada ? '✅' : '⏳'}</button>
                <DangerButton onClick={() => eliminarTarea(t.id)}>Eliminar</DangerButton>
              </div>
            </Row>
            <Input
              defaultValue={t.etiqueta || ''}
              onBlur={(e) => editarCampo(t, 'etiqueta', e.target.value)}
              placeholder="Etiqueta"
            />
            <Input
              defaultValue={t.comentario || ''}
              onBlur={(e) => editarCampo(t, 'comentario', e.target.value)}
              placeholder="Comentario"
            />
          </ListItem>
        ))}
      </ul>
    </Container>
  );
}

export default ListaDetallePage;
