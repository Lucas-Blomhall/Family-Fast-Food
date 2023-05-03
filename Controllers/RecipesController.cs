using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FamilyFastFoodFrontendApi.Data;
using FamilyFastFoodFrontendApi.DataModels;

namespace FamilyFastFoodFrontendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly FamilyFastFoodFrontendApiContext _context;

        public RecipesController(FamilyFastFoodFrontendApiContext context)
        {
            _context = context;
        }

        // GET: api/Recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipes>>> GetRecipes()
        {
          if (_context.Recipes == null)
          {
              return NotFound();
          }
            return await _context.Recipes.ToListAsync();
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipes>> GetRecipes(int id)
        {
          if (_context.Recipes == null)
          {
              return NotFound();
          }
            var recipes = await _context.Recipes.FindAsync(id);

            if (recipes == null)
            {
                return NotFound();
            }

            return recipes;
        }

        // PUT: api/Recipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipes(int id, Recipes recipes)
        {
            if (id != recipes.RecipeID)
            {
                return BadRequest();
            }

            _context.Entry(recipes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Recipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recipes>> PostRecipes(Recipes recipes)
        {
          if (_context.Recipes == null)
          {
              return Problem("Entity set 'FamilyFastFoodFrontendApiContext.Recipes'  is null.");
          }
            _context.Recipes.Add(recipes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipes", new { id = recipes.RecipeID }, recipes);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipes(int id)
        {
            if (_context.Recipes == null)
            {
                return NotFound();
            }
            var recipes = await _context.Recipes.FindAsync(id);
            if (recipes == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipesExists(int id)
        {
            return (_context.Recipes?.Any(e => e.RecipeID == id)).GetValueOrDefault();
        }
    }
}
