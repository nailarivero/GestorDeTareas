using GestorTareas.Data;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorTareas.Repository
{
    public class ListaTareasRepository : IListaTareasRepository
    {
        private readonly AppDbContext _context;
        public ListaTareasRepository(AppDbContext dbcontext)
        {
            _context = dbcontext;
        }
        public async Task<IEnumerable<ListaTareas>> GetAll()
        {
            return await _context.Listas.ToListAsync();
        }
        public async Task<ListaTareas> GetById(int id)
        {
            return await _context.Listas.FindAsync(id);
        }

        public async Task<ListaTareas> Create(ListaTareas listaTareas)
        {
            _context.Listas.Add(listaTareas);
            await _context.SaveChangesAsync();
            return listaTareas;
        }
        public async Task<ListaTareas> Put(int id, ListaTareas listaTareas)
        {
            var existente = await _context.Listas.FindAsync(id);
            if (existente == null) return null;

            existente.Nombre = listaTareas.Nombre;
            existente.UsuarioId = listaTareas.UsuarioId;

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task<bool> Delete(int id)
        {
            var listaTareas = await _context.Listas.FindAsync(id);
            if (listaTareas == null) return false;

            _context.Listas.Remove(listaTareas);
            await _context.SaveChangesAsync();
            return true;
        }

        // Implementación para validar existencia de usuario
        public async Task<bool> GetUsuarioExists(int usuarioId)
        {
            return await _context.Usuarios.AnyAsync(u => u.Id == usuarioId);
        }
    }
}