using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BingoAPI;
using BingoAPI.Data;

namespace BingoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameTextsController : ControllerBase
    {
        private readonly DataContext _context;

        public GameTextsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/GameTexts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameText>>> GetGameTexts()
        {
          if (_context.GameTexts == null)
          {
              return NotFound();
          }
            return await _context.GameTexts.ToListAsync();
        }

        // GET: api/GameTexts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameText>> GetGameText(int id)
        {
          if (_context.GameTexts == null)
          {
              return NotFound();
          }
            var gameText = await _context.GameTexts.FindAsync(id);

            if (gameText == null)
            {
                return NotFound();
            }

            return gameText;
        }

        // PUT: api/GameTexts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameText(int id, GameText gameText)
        {
            if (id != gameText.ID)
            {
                return BadRequest();
            }

            _context.Entry(gameText).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameTextExists(id))
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

        // POST: api/GameTexts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameText[]>> PostGameText(GameText[] gameTexts)
        {
            if (_context.GameTexts == null)
            {
                return Problem("Entity set 'DataContext.GameTexts'  is null.");
            }
            foreach (GameText gameText in gameTexts)
            {
                _context.GameTexts.Add(gameText);
            }
           
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameTexts", gameTexts);
        }

        // DELETE: api/GameTexts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameText(int id)
        {
            if (_context.GameTexts == null)
            {
                return NotFound();
            }
            var gameText = await _context.GameTexts.FindAsync(id);
            if (gameText == null)
            {
                return NotFound();
            }

            _context.GameTexts.Remove(gameText);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameTextExists(int id)
        {
            return (_context.GameTexts?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
