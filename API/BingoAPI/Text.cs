using System.ComponentModel.DataAnnotations;

namespace BingoAPI
{
    public class Text
    {
        public int Id { get; set; }

        [StringLength(150)]
        public string Value { get; set; } = string.Empty;
    }
}
