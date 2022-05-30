import {Component, OnDestroy, OnInit} from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MainService} from "../../../../main.service";
import {IPlayer} from "../../../../Models/IPlayer";
import {IPlayerText} from "../../../../Models/IPlayerText";
import {MatDialog} from "@angular/material/dialog";
import {CloseDialogComponent} from "../../components/close-dialog/close-dialog.component";
import { Subscription } from "rxjs";
import { interval } from 'rxjs';
import {IKickPlayer} from "../../../../Models/IKickPlayer";
import * as moment from "moment";
import {SnackBarComponent} from "../../../../snack-bar/snack-bar.component";
import {KickoutDialogComponent} from "../../components/kickout-dialog/kickout-dialog.component";
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";



@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {
  texts: Array<IText> = [];
  players: Array<IPlayer> = [];
  kickPlayers: Array<IKickPlayer> = [];
  user: IPlayer = null;
  sub: Subscription;
  nonConnection: number = 0;
  voted: {playerId: number, time: string};
  //sth for store already voted
  kicks: Array<any> = [];
  private limit: number = 18;

  winner: IPlayer = this.players.length>0 ? this.players[0].points==9 ? this.players[0] : null : null;

  constructor(private mainService: MainService, public dialog: MatDialog, private _snackBar: SnackBarComponent) {
    this.sub = interval(5000)
      .subscribe((val) => {
        this.refreshPlayers();
      });
  }

  clearStorage() {
    localStorage.removeItem('player');
    localStorage.removeItem('texts');
    localStorage.removeItem('lastRequest');
    localStorage.removeItem('voted');
    localStorage.removeItem('kicks');
    if(this.user)
      this.mainService.deletePlayer(this.user.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.refreshPlayers();
    const vot = localStorage.getItem('voted');
    if(vot){
      this.voted = JSON.parse(vot);
    }
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
        this.clearStorage();
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
                    localStorage.removeItem('');
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
    let player = user;
    let dialogRef = this.dialog.open(CloseDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let last = this.players.length;
        this.mainService.deletePlayer(user.id).subscribe(
          data => {},
          error => console.log("Error", error),
          () => {
            this.clearStorage();
            if(last<=1)
            {
              this.mainService.deleteGame(player.gameId).subscribe(
                data => {},
                error => console.log("Error", error),
                () => {
                    this.mainService.redirectToHome();
                }
              )
            }
            else this.mainService.redirectToHome();
          });
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
        data => {
          this.players = data as IPlayer[];
          //sort array to be sure it's sorted
          this.players.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
          this.winner = this.players[0].points==9 ? this.players[0] : null;
        },
        error => {
          this.nonConnection++;
          console.log("Error", error);
          if(error.status === 404 || this.nonConnection>=this.limit) {
            // this.nonConnection=0;
            this.clearStorage();
            // this.ngOnDestroy();
            this.mainService.redirectToHome();
          }
        },
        () => {
          this.mainService.getPlayer(player.id).subscribe(
            data => player = data as IPlayer,
            error => {
              this.nonConnection++;
              if(error.status === 404 || this.nonConnection>=this.limit) {
                // this.nonConnection=0;
                this.dialog.open(KickoutDialogComponent);
                this.clearStorage();
                // this.ngOnDestroy();
                this.mainService.redirectToHome();
              }
            },
            () => {
              this.user = player;
              localStorage.setItem('player', JSON.stringify(this.user));
              this.mainService.getKickPlayers(this.user.gameId).subscribe(
                data => {
                  this.kickPlayers=data;
                  const votedStr = localStorage.getItem('kicks');
                  if(votedStr)
                  {
                    const vv = JSON.parse(votedStr);
                    vv.forEach(item => {
                      const index = this.getKickPlayer(item.playerId);
                      if(index>=0)
                      {
                        this.kickPlayers[index].voted=true;
                      }
                    });
                  }
                },
                error => console.log("Error", error),
                () => {
                  // load players names into kick players
                  this.kickPlayers.forEach(x => {
                    for(let i = 0; i < this.players.length; i++)
                    {
                      if(x.playerId==this.players[i].id)
                      {
                        x.playerName=this.players[i].name;
                      }
                    }
                  });
                  // timed on vote after 2 minutes
                  // delete from localstorage
                  // delete from database
                  const f1 = localStorage.getItem('voted');
                  if(f1) {
                    const voted = JSON.parse(f1);
                    const time: number = +voted.time;
                    let duration = moment.duration(moment().diff(time));
                    const mins = duration.asMinutes();
                    if (mins > 2) {
                      this.mainService.deleteKickPLayer(voted.playerId).subscribe(
                        data => {
                          console.log(data);
                        },
                        error => {
                          console.log("Error", error);
                          this.voted = null;
                          localStorage.removeItem('voted');
                        },
                        () => {
                          this.voted = null;
                          localStorage.removeItem('voted');
                          this._snackBar.openSnackBar("Voting timed out");
                        }
                      );
                    }
                  }

                }
              )
            }
          )
        }
      );
    }
  }

  private getPlayer(playerId: number){
    for (let i = 0; i < this.players.length; i++)
    {
      if(this.players[i].id==playerId)
      {
        return i;
      }
    }
    return -1;
  }
  private getKickPlayer(playerId: number) {
    for (let i = 0; i < this.kickPlayers.length; i++)
    {
      if(this.kickPlayers[i].playerId==playerId)
      {
        return i;
      }
    }
    return -1;
  }

  voteKick(player: IPlayer) {
    let temp = null;
    this.mainService.addKickPlayer(player.id, player.gameId).subscribe(
      data => temp = data,
      error => console.log("Error", error),
      () => {
        if(temp!=null)
        {
          console.log("VOTED!");
          this.voted = {playerId: player.id, time: moment.now().toString()};
          const strKicks = localStorage.getItem('kicks');
          let kk = this.kicks;
          if(strKicks)
          {
            kk = JSON.parse(strKicks);
          }
          kk.push(this.voted);
          this.kicks = kk;
          localStorage.setItem('kicks', JSON.stringify(this.kicks));
          localStorage.setItem('voted', JSON.stringify(this.voted));
          this.refreshPlayers();
        }
      }
    )
  }

  kick(player: IKickPlayer) {
    this.mainService.udpateKickPlayer(player, true).subscribe(
      data => {},
      error => console.log("Error", error),
      () => {
        const str = localStorage.getItem('kicks');
        let data = [];
        if(str)
        {
          data = JSON.parse(str);
        }
        data.push(player);
        this.kicks=data;
        localStorage.setItem('kicks', JSON.stringify(data));
        if((player.f1+1)/this.players.length > 0.5)
        {
          this.kickPlayer(player.playerId);
        }
      }
    )
  }

  kickPlayer(playerId: number) {
    const str = localStorage.getItem('kicks');
    let data = [];
    if(str)
    {
      data = JSON.parse(str);
    }
    for(let i = 0; i < data.length; i++)
    {
      if(data[i].playerId==playerId)
      {
        data = data.splice(i,  1);
        break;
      }
    }
    this.voted=null;
    this.kicks = data;
    localStorage.setItem('kicks', JSON.stringify(data));
    this.mainService.deletePlayer(playerId).subscribe(
      data => {},
      error => console.log("Error", error),
      () => this.refreshPlayers()
    )
  }

}
