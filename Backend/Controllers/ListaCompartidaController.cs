using GestorTareas.Dto;
using GestorTareas.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestorTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaCompartidaController : ControllerBase
    {
        private readonly IListaCompartidaService _repositorio;
        public ListaCompartidaController(IListaCompartidaService repositorio)
        {
            _repositorio = repositorio;

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<ListaCompartidaDto>>> GetCompartidas()
        {

            var compartidas = await _repositorio.GetCompartidas();
            return Ok(compartidas);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ListaCompartidaDto>> GetCompartidaById(int id)
        {
            var compartida = await _repositorio.GetCompartidaById(id);
            if (compartida == null)
            {
                return NotFound();
            }

            return Ok(compartida);

        }
        [HttpPost]

        public async Task<ActionResult<ListaCompartidaDto>> CompartirLista(ListaCompartidaDto dto)
        {

            var creada = await _repositorio.CompartirLista(dto);
            return CreatedAtAction(nameof(GetCompartidaById), new { id = creada.Id }, creada);

        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> BorrarCompartida(int id)
        {

            var eliminado = await _repositorio.BorrarCompartida(id);
            if (!eliminado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

