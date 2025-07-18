using GestorTareas.Dto;
using GestorTareas.Models;

namespace GestorTareas.Interface;

public interface ITareaService
{
    Task<IEnumerable<TareaDto>> GetTareas();
    Task<TareaDto> GetTareaById(int id);
    Task<TareaDto> CrearTarea(TareaDto tarea);
    Task<TareaDto> ActualizarTarea(int id, TareaDto tarea);
    Task<bool> BorrarTarea(int id);
}
