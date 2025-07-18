using GestorTareas.Dto;
using GestorTareas.Models;

namespace GestorTareas.Repository.Interfaces
{
    public interface IListaTareasRepository
    {
        Task<IEnumerable<ListaTareas>> GetAll();
        Task<ListaTareas> GetById(int id);
        Task<ListaTareas> Create(ListaTareas listaTareas);
        Task<ListaTareas> Put(int id, ListaTareas listaTareas);
        Task<bool> Delete(int id);


        // Nuevo método para validar existencia de usuario
        Task<bool> GetUsuarioExists(int usuarioId);
    }
}
