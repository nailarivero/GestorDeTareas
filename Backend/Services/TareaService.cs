using AutoMapper;
using GestorTareas.Dto;
using GestorTareas.Interface;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestorTareas.Services
{
    public class TareaService : ITareaService
    {
        private readonly ITareaRepository _repo;
        private readonly IMapper _mapper;

        public TareaService(ITareaRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TareaDto>> GetTareas()
        {
            var tareas = await _repo.GetAll();
            return _mapper.Map<IEnumerable<TareaDto>>(tareas);
        }

        public async Task<TareaDto> GetTareaById(int id)
        {
            var tarea = await _repo.GetById(id);
            return _mapper.Map<TareaDto>(tarea);
        }

        public async Task<TareaDto> CrearTarea(TareaDto tarea)
        {
            var modelo = _mapper.Map<Tarea>(tarea);
            var creado = await _repo.Create(modelo);
            return _mapper.Map<TareaDto>(creado);
        }

        public async Task<TareaDto> ActualizarTarea(int id, TareaDto tarea)
        {

            var existente = await _repo.GetById(id);
            if (existente == null) return null;

            _mapper.Map(tarea, existente); // aplica el mapeo directo
            var actualizado = await _repo.Put(id, existente);
            return _mapper.Map<TareaDto>(actualizado);
        }

        public async Task<bool> BorrarTarea(int id)
        {
            return await _repo.Delete(id);
        }
    }
}
