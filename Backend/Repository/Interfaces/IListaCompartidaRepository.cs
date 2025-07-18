using GestorTareas.Models;

namespace GestorTareas.Repository.Interfaces
{
    public interface IListaCompartidaRepository
    {
        Task<IEnumerable<ListaCompartida>> GetAll();
        Task<ListaCompartida> GetById(int id);
        Task<ListaCompartida> Create(ListaCompartida compartida);
        Task<bool> Delete(int id);
    }
}
