namespace GestorTareas.Models
{
    public class ListaTareas
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public ICollection<Tarea> Tareas { get; set; }
        public ICollection<ListaCompartida> Compartidas { get; set; }
    }
}
