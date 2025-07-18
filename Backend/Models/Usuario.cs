namespace AppTareas.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string? Nombre { get; set; } 
        public string? Contraseña { get; set; } 

        public ICollection<ListaTareas>? ListasTareas { get; set; }
        public ICollection<ListaCompartida>? ListasCompartidas { get; set; }
    }
}
