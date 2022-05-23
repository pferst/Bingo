import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../main.service";
import {Router} from "@angular/router";
import {IGame} from "../Models/IGame";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDetails: FormGroup;

  constructor(private fb: FormBuilder, private mainService: MainService, private router: Router) {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required],
      texts: this.fb.array([]),
      playerName: ['', Validators.required]
    });
    this.addText();
  }

  ngOnInit(): void {
    // console.log(this.texts.controls);
    this.mainService.getTextList().subscribe(
      data => console.log(data)
    );
  }

  createText(id: number): FormGroup {
    return this.fb.group({
      value: [''],
    });
  }

  addText() {
    for (let i = 0; i < 9; i++) {
      this.texts.push(this.createText(i));
    }
  }

  removeText(i:number) {
    this.texts.removeAt(i);
  }

  get texts(): FormArray {
    return this.gameDetails.get("texts") as FormArray;
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
            this.mainService.addPlayer({name: playerName, gameId: gameData.id, points: 0, position: 0}).subscribe(
              data => playerData=data,
              error => console.log("Error", error),
              () => {
                this.router.navigateByUrl(`${gameData['name']}.${gameData['id']}`);
              }
            );
          }
        )
      });
    // if(gameData && playerData && textData)
    // {
    //   this.router.navigateByUrl(`${gameData['name']}.${gameData['id']}`);
    // }
  }
}
