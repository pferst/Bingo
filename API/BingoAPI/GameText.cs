namespace BingoAPI
{
    public class GameText
    {
        public int ID { get; set; }
        public int TextId { get; set; }
        public Text? Text { get; set; }
        public int GameId { get; set; }
        public Game? Gamee { get; set; }
    }
}
