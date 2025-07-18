using GestorTareas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;

namespace GestorTareas.Data
{
    public class AppDbContext : DbContext
    { 
        
            public AppDbContext(
                DbContextOptions<AppDbContext> options) : base(options)
            {

            }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<ListaTareas> Listas { get; set; }
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<ListaCompartida> ListasCompartidas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Usuario 1:N Listas
            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Listas)
                .WithOne(l => l.Usuario)
                .HasForeignKey(l => l.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            // ListaTareas 1:N Tareas
            modelBuilder.Entity<ListaTareas>()
                .HasMany(l => l.Tareas)
                .WithOne(t => t.Lista)
                .HasForeignKey(t => t.ListaTareasId)
                .OnDelete(DeleteBehavior.Cascade);

            // ListaTareas 1:N ListasCompartidas
            modelBuilder.Entity<ListaTareas>()
                .HasMany(l => l.Compartidas)
                .WithOne(c => c.Lista)
                .HasForeignKey(c => c.ListaTareasId)
                .OnDelete(DeleteBehavior.Cascade);

            // ListaCompartida -> UsuarioCompartido (sin cascada para evitar ciclos)
            modelBuilder.Entity<ListaCompartida>()
                .HasOne(c => c.UsuarioCompartido)
                .WithMany()
                .HasForeignKey(c => c.UsuarioCompartidoId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
    }

