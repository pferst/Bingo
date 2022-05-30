using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BingoAPI.Migrations
{
    public partial class improvement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameId",
                table: "PlayersKick",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PlayersKick_GameId",
                table: "PlayersKick",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayersKick_Games_GameId",
                table: "PlayersKick",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayersKick_Games_GameId",
                table: "PlayersKick");

            migrationBuilder.DropIndex(
                name: "IX_PlayersKick_GameId",
                table: "PlayersKick");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "PlayersKick");
        }
    }
}
