namespace GestorTareas.Models
{
    public class Usuario
    {
        public int Id { get; set; } 
        public string Nombre { get; set; }
        public string Contraseña { get; set; }
        public ICollection<ListaTareas> Listas { get; set; }
    }
}
