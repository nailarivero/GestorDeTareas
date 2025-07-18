using GestorTareas.Data;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorTareas.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;
        public UsuarioRepository(AppDbContext dbcontext)
        {
            _context = dbcontext;
        }
        public async Task<IEnumerable<Usuario>> GetAll()
        {
            return await _context.Usuarios.ToListAsync();
        }
        public async Task<Usuario> GetById(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario> Create(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<bool> Delete(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return false;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}

