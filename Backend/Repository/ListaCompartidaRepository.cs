using GestorTareas.Data;
using GestorTareas.Dto;
using GestorTareas.Interface;
using Microsoft.EntityFrameworkCore;
using GestorTareas.Models;
using GestorTareas.Repository.Interfaces;

namespace GestorTareas.Repository
{
    public class ListaCompartidaRepository : IListaCompartidaRepository
    {
        private readonly AppDbContext _context;
        public ListaCompartidaRepository(AppDbContext dbcontext)
        {
            _context = dbcontext;
        }
        public async Task<IEnumerable<ListaCompartida>> GetAll()
        {
            return await _context.ListasCompartidas.ToListAsync();
        }
        public async Task<ListaCompartida> GetById(int id)
        {
            return await _context.ListasCompartidas.FindAsync(id);
        }

        public async Task<ListaCompartida> Create(ListaCompartida compartida)
        {
            _context.ListasCompartidas.Add(compartida);
            await _context.SaveChangesAsync();
            return compartida;
        }

        public async Task<bool> Delete(int id)
        {
            var compartida = await _context.ListasCompartidas.FindAsync(id);
            if (compartida == null) return false;

            _context.ListasCompartidas.Remove(compartida);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
          
