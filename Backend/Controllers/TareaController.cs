using GestorTareas.Dto;
using GestorTareas.Interface;
using GestorTareas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestorTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ITareaService _repositorio;
        public TareaController(ITareaService repositorio)
        {
            _repositorio = repositorio;

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<TareaDto>>> GetTareas()
        {

            var tareas = await _repositorio.GetTareas();
            return Ok(tareas);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TareaDto>> GetTareaById(int id)
        {
            var tarea = await _repositorio.GetTareaById(id);
            if (tarea == null)
            {
                return NotFound();
            }

            return Ok(tarea);

        }
        [HttpPost]
        public async Task<ActionResult<TareaDto>> CrearTarea(TareaDto tarea)
        {
            var creada = await _repositorio.CrearTarea(tarea);
            return CreatedAtAction(nameof(GetTareaById), new { id = creada.Id }, creada);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TareaDto>> ActualizarTarea(int id, TareaDto tarea)
        {
            var tareaActualizada = await _repositorio.ActualizarTarea(id, tarea);
            if (tareaActualizada == null)
            {
                return NotFound();
            }
            return Ok(tareaActualizada);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> BorrarTarea(int id)
        {

            var eliminado = await _repositorio.BorrarTarea(id);
            if (!eliminado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

