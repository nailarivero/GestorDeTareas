using AutoMapper;
using GestorTareas.Data;
using GestorTareas.Dto;
using GestorTareas.Interface;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorTareas.Services
{
    public class ListaCompartidaService : IListaCompartidaService
    {
        private readonly IListaCompartidaRepository _repo;
        private IMapper _mapper;
        public ListaCompartidaService(IListaCompartidaRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }
        public async Task<IEnumerable<ListaCompartidaDto>> GetCompartidas()
        {
            var compartidas = await _repo.GetAll();
            return _mapper.Map<IEnumerable<ListaCompartidaDto>>(compartidas);
        }
        public async Task<ListaCompartidaDto> GetCompartidaById(int id)
        {
            var compartidas = await _repo.GetById(id);
            return _mapper.Map<ListaCompartidaDto>(compartidas);
        }
        public async Task<ListaCompartidaDto> CompartirLista(ListaCompartidaDto dto)
        {
            var modelo = _mapper.Map<ListaCompartida>(dto);
            var creado = await _repo.Create(modelo);
            return _mapper.Map<ListaCompartidaDto>(creado);

        }
        public async Task<bool> BorrarCompartida(int id)
        {
            return await _repo.Delete(id);

        }
    }
    
}
