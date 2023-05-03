using System.ComponentModel.DataAnnotations;

namespace FamilyFastFoodFrontendApi.DataModels
{
    public class Ingredients
    {
        [Key]
        public int IngredientID { get; set; }
        public string IngredientName { get; set; }
        public int Protein { get; set; }
        public int TotalCarbohydrates { get; set; }
        public int TotalFat { get; set; }
        public int Calories { get; set; }

        public int? SaturatedFat { get; set; }
        public int? TransFat { get; set; }
        public int? Cholesterol { get; set; }
        public int? Sodium { get; set; }
        public int? DietaryFiber { get; set; }
        public int? Sugars { get; set; }
        public int? VitaminA { get; set; }
        public int? VitaminC { get; set; }
        public int? Calcium { get; set; }
        public int? Iron { get; set; }

        public int RecipeID { get; set; }  // foreign key property
        
        // navigation property
        public Recipes Recipe { get; set; }
    }
}
