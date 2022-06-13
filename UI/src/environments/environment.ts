// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api: "https://172.20.10.1:7185/api",
  // player: "https://172.20.10.1:7185/api/players",
  // game: "https://172.20.10.1:7185/api/games",
  // text: "https://172.20.10.1:7185/api/texts",
  // gameText: "https://172.20.10.1:7185/api/GameTexts",
  // playerTexts: "https://172.20.10.1:7185/api/PlayerTexts",
  // kickPlayers: "https://172.20.10.1:7185/api/PlayersKicks"
  api: "https://localhost:7185/api",
  player: "https://localhost:7185/api/players",
  game: "https://localhost:7185/api/games",
  text: "https://localhost:7185/api/texts",
  gameText: "https://localhost:7185/api/GameTexts",
  playerTexts: "https://localhost:7185/api/PlayerTexts",
  kickPlayers: "https://localhost:7185/api/PlayersKicks"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
