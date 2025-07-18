using AppTareas.Data;
using AppTareas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TareaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTareaById(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null)
                return NotFound();
            return Ok(tarea);
        }

        [HttpPost]
        public async Task<ActionResult<Tarea>> CrearTarea(Tarea tarea)
        {
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTareaById), new { id = tarea.Id }, tarea);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Tarea>> ActualizarTarea(int id, Tarea tarea)
        {
            var existente = await _context.Tareas.FindAsync(id);
            if (existente == null)
                return NotFound();

            existente.Titulo = tarea.Titulo;
            existente.Etiqueta = tarea.Etiqueta;
            existente.Comentario = tarea.Comentario;
            existente.Completada = tarea.Completada;
            existente.ListaTareasId = tarea.ListaTareasId;

            await _context.SaveChangesAsync();
            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> BorrarTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null)
                return NotFound();

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
