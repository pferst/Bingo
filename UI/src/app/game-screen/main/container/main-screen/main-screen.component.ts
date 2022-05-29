import {Component, OnDestroy, OnInit} from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MainService} from "../../../../main.service";
import {IPlayer} from "../../../../Models/IPlayer";
import {IPlayerText} from "../../../../Models/IPlayerText";
import {MatDialog} from "@angular/material/dialog";
import {CloseDialogComponent} from "../../components/close-dialog/close-dialog.component";
import { Subscription } from "rxjs";
import { interval } from 'rxjs';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {
  texts: Array<IText> = [];
  players: Array<IPlayer> = [];
  user: IPlayer = null;
  sub: Subscription;

  constructor(private mainService: MainService, public dialog: MatDialog) {
    this.sub = interval(10000)
      .subscribe((val) => { this.refreshPlayers()});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.refreshPlayers();
    //list of texts
    const textsStr: string = localStorage.getItem('texts');
    if(textsStr)
    {
      const texts: IText[] = JSON.parse(textsStr) as IText[];
      this.texts = texts;
      // console.log(texts);
    }
    else
    {
      const playerStr: string|null = localStorage.getItem('player');
      if(!playerStr)
      {
        localStorage.clear();
        this.mainService.redirectToHome();
      }
      else {
        const player: IPlayer = JSON.parse(playerStr) as IPlayer;
        console.log(player);
        // check if server has mine texts
        let pt: IPlayerText[] = [];
        this.mainService.getPlayerTexts(player.id).subscribe(
          data => pt = data as IPlayerText[],
          error => console.log("Error", error),
          () => {
            if(pt.length===0)
            {
              console.log("Tu Cię nie powinno być");
              let gameTexts: IText[];
              this.mainService.getTexts4Game(player.gameId).subscribe(
                data => {
                  gameTexts = data as IText[];
                },
                error => console.log("Error", error),
                () => {
                  if(gameTexts==null)
                  {
                    localStorage.clear();
                    this.mainService.redirectToHome();
                  }
                  console.log(gameTexts);
                  this.texts = this.drawTexts(gameTexts);
                  this.texts.forEach(text => text.checked=false);
                  pt = Array<IPlayerText>(this.texts.length);
                  for(let i: number = 0; i < pt.length; i++)
                  {
                    pt[i] = {
                      playerId: player.id,
                      textId: this.texts[i].id,
                      checked: this.texts[i].checked as boolean
                    };
                  }
                  console.log(pt);
                  this.mainService.addPlayerTexts(pt).subscribe(
                    data => {},
                    error => console.log("Error", error),
                    () => {localStorage.setItem('texts', JSON.stringify(this.texts))}
                  );
                });
            }
            else{
              let temp = [];
              for (let i = 0; i < pt.length; i++) {
                this.mainService.getText(pt[i].textId).subscribe(
                  data => temp.push({id: data.id, value: data.value, checked: pt[i].checked}),
                  error => console.log("Error", error),
                  () => {
                    if(i+1==pt.length)
                    {
                      console.log(i+1)
                      this.texts = temp;
                      localStorage.setItem('texts', JSON.stringify(this.texts));
                    }
                  }
                )
              }
            }
          }
        )
      }
    }
  }

  drawTexts(allTexts: IText[]): IText[] {
    let n: number = 9;
    if(allTexts.length<=n)
    {
      return allTexts;
    }
    let result = new Array(n),
      len = allTexts.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = allTexts[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  leaveGame(user: IPlayer) {
    let dialogRef = this.dialog.open(CloseDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mainService.deletePlayer(user.id).subscribe(
          data => {},
          error => console.log("Error", error),
          () => {localStorage.clear(), this.mainService.redirectToHome()}
        )
      }
      dialogRef = null;
    })
  }

  refreshPlayers() {
    //list of players
    const playerStr: string|null = localStorage.getItem('player');
    if(playerStr) {
      let player: IPlayer = JSON.parse(playerStr) as IPlayer;
      this.user = player;
      this.mainService.getPlayerList(player.gameId).subscribe(
        data => this.players = data as IPlayer[],
        error => console.log("Error", error),
        () => {
          this.mainService.getPlayer(player.id).subscribe(
            data => player = data as IPlayer,
            error => console.log(player),
            () => {
              this.user = player;
              localStorage.setItem('player', JSON.stringify(this.user))
            }
          )
        }
      );
    }
  }

}

