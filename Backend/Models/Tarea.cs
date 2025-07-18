namespace GestorTareas.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Etiqueta { get; set; }
        public string Comentario { get; set; }
        public bool Completada { get; set; }

        public int ListaTareasId { get; set; }
        public ListaTareas Lista { get; set; }
    }
}

