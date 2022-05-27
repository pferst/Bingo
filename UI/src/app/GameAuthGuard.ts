import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import * as moment from "moment";
import {MainService} from "./main.service";
import {IPlayer} from "./Models/IPlayer";
import {SnackBarComponent} from "./snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class GameAuthGuard implements CanActivate {

  constructor(private router: Router, private mainService: MainService, private _snackBar: SnackBarComponent) {
  }

  canActivate(): boolean {
    const playerStorage = localStorage.getItem('player');
    const timeStamp = +localStorage.getItem('lastRequest');
    if(playerStorage)
    {
      const player = JSON.parse(playerStorage) as IPlayer;
      let duration = moment.duration(moment().diff(timeStamp));
      let hours = duration.asHours();
      if(hours > 3)
      {
        this.mainService.deletePlayer(player.id).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log("Error", error)
          },
          () => {
            this._snackBar.openSnackBar("Previous session timed out");
            localStorage.clear();
          }
        );
      }
    }
    return true;
  }
}
