using GestorTareas.Dto;
using System.Threading.Tasks;

namespace GestorTareas.Interface
{
    public interface IListaCompartidaService
    {
        Task<IEnumerable<ListaCompartidaDto>> GetCompartidas();
        Task<ListaCompartidaDto> GetCompartidaById(int id);
        Task<ListaCompartidaDto> CompartirLista(ListaCompartidaDto dto);
        Task<bool> BorrarCompartida(int id);
    }
}
