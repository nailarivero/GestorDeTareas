using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppTareas.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contraseña = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ListaTareas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListaTareas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListaTareas_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ListasCompartidas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListaTareasId = table.Column<int>(type: "int", nullable: false),
                    UsuarioCompartidoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListasCompartidas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListasCompartidas_ListaTareas_ListaTareasId",
                        column: x => x.ListaTareasId,
                        principalTable: "ListaTareas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ListasCompartidas_Usuarios_UsuarioCompartidoId",
                        column: x => x.UsuarioCompartidoId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tareas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comentario = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Etiqueta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Completada = table.Column<bool>(type: "bit", nullable: false),
                    ListaTareasId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tareas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tareas_ListaTareas_ListaTareasId",
                        column: x => x.ListaTareasId,
                        principalTable: "ListaTareas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListasCompartidas_ListaTareasId",
                table: "ListasCompartidas",
                column: "ListaTareasId");

            migrationBuilder.CreateIndex(
                name: "IX_ListasCompartidas_UsuarioCompartidoId",
                table: "ListasCompartidas",
                column: "UsuarioCompartidoId");

            migrationBuilder.CreateIndex(
                name: "IX_ListaTareas_UsuarioId",
                table: "ListaTareas",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Tareas_ListaTareasId",
                table: "Tareas",
                column: "ListaTareasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ListasCompartidas");

            migrationBuilder.DropTable(
                name: "Tareas");

            migrationBuilder.DropTable(
                name: "ListaTareas");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
