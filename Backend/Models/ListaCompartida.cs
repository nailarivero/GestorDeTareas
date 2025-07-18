namespace AppTareas.Models
{
    public class ListaCompartida
    {
        public int Id { get; set; }

        public int ListaTareasId { get; set; }
        public ListaTareas? ListaTareas { get; set; }

        public int UsuarioCompartidoId { get; set; }
        public Usuario? UsuarioCompartido { get; set; }
    }
}
