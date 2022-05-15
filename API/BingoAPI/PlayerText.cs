using Microsoft.EntityFrameworkCore;

namespace BingoAPI
{
    [Keyless]
    public class PlayerText
    {
        public int TextId { get; set; }
        public Text? Text { get; set; }
        public int PlayerId { get; set; }
        public Player? Player { get; set; }
    }
}
