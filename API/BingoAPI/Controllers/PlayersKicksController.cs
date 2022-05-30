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
    public class PlayersKicksController : ControllerBase
    {
        private readonly DataContext _context;

        public PlayersKicksController(DataContext context)
        {
            _context = context;
        }

        // GET: api/PlayersKicks/game/5
        [HttpGet("game/{id}")]
        public async Task<ActionResult<IEnumerable<PlayersKick>>> GetPlayersKickGame(int id)
        {
            if (_context.PlayersKick == null)
            {
                return NoContent();
            }
            var lista = _context.PlayersKick.Where(x => x.GameId == id).ToArray();
            //if(lista==null || lista.Length == 0)
            //{
            //    return NotFound();
            //}
            return lista;
            //return await _context.PlayersKick.ToListAsync();
        }

        // GET: api/PlayersKicks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayersKick>> GetPlayersKick(int id)
        {
            if (_context.PlayersKick == null)
            {
                return NotFound();
            }
            var playersKick = _context.PlayersKick.Where(x => x.PlayerId == id).First();
            //var playersKick = await _context.PlayersKick.FindAsync(id);

            if (playersKick == null)
            {
                return NotFound();
            }

            return playersKick;
        }

        // PUT: api/PlayersKicks/F1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("F1/{id}")]
        public async Task<IActionResult> PutPlayersKickF1(int id, PlayersKick playersKick)
        {
            if (id != playersKick.PlayerId)
            {
                return BadRequest();
            }
            playersKick = _context.PlayersKick.Where(x => x.PlayerId == id).First();
            playersKick.F1++;
            _context.Entry(playersKick).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayersKickExists(id))
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
        // PUT: api/PlayersKicks/F1/5
        [HttpPut("F2/{id}")]
        public async Task<IActionResult> PutPlayersKickF2(int id, PlayersKick playersKick)
        {
            if (id != playersKick.Id)
            {
                return BadRequest();
            }
            playersKick = _context.PlayersKick.Where(x => x.PlayerId == id).First();
            playersKick.F2++;
            _context.Entry(playersKick).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayersKickExists(id))
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

        // POST: api/PlayersKicks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlayersKick>> PostPlayersKick(PlayersKick playersKick)
        {
            if (_context.PlayersKick == null)
            {
                return Problem("Entity set 'DataContext.PlayersKick'  is null.");
            }
            _context.PlayersKick.Add(playersKick);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayersKick", new { id = playersKick.Id }, playersKick);
        }

        // DELETE: api/PlayersKicks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayersKick(int id)
        {
            if (_context.PlayersKick == null)
            {
                return NotFound();
            }
            var playersKick = _context.PlayersKick.Where(x => x.PlayerId==id).First();
            if (playersKick == null)
            {
                return NotFound();
            }

            _context.PlayersKick.Remove(playersKick);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlayersKickExists(int id)
        {
            return (_context.PlayersKick?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
