import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../main.service";
import {Router} from "@angular/router";
import {IGame} from "../Models/IGame";
import {IPlayer} from "../Models/IPlayer";
import * as moment from "moment";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {IText} from "../Models/IText";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDetails: FormGroup;
  player: any;
  emptyInput: string|null = null;
  allTexts: string[] = [];
  filteredTexts: string[];
  exactText: FormControl = new FormControl();

  constructor(private fb: FormBuilder, private mainService: MainService, private router: Router, public _snackBar: SnackBarComponent) {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required],
      texts: this.fb.array([]),
      playerName: ['', Validators.required]
    });

    for (let i = 0; i < 9; i++) {
      this.texts.push(this.createText());
    }

    this.mainService.getTextList().subscribe(
      data =>
      {
        data.forEach(item => {
          this.allTexts.push(item.value);
        })
      }
    );

  }

  ngOnInit(): void {
    // console.log(this.texts.controls);

    this.filteredTexts = this.allTexts;
    console.log(this.filteredTexts);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.allTexts.filter(text => this._normalizeValue(text).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    let copy = value.toString();
    return copy.toLowerCase().replace(/\s/g, '');
  }

  selectText(i: number) {
    const currVal = this.texts.at(i).value.value;
    console.log(currVal);
    if(currVal.length>0) {
      this.filteredTexts = this._filter(currVal);
      console.log(this.filteredTexts);
    }
    else{
      this.filteredTexts=this.allTexts;
    }
  }

  clearFilter() {
    this.filteredTexts = this.allTexts;
  }

  createText(): FormGroup {
    return this.fb.group({
      value: ['', RxwebValidators.unique()],
    });
  }

  addText() {
    let textsArray = <FormArray>this.gameDetails.controls['texts'];
    textsArray.push(this.createText());
  }

  removeText(i:number) {
    this.texts.removeAt(i);
  }

  getText(i:number) {
    return this.texts.at(i);
  }

  get texts(): FormArray {
    return this.gameDetails.get("texts") as FormArray;
  }

  onSubmit() {
    // console.log(this.gameDetails.value);
    let { gameId, playerName, texts } = this.gameDetails.value;
    // console.log("GameId: ", typeof gameId);
    // console.log("playerName: ", playerName);
    // console.log("texts: ", texts);
    let gameData, playerData, textData = null;
    playerName = playerName.trim();
    gameId = gameId.trim();
    if(playerName.length===0 || gameId.length===0)
    {
      this.emptyInput = "Every field has to contain at least one sign (space doesn't count)";
      return;
    }
    for(let text of texts)
    {
      console.log(text);
      text['value'] = text['value'].trim();
      if(text['value'].length===0)
      {
        this.emptyInput = "Every field has to contain at least one sign (space doesn't count)";
        return;
      }
    }
    this.emptyInput=null;
    // console.log(textsAPI);
    this.mainService.addGame({name: gameId}).subscribe(
      data => {
        //apparently following line is not needed.
        gameData = data;
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("Game POST is completed");
        this.mainService.addTexts(texts).subscribe(
          data => {
            textData = data;
          },
          error => {
            console.log("Error", error)
          },
          () => {
            this.mainService.assignText2game(gameData.id, textData).subscribe(
              data => {
                //anything
              },
              error => {
                console.log("Error", error)
              },
              () => {
                this.mainService.addPlayer({name: playerName, gameId: gameData.id, points: 0, position: 0}).subscribe(
                  data => playerData=data,
                  error => console.log("Error", error),
                  () => {
                    console.log(playerData);
                    localStorage.setItem('player', JSON.stringify(playerData));
                    localStorage.setItem('lastRequest', moment.now().toString());
                    this.mainService.redirectToGame(gameData['id'], gameData['name']);
                  }
                );
              }
            )
          }
        )
      });
  }
}
