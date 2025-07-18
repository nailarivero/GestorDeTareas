using GestorTareas.Dto;
using GestorTareas.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestorTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _repositorio;
        public  UsuarioController (IUsuarioService repositorio)
        {
            _repositorio = repositorio;

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<UsuarioDto>>> GetUsuarios()
        {

            var usuarios = await _repositorio.GetUsuarios();
            return Ok(usuarios);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDto>> GetUsuarioById(int id)
        {
            var usuario = await _repositorio.GetUsuarioById(id);
            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);

        }
        [HttpPost]

        public async Task<ActionResult<UsuarioDto>> CrearUsuario(UsuarioDto usuario )
        {
            var creado = await _repositorio.CrearUsuario(usuario);
            return CreatedAtAction(nameof(GetUsuarioById), new { id = creado.Id }, creado);

        }
        [HttpDelete("{id}")]

        public async Task<ActionResult> BorrarUsuario(int id)
        {

            var eliminado = await _repositorio.BorrarUsuario(id);
            if (!eliminado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

