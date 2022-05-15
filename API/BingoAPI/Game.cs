using System.ComponentModel.DataAnnotations;

namespace BingoAPI
{
    public class Game
    {
        public int Id { get; set; }

        [StringLength(10)]
        public string Name { get; set; } = string.Empty;
    }
}
