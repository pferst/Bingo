namespace BingoAPI
{
    public class PlayersKick
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public Player? Player { get; set; }
        public int GameId { get; set; }
        public Game? Game { get; set; }
        public int F1 { get; set; }
        public int F2 { get; set; }

    }
}
