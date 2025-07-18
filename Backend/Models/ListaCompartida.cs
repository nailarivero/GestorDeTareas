namespace GestorTareas.Models
{
    public class ListaCompartida
    {
        public int Id { get; set; }
        public int ListaTareasId { get; set; }
        public ListaTareas Lista { get; set; }

        public int UsuarioCompartidoId { get; set; }
        public Usuario UsuarioCompartido { get; set; }
    }
}
