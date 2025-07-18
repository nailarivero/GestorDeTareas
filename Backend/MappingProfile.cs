using AutoMapper;
using GestorTareas.Dto;
using GestorTareas.Models;

namespace GestorTareas
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
            CreateMap<Tarea, TareaDto>().ReverseMap();
            CreateMap<Usuario, UsuarioDto>().ReverseMap();
            CreateMap<ListaTareas, ListaTareasDto>().ReverseMap();
            CreateMap<ListaCompartida, ListaCompartidaDto>().ReverseMap();
            
        }
    }
}
