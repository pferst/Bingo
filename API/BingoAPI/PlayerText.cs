using Microsoft.EntityFrameworkCore;

namespace BingoAPI
{
    public class PlayerText
    {
        public int ID { get; set; }
        public int TextId { get; set; }
        public Text? Text { get; set; }
        public int PlayerId { get; set; }
        public Player? Player { get; set; }
        public bool Checked { get; set; }
    }
}
