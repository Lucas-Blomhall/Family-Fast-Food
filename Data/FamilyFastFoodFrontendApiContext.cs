using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FamilyFastFoodFrontendApi.DataModels;

namespace FamilyFastFoodFrontendApi.Data
{
    public class FamilyFastFoodFrontendApiContext : DbContext
    {
        public FamilyFastFoodFrontendApiContext (DbContextOptions<FamilyFastFoodFrontendApiContext> options)
            : base(options)
        {
        }

        public DbSet<FamilyFastFoodFrontendApi.DataModels.Recipes> Recipes { get; set; } = default!;

        public DbSet<FamilyFastFoodFrontendApi.DataModels.Ingredients> Ingredients { get; set; } = default!;
    }
}
