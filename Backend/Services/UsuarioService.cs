using AutoMapper;
using GestorTareas.Dto;
using GestorTareas.Interface;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestorTareas.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repo;
        private readonly IMapper _mapper;

        public UsuarioService(IUsuarioRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UsuarioDto>> GetUsuarios()
        {
            var usuarios = await _repo.GetAll();
            return _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
        }

        public async Task<UsuarioDto> GetUsuarioById(int id)
        {
            var usuario = await _repo.GetById(id);
            return _mapper.Map<UsuarioDto>(usuario);
        }

        public async Task<UsuarioDto> CrearUsuario(UsuarioDto usuario)
        {
            var modelo = _mapper.Map<Usuario>(usuario);
            var creado = await _repo.Create(modelo);
            return _mapper.Map<UsuarioDto>(creado);
        }

        public async Task<bool> BorrarUsuario(int id)
        {
            return await _repo.Delete(id);
        }
    }
}
