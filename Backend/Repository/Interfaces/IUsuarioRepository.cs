using GestorTareas.Models;

namespace GestorTareas.Repository.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> GetAll();
        Task<Usuario> GetById(int id);
        Task<Usuario> Create(Usuario usuario);
        Task<bool> Delete(int id);
    }
}

