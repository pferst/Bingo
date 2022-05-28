import { Component, OnInit } from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MainService} from "../../../../main.service";
import {IPlayer} from "../../../../Models/IPlayer";


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  texts: Array<IText> = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    //TODO
    //get player.texts from localstroage
    //if player.texts == null -> getGameTexts; draw texts for player; post playerTexts;
    //else load them from local storage
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
            this.texts.forEach(text => text.checked=false)
            localStorage.setItem('texts', JSON.stringify(this.texts));
          });
      }
    }
    // this.texts = this.mainService.
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
