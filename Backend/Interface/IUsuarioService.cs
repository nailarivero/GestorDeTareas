using GestorTareas.Dto;
using GestorTareas.Models;

namespace GestorTareas.Interface;

public interface IUsuarioService
{
    Task<IEnumerable<UsuarioDto>> GetUsuarios();
    Task<UsuarioDto> GetUsuarioById(int id);
    Task<UsuarioDto> CrearUsuario(UsuarioDto usuario);
    Task<bool> BorrarUsuario(int id);
}
