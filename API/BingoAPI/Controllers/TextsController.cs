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
    public class TextsController : ControllerBase
    {
        private readonly DataContext _context;

        public TextsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Texts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Text>>> GetTexts()
        {
          if (_context.Texts == null)
          {
              return NotFound();
          }
            return await _context.Texts.ToListAsync();
        }

        // GET: api/Texts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Text>> GetText(int id)
        {
          if (_context.Texts == null)
          {
              return NotFound();
          }
            var text = await _context.Texts.FindAsync(id);

            if (text == null)
            {
                return NotFound();
            }

            return text;
        }

        // PUT: api/Texts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutText(int id, Text text)
        {
            if (id != text.Id)
            {
                return BadRequest();
            }

            _context.Entry(text).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TextExists(id))
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

        // POST: api/Texts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Text>> PostText(Text text)
        {
          if (_context.Texts == null)
          {
              return Problem("Entity set 'DataContext.Texts'  is null.");
          }
            _context.Texts.Add(text);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetText", new { id = text.Id }, text);
        }

        // DELETE: api/Texts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteText(int id)
        {
            if (_context.Texts == null)
            {
                return NotFound();
            }
            var text = await _context.Texts.FindAsync(id);
            if (text == null)
            {
                return NotFound();
            }

            _context.Texts.Remove(text);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TextExists(int id)
        {
            return (_context.Texts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
