import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../main.service";
import {Router} from "@angular/router";

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
    console.log(this.texts.controls);
  }

  createText(id: number): FormGroup {
    return this.fb.group({
      id: [''],
      text: [''],
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
    console.log(this.gameDetails.value);
    const { gameId, playerName, texts } = this.gameDetails.value;
    this.mainService.addGame({name: gameId}).subscribe(
      data => {
        //apparently following line is not needed.
        this.mainService.addPlayer({name: playerName, gameId: gameId});
        this.router.navigateByUrl(`${data}`);
      },
      error => {
        console.log("Error", error);
      },
      () => {
        console.log("POST is completed");
      });
  }
}
