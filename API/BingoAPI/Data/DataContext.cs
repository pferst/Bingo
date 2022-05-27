using Microsoft.EntityFrameworkCore;

namespace BingoAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Player> Players { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<Text> Texts { get; set; }

        public DbSet<PlayerText> PlayerTexts { get; set; }
        public DbSet<GameText> GameTexts { get; set; }

    }
}
