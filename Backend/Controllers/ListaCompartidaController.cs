using AppTareas.Data;
using AppTareas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaCompartidaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ListaCompartidaController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListaCompartida>>> GetCompartidas()
        {
            return await _context.ListasCompartidas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ListaCompartida>> GetCompartidaById(int id)
        {
            var compartida = await _context.ListasCompartidas.FindAsync(id);
            if (compartida == null)
                return NotFound();

            return Ok(compartida);
        }

        [HttpPost]
        public async Task<ActionResult<ListaCompartida>> CompartirLista(ListaCompartida compartida)
        {
            _context.ListasCompartidas.Add(compartida);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCompartidaById), new { id = compartida.Id }, compartida);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> BorrarCompartida(int id)
        {
            var compartida = await _context.ListasCompartidas.FindAsync(id);
            if (compartida == null)
                return NotFound();

            _context.ListasCompartidas.Remove(compartida);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
