import { Component, OnInit } from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MainService} from "../../../../main.service";
import {IPlayer} from "../../../../Models/IPlayer";
import {IPlayerText} from "../../../../Models/IPlayerText";


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  texts: Array<IText> = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
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
            let pt = Array<IPlayerText>(this.texts.length);
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


}
