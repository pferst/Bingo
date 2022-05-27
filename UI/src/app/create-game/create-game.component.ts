import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../main.service";
import {Router} from "@angular/router";
import {IGame} from "../Models/IGame";
import {IPlayer} from "../Models/IPlayer";
import * as moment from "moment";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDetails: FormGroup;
  player: any;

  constructor(private fb: FormBuilder, private mainService: MainService, private router: Router, public _snackBar: SnackBarComponent) {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required],
      texts: this.fb.array([]),
      playerName: ['', Validators.required]
    });

    for (let i = 0; i < 9; i++) {
      this.texts.push(this.createText(i));
    }

  }

  ngOnInit(): void {
    // console.log(this.texts.controls);

    this.mainService.getTextList().subscribe(
      data => console.log(data)
    );
  }

  createText(id: number): FormGroup {
    return this.fb.group({
      value: ['', RxwebValidators.unique()],
    });
  }

  addText(i: number) {
    let textsArray = <FormArray>this.gameDetails.controls['texts'];
    textsArray.push(this.createText(i));
  }

  removeText(i:number) {
    this.texts.removeAt(i);
  }

  get texts(): FormArray {
    return this.gameDetails.get("texts") as FormArray;
  }

  redirectToGame(gameId: number, gameName: string){
    this.router.navigateByUrl(`${gameName}#${gameId}`);
  }

  onSubmit() {
    // console.log(this.gameDetails.value);
    const { gameId, playerName, texts } = this.gameDetails.value;
    let gameData, playerData, textData = null;

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
                    this.redirectToGame(gameData['id'], gameData['name']);
                  }
                );
              }
            )
          }
        )
      });
  }
}
