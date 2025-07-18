using GestorTareas.Dto;
using GestorTareas.Models;

namespace GestorTareas.Interface;

public interface IListaTareasService
{
    Task<IEnumerable<ListaTareasDto>> GetListas();
    Task<ListaTareasDto> GetListaById(int id);
    Task<ListaTareasDto> CrearLista(ListaTareasDto listaTareas);
    Task<ListaTareasDto> ActualizarLista(int id, ListaTareasDto listaTareas);
    Task<bool> BorrarLista(int id);
}
