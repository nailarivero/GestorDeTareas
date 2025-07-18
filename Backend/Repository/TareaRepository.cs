using GestorTareas.Data;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GestorTareas.Repository 
{
    public class TareaRepository : ITareaRepository
    {
        private readonly AppDbContext _context;
        public TareaRepository(AppDbContext dbcontext)
        {
            _context = dbcontext;
        }
        public async Task<IEnumerable<Tarea>> GetAll()
        {
            return await _context.Tareas.ToListAsync();
        }
        public async Task<Tarea> GetById(int id)
        {
            return await _context.Tareas.FindAsync(id);
        }

        public async Task<Tarea> Create(Tarea tarea )
        {
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();
            return tarea;
        }
        public async Task<Tarea> Put(int id, Tarea tarea )
        {
            var existente = await _context.Tareas.FindAsync(id);
            if (existente == null) return null;

            existente.Titulo = tarea.Titulo;
            existente.Comentario = tarea.Comentario;
            existente.Etiqueta = tarea.Etiqueta;
            existente.Completada = tarea.Completada;
            existente.ListaTareasId = tarea.ListaTareasId;

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task<bool> Delete(int id)
        {
            var compartida = await _context.Tareas.FindAsync(id);
            if (compartida == null) return false;

            _context.Tareas.Remove(compartida);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
    
