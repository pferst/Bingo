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
        public async Task<ActionResult<IEnumerable<PlayerText>>> GetPlayerText(int id)
        {
            if (_context.PlayerTexts == null)
            {
                return NotFound();
            }
            var playerTextGot = await _context.PlayerTexts.Where(x => x.PlayerId == id).ToListAsync();
            //var playerText = await _context.PlayerTexts.FindAsync(id);

            if (playerTextGot==null)
            {
                return NotFound();
            }

            return playerTextGot;
        }

        // PUT: api/PlayerTexts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754AA
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayerText(int id, PlayerText playerText)
        {
            if (id != playerText.PlayerId)
            {
                return BadRequest();
            }

            var playerTextGot = _context.PlayerTexts.Where(x => x.PlayerId == playerText.PlayerId && x.TextId == playerText.TextId).First();
            playerTextGot.Checked = playerText.Checked;
            Player playerInfo = _context.Players.Where(x => x.Id == playerText.PlayerId).First();

            playerInfo.Points = playerText.Checked ? playerInfo.Points + 1 : playerInfo.Points - 1;
            IOrderedQueryable<Player>? playersFromGame = _context.Players.Where(x => x.GameId == playerInfo.GameId).OrderByDescending(x => x.Position);
            
            if (playerText.Checked && playersFromGame!=null)
            {
                foreach(Player x in playersFromGame)
                {
                    if (playerInfo.Position > x.Position && playerInfo.Points > x.Points && playerInfo.Id != x.Id)
                    {
                        var temp = playerInfo.Position;
                        playerInfo.Position = x.Position;
                        x.Position = temp;
                    }
                    else if (playerInfo.Position > x.Position && playerInfo.Id != x.Id && playerInfo.Points <= x.Points)
                    {
                        break;
                    }
                }
            }
            else if(playersFromGame != null)
            {
                playersFromGame = _context.Players.Where(x => x.GameId == playerInfo.GameId).OrderBy(x => x.Position);
                foreach (Player x in playersFromGame)
                {
                    if (playerInfo.Points <= x.Points && playerInfo.Position < x.Position && playerInfo.Id != x.Id)
                    {
                        (playerInfo.Position, x.Position) = (x.Position, playerInfo.Position);
                    }
                }
            }

            _context.Entry(playerTextGot).State = EntityState.Modified;
            //_context.Entry(playerInfo).State = EntityState.Modified;
            //_context.Entry(playersFromGame).State = EntityState.Modified;

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
        public async Task<ActionResult<PlayerText[]>> PostPlayerText(PlayerText[] playerTexts)
        {
            if (_context.PlayerTexts == null)
            {
                return Problem("Entity set 'DataContext.PlayerTexts'  is null.");
            }
            foreach (PlayerText text in playerTexts)
            {
                _context.PlayerTexts.Add(text);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayerTexts", playerTexts);
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
