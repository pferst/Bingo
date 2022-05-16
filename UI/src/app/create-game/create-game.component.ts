import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDetails: FormGroup;

  constructor(private fb: FormBuilder) {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required],
      texts: this.fb.array([])
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
  }
}
