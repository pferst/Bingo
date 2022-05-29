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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayerText(int id, PlayerText playerText)
        {
            if (id != playerText.PlayerId)
            {
                return BadRequest();
            }

            var playerTextGot = _context.PlayerTexts.Where(x => x.PlayerId == playerText.PlayerId && x.TextId == playerText.TextId).Take(1).ToList();
            playerTextGot[0].Checked = playerText.Checked;
            Player playerInfo = _context.Players.Where(x => x.Id == playerText.PlayerId).First();

            playerInfo.Points = playerText.Checked ? playerInfo.Points + 1 : playerInfo.Points - 1;
            var playersFromGame = _context.Players.Where(x => x.GameId == playerInfo.GameId).OrderBy(player => player.Position).ToList();
            if (playersFromGame.Count > 1)
            {
                if (playerText.Checked)
                {
                    bool flagUp = true;
                    for (int i = 0; i < playersFromGame.Count; i++)
                    {
                        if (playerText.Checked && playerInfo.Points > playersFromGame[i].Points && playerInfo.Id != playersFromGame[i].Id)
                        {
                            if (flagUp)
                            {
                                playerInfo.Position = playersFromGame[i].Position;
                                flagUp = false;
                            }
                            playersFromGame[i].Position++;
                        }
                    }
                    if (flagUp)
                    {
                        playerInfo.Position = playersFromGame.Last().Position + 1;
                    }
                }
                else
                {
                    //bool flagDown = false;
                    for (int i = 0; i < playersFromGame.Count; i++)
                    {
                        if (playerInfo.Points <= playersFromGame[i].Points && playerInfo.Id != playersFromGame[i].Id)
                        {
                            (playerInfo.Position, playersFromGame[i].Position) = (playersFromGame[i].Position, playerInfo.Position);
                        }
                    }
                }
            }
            else
            {
                playerInfo.Position = 1;
            }

            _context.Entry(playerTextGot[0]).State = EntityState.Modified;
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
