using GestorTareas.Dto;
using GestorTareas.Interface;
using GestorTareas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestorTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaTareasController : ControllerBase
    {
        private readonly IListaTareasService _repositorio;
        public ListaTareasController(IListaTareasService repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListaTareasDto>>> GetListas()
        {
            var listas = await _repositorio.GetListas();
            return Ok(listas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ListaTareasDto>> GetListaById(int id)
        {
            var lista = await _repositorio.GetListaById(id);
            if (lista == null)
            {
                return NotFound();
            }

            return Ok(lista);
        }

        [HttpPost]
        public async Task<ActionResult<ListaTareasDto>> CrearLista(ListaTareasDto listaTareas)
        {
            var creada = await _repositorio.CrearLista(listaTareas);
            return CreatedAtAction(nameof(GetListaById), new { id = creada.Id }, creada);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ListaTareasDto>> ActualizarLista(int id, ListaTareasDto listaTareas)
        {
            var tareaActualizada = await _repositorio.ActualizarLista(id, listaTareas);
            if (tareaActualizada == null)
            {
                return NotFound();
            }
            return Ok(tareaActualizada);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> BorrarLista(int id)
        {
            var eliminado = await _repositorio.BorrarLista(id);
            if (!eliminado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
