﻿using System;
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
    public class IngredientsController : ControllerBase
    {
        private readonly FamilyFastFoodFrontendApiContext _context;

        public IngredientsController(FamilyFastFoodFrontendApiContext context)
        {
            _context = context;
        }

        // GET: api/Ingredients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingredients>>> GetIngredients()
        {
          if (_context.Ingredients == null)
          {
              return NotFound();
          }
            return await _context.Ingredients.ToListAsync();
        }

        // GET: api/Ingredients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ingredients>> GetIngredients(int id)
        {
          if (_context.Ingredients == null)
          {
              return NotFound();
          }
            var ingredients = await _context.Ingredients.FindAsync(id);

            if (ingredients == null)
            {
                return NotFound();
            }

            return ingredients;
        }

        // PUT: api/Ingredients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredients(int id, Ingredients ingredients)
        {
            if (id != ingredients.IngredientID)
            {
                return BadRequest();
            }

            _context.Entry(ingredients).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientsExists(id))
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

        // POST: api/Ingredients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ingredients>> PostIngredients(Ingredients ingredients)
        {
          if (_context.Ingredients == null)
          {
              return Problem("Entity set 'FamilyFastFoodFrontendApiContext.Ingredients'  is null.");
          }
            _context.Ingredients.Add(ingredients);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIngredients", new { id = ingredients.IngredientID }, ingredients);
        }

        // DELETE: api/Ingredients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngredients(int id)
        {
            if (_context.Ingredients == null)
            {
                return NotFound();
            }
            var ingredients = await _context.Ingredients.FindAsync(id);
            if (ingredients == null)
            {
                return NotFound();
            }

            _context.Ingredients.Remove(ingredients);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IngredientsExists(int id)
        {
            return (_context.Ingredients?.Any(e => e.IngredientID == id)).GetValueOrDefault();
        }
    }
}
