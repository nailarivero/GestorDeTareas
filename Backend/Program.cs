using GestorTareas;
using GestorTareas.Data;
using GestorTareas.Interface;
using GestorTareas.Repository;
using GestorTareas.Repository.Interfaces;
using GestorTareas.Services;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddAutoMapper(typeof(MappingProfile)); // config del automapper

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ITareaRepository, TareaRepository>();
builder.Services.AddScoped<IListaCompartidaRepository, ListaCompartidaRepository>();
builder.Services.AddScoped<IListaTareasRepository, ListaTareasRepository>();//inyeccion de dependencia del repositorio
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ITareaService, TareaService>();
builder.Services.AddScoped<IListaCompartidaService, ListaCompartidaService>();
builder.Services.AddScoped<IListaTareasService, ListaTareasService>();

//configuracion de la bd
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer
    (builder.Configuration.GetConnectionString("DefaultConnection")
    ));
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseHttpsRedirection();

app.UseCors("NuevaPolitica");
app.UseAuthorization();

app.MapControllers();

app.Run();
