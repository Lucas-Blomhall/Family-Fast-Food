using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyFastFoodFrontendApi.Migrations
{
    /// <inheritdoc />
    public partial class mssqllocal_migration_332 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipeTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrepTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServingSize = table.Column<int>(type: "int", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cuisine = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageURL = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.RecipeID);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    IngredientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IngredientName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Protein = table.Column<int>(type: "int", nullable: false),
                    TotalCarbohydrates = table.Column<int>(type: "int", nullable: false),
                    TotalFat = table.Column<int>(type: "int", nullable: false),
                    Calories = table.Column<int>(type: "int", nullable: false),
                    SaturatedFat = table.Column<int>(type: "int", nullable: true),
                    TransFat = table.Column<int>(type: "int", nullable: true),
                    Cholesterol = table.Column<int>(type: "int", nullable: true),
                    Sodium = table.Column<int>(type: "int", nullable: true),
                    DietaryFiber = table.Column<int>(type: "int", nullable: true),
                    Sugars = table.Column<int>(type: "int", nullable: true),
                    VitaminA = table.Column<int>(type: "int", nullable: true),
                    VitaminC = table.Column<int>(type: "int", nullable: true),
                    Calcium = table.Column<int>(type: "int", nullable: true),
                    Iron = table.Column<int>(type: "int", nullable: true),
                    RecipeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.IngredientID);
                    table.ForeignKey(
                        name: "FK_Ingredients_Recipes_RecipeID",
                        column: x => x.RecipeID,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_RecipeID",
                table: "Ingredients",
                column: "RecipeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Recipes");
        }
    }
}
