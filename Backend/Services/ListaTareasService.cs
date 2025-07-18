using AutoMapper;
using GestorTareas.Dto;
using GestorTareas.Interface;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorTareas.Services
{
    public class ListaTareasService : IListaTareasService
    {
        private readonly IListaTareasRepository _repo;
        private IMapper _mapper;
        public ListaTareasService(IListaTareasRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }
        public async Task<IEnumerable<ListaTareasDto>> GetListas()
        {
            var listas = await _repo.GetAll();
            return _mapper.Map<IEnumerable<ListaTareasDto>>(listas);
        }
        public async Task<ListaTareasDto> GetListaById(int id)
        {
            var listas = await _repo.GetById(id);
            return _mapper.Map<ListaTareasDto>(listas);
        }
        public async Task<ListaTareasDto> CrearLista(ListaTareasDto listaTareas)
        {
            // Validar que el UsuarioId existe antes de crear la lista
            var usuarioExiste = await _repo.GetUsuarioExists(listaTareas.UsuarioId);
            if (!usuarioExiste)
                throw new ArgumentException("El UsuarioId no existe en la base de datos.");

            var modelo = _mapper.Map<ListaTareas>(listaTareas);
            var creado = await _repo.Create(modelo);
            return _mapper.Map<ListaTareasDto>(creado);

        }
        public async Task<ListaTareasDto> ActualizarLista(int id, ListaTareasDto listaTareas)
        {
            var existente = await _repo.GetById(id);
            if (existente == null) return null;

            existente.Nombre = listaTareas.Nombre;
            existente.UsuarioId = listaTareas.UsuarioId;

            var actualizado = await _repo.Put(id, existente);
            return _mapper.Map<ListaTareasDto>(actualizado);
        }
        public async Task<bool> BorrarLista(int id)
        {
            return await _repo.Delete(id);

        }
    }
}