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
    public class PlayerTextsController : ControllerBase
    {
        private readonly DataContext _context;

        public PlayerTextsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PlayerTexts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerText>>> GetPlayerTexts()
        {
          if (_context.PlayerTexts == null)
          {
              return NotFound();
          }
            return await _context.PlayerTexts.ToListAsync();
        }

        // GET: api/PlayerTexts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerText>> GetPlayerText(int id)
        {
          if (_context.PlayerTexts == null)
          {
              return NotFound();
          }
            var playerText = await _context.PlayerTexts.FindAsync(id);

            if (playerText == null)
            {
                return NotFound();
            }

            return playerText;
        }

        // PUT: api/PlayerTexts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayerText(int id, PlayerText playerText)
        {
            if (id != playerText.ID)
            {
                return BadRequest();
            }

            _context.Entry(playerText).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerTextExists(id))
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

        // POST: api/PlayerTexts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlayerText>> PostPlayerText(PlayerText playerText)
        {
          if (_context.PlayerTexts == null)
          {
              return Problem("Entity set 'DataContext.PlayerTexts'  is null.");
          }
            _context.PlayerTexts.Add(playerText);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayerText", new { id = playerText.ID }, playerText);
        }

        // DELETE: api/PlayerTexts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayerText(int id)
        {
            if (_context.PlayerTexts == null)
            {
                return NotFound();
            }
            var playerText = await _context.PlayerTexts.FindAsync(id);
            if (playerText == null)
            {
                return NotFound();
            }

            _context.PlayerTexts.Remove(playerText);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlayerTextExists(int id)
        {
            return (_context.PlayerTexts?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
