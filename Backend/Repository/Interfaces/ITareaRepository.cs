using GestorTareas.Dto;
using GestorTareas.Models;

namespace GestorTareas.Repository.Interfaces
{
    public interface ITareaRepository
    {
        Task<IEnumerable<Tarea>> GetAll();
        Task<Tarea> GetById(int id);
        Task<Tarea> Create(Tarea tarea);
        Task<Tarea> Put(int id, Tarea tarea);
        Task<bool> Delete(int id);
    }
}
