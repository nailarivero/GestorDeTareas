import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 700px;
  margin: 2em auto;
  background: #fff;
  padding: 2.5em 2em 2em 2em;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.09);
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-bottom: 1px solid #eee;
  background: #fafbfc;
  border-radius: 8px;
  margin-bottom: 1em;
`;

const Input = styled.input`
  margin-bottom: 0.4em;
  padding: 0.6em 1em;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1em;
  font-family: inherit;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

const DangerButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  padding: 0.5em 1.1em;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
  &:hover { background: #b71c1c; }
`;

const Button = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.5em 1.1em;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  font-family: inherit;
  margin-left: 0.5em;
  transition: background 0.2s;
  &:hover { background: #125ea2; }
`;

const EditButton = styled(Button)`
  background: #ffa726;
  color: #333;
  &:hover { background: #fb8c00; color: #fff; }
`;

const CancelButton = styled(Button)`
  background: #aaa;
  color: #fff;
  &:hover { background: #888; }
`;

const SaveButton = styled(Button)`
  background: #43a047;
  &:hover { background: #2e7031; }
`;

const Section = styled.div`
  margin-bottom: 2em;
`;

const SmallButton = styled(Button)`
  font-size: 0.85em;
  padding: 0.22em 0.65em;
  border-radius: 4px;
  margin-left: 0;
`;
const EditNameButton = styled(EditButton)`
  font-size: 0.85em;
  padding: 0.22em 0.65em;
  border-radius: 4px;
  margin-left: 0;
`;
const SaveNameButton = styled(SaveButton)`
  font-size: 0.85em;
  padding: 0.22em 0.65em;
  border-radius: 4px;
  margin-left: 0;
`;
const CancelNameButton = styled(CancelButton)`
  font-size: 0.85em;
  padding: 0.22em 0.65em;
  border-radius: 4px;
  margin-left: 0;
`;

function ListaDetallePage() {
  const { id } = useParams();
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [nombreLista, setNombreLista] = useState('');
  const [usuarioCompartir, setUsuarioCompartir] = useState('');
  const [errorCompartir, setErrorCompartir] = useState('');
  const navigate = useNavigate();
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [editandoTareaId, setEditandoTareaId] = useState(null);
  const [tareaEdit, setTareaEdit] = useState({ titulo: '', etiqueta: '', comentario: '' });

  const cargarTareas = async () => {
  
    const res = await api.get('/api/Tarea');
    setTareas(res.data.filter(t => t.listaTareasId === parseInt(id)));
  };

  const cargarNombreLista = async () => {
    const res = await api.get(`/api/ListaTareas/${id}`);
    setNombreLista(res.data.nombre);
  };

  useEffect(() => {
    cargarTareas();
    cargarNombreLista();
  }, [id]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/api/Tarea', {
      titulo,
      etiqueta,
      comentario,
      completada: false,
      listaTareasId: parseInt(id)
    });
    setTitulo(''); setComentario(''); setEtiqueta('');
    cargarTareas();
  };

  const handleCompartir = async (e) => {
    e.preventDefault();
    setErrorCompartir('');
    try {
      // Buscar usuario por nombre
      const res = await api.get('/api/Usuario');
      const usuario = res.data.find(u => u.nombre === usuarioCompartir);
      if (!usuario) {
        setErrorCompartir('No se encontró un usuario con ese nombre.');
        return;
      }
      await api.post('/api/ListaCompartida', {
        listaTareasId: parseInt(id),
        usuarioCompartidoId: usuario.id
      });
      setUsuarioCompartir('');
      alert('¡Lista compartida!');
    } catch (err) {
      alert('Error al compartir lista: ' + (err.response?.data?.message || err.message));
      console.error('Error al compartir lista:', err);
    }
  };

  const toggleEstado = async (tarea) => {
    const updated = { ...tarea, completada: !tarea.completada };
    await api.put(`/api/Tarea/${tarea.id}`, updated);
    cargarTareas();
  };

  const eliminarTarea = async (idTarea) => {
    const confirmar = window.confirm('¿Eliminar esta tarea?');
    if (!confirmar) return;
    await api.delete(`/api/Tarea/${idTarea}`);
    cargarTareas();
  };

  const handleEditarNombre = () => {
    setNuevoNombre(nombreLista);
    setEditandoNombre(true);
  };

  const handleGuardarNombre = async () => {
    try {
      await api.put(`/api/ListaTareas/${id}`, { nombre: nuevoNombre });
      setNombreLista(nuevoNombre);
      setEditandoNombre(false);
    } catch (err) {
      alert('Error al editar el nombre: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEditarTarea = (t) => {
    setEditandoTareaId(t.id);
    setTareaEdit({ titulo: t.titulo, etiqueta: t.etiqueta, comentario: t.comentario });
  };

  const handleGuardarTarea = async (tarea) => {
    try {
      await api.put(`/api/Tarea/${tarea.id}`, {
        ...tarea,
        titulo: tareaEdit.titulo,
        etiqueta: tareaEdit.etiqueta,
        comentario: tareaEdit.comentario
      });
      setEditandoTareaId(null);
      setTareaEdit({ titulo: '', etiqueta: '', comentario: '' });
      cargarTareas();
    } catch (err) {
      alert('Error al editar tarea: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancelarEditarTarea = () => {
    setEditandoTareaId(null);
    setTareaEdit({ titulo: '', etiqueta: '', comentario: '' });
  };

  return (
    <Container>
      <h2 style={{ marginBottom: '0.5em', fontWeight: 600, fontSize: '1.5em', letterSpacing: '0.5px' }}>
        {editandoNombre ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
            <Input
              value={nuevoNombre}
              onChange={e => setNuevoNombre(e.target.value)}
              style={{ width: '60%', marginRight: 0, marginBottom: 0 }}
            />
            <SaveNameButton type="button" onClick={handleGuardarNombre}>Guardar</SaveNameButton>
            <CancelNameButton type="button" onClick={() => setEditandoNombre(false)}>Cancelar</CancelNameButton>
          </span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
            Lista: {nombreLista}
            <EditNameButton type="button" onClick={handleEditarNombre}>Editar nombre</EditNameButton>
          </span>
        )}
      </h2>
      {/* Formulario para compartir lista */}
      <Section>
        <form onSubmit={handleCompartir} style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
          <Input
            value={usuarioCompartir}
            onChange={e => setUsuarioCompartir(e.target.value)}
            placeholder="Nombre de usuario para compartir"
            required
            style={{ marginBottom: 0, flex: 1 }}
          />
          <Button type="submit">Compartir lista</Button>
        </form>
        {errorCompartir && <div style={{ color: 'red', marginTop: '0.5em' }}>{errorCompartir}</div>}
      </Section>
      {/* Formulario para agregar tarea */}
      <Section>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" required />
          <Input value={etiqueta} onChange={e => setEtiqueta(e.target.value)} placeholder="Etiqueta (opcional)" />
          <Input value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Comentario (opcional)" />
          <Button type="submit" style={{ alignSelf: 'flex-end', marginLeft: 0 }}>Agregar tarea</Button>
        </form>
      </Section>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.map(t => (
          <ListItem key={t.id}>
            <Row>
              {editandoTareaId === t.id ? (
                <>
                  <Input
                    value={tareaEdit.titulo}
                    onChange={e => setTareaEdit({ ...tareaEdit, titulo: e.target.value })}
                    placeholder="Título"
                    style={{ marginBottom: 0, width: '30%' }}
                  />
                  <Input
                    value={tareaEdit.etiqueta}
                    onChange={e => setTareaEdit({ ...tareaEdit, etiqueta: e.target.value })}
                    placeholder="Etiqueta"
                    style={{ marginBottom: 0, width: '20%' }}
                  />
                  <Input
                    value={tareaEdit.comentario}
                    onChange={e => setTareaEdit({ ...tareaEdit, comentario: e.target.value })}
                    placeholder="Comentario"
                    style={{ marginBottom: 0, width: '30%' }}
                  />
                  <SaveButton type="button" onClick={() => handleGuardarTarea(t)}>Guardar</SaveButton>
                  <CancelButton type="button" onClick={handleCancelarEditarTarea}>Cancelar</CancelButton>
                </>
              ) : (
                <>
                  <span style={{ fontWeight: 500 }}>{t.titulo}</span>
                  <div style={{ display: 'flex', gap: '0.5em' }}>
                    <Button onClick={() => toggleEstado(t)} style={{ background: t.completada ? '#43a047' : '#1976d2', minWidth: '40px' }}>
                      {t.completada ? '✅' : '⏳'}
                    </Button>
                    <EditButton type="button" onClick={() => handleEditarTarea(t)}>Editar</EditButton>
                    <DangerButton onClick={() => eliminarTarea(t.id)}>Eliminar</DangerButton>
                  </div>
                </>
              )}
            </Row>
            {editandoTareaId !== t.id && (
              <>
                <small>Etiqueta: {t.etiqueta}</small>
                <small>Comentario: {t.comentario}</small>
              </>
            )}
          </ListItem>
        ))}
      </ul>
    </Container>
  );
}

export default ListaDetallePage;
