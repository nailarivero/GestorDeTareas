using AppTareas.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace AppTareas.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<ListaTareas> ListaTareas { get; set; }
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<ListaCompartida> ListasCompartidas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 🔁 Romper ciclo: NO usar Delete Cascade
            modelBuilder.Entity<ListaTareas>()
                .HasOne(lt => lt.Usuario)
                .WithMany(u => u.ListasTareas)
                .HasForeignKey(lt => lt.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ListaCompartida>()
                .HasOne(lc => lc.UsuarioCompartido)
                .WithMany(u => u.ListasCompartidas)
                .HasForeignKey(lc => lc.UsuarioCompartidoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ListaCompartida>()
                .HasOne(lc => lc.ListaTareas)
                .WithMany(lt => lt.ListasCompartidas)
                .HasForeignKey(lc => lc.ListaTareasId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Tarea>()
                .HasOne(t => t.ListaTareas)
                .WithMany(lt => lt.Tareas)
                .HasForeignKey(t => t.ListaTareasId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
