using AppTareas.Data;
using AppTareas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace AppTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaTareasController : ControllerBase
    {
           private readonly ApplicationDbContext _context;
            public ListaTareasController(ApplicationDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<ListaTareas>>> GetListas()
            {
                return await _context.ListaTareas
                                     .Include(l => l.Tareas)
                                     .Include(l => l.ListasCompartidas)
                                     .ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<ListaTareas>> GetListaById(int id)
            {
                var lista = await _context.ListaTareas
                                          .Include(l => l.Tareas)
                                          .Include(l => l.ListasCompartidas)
                                          .FirstOrDefaultAsync(l => l.Id == id);
                if (lista == null)
                    return NotFound();

                return Ok(lista);
            }

            [HttpPost]
            public async Task<ActionResult<ListaTareas>> CrearLista(ListaTareas lista)
            {
            _context.ListaTareas.Add(lista);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetListaById), new { id = lista.Id }, lista);
            }

            [HttpPut("{id}")]
            public async Task<ActionResult<ListaTareas>> ActualizarLista(int id, ListaTareas lista)
            {
                var existente = await _context.ListaTareas.FindAsync(id);
                if (existente == null)
                    return NotFound();

                existente.Nombre = lista.Nombre;
                existente.UsuarioId = lista.UsuarioId;

                await _context.SaveChangesAsync();
                return Ok(existente);
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> BorrarLista(int id)
            {
                var lista = await _context.ListaTareas.FindAsync(id);
                if (lista == null)
                    return NotFound();

                _context.ListaTareas.Remove(lista);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
    }

