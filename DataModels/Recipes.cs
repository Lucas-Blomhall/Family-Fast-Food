using System.ComponentModel.DataAnnotations;

namespace FamilyFastFoodFrontendApi.DataModels
{
    public class Recipes
    {
        [Key]
        public int RecipeID { get; set; }
        public string RecipeTitle { get; set; }
        public string? Description { get; set; }
        public string? PrepTime { get; set; }
        public string? TotalTime { get; set; }
        public int? ServingSize { get; set; }
        public string? Category { get; set; }
        public string? Cuisine { get; set; }
        public string? Tags { get; set; }
        public string? ImageURL { get; set; }
    }
}
