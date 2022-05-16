import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDetails: FormGroup;
  // texts: FormArray;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required],
      texts: this.fb.array([])
    });
    this.addText();
  }

  createText(id: number): FormGroup {
    return this.fb.group({
      id: id,
      text: '',
    });
  }

  addText() {
    for (let i = 0; i < 9; i++) {
      this.Texts().push(this.createText(i));
    }
  }

  removeText(i:number) {
    this.Texts().removeAt(i);
  }

  Texts(): FormArray {
    return this.gameDetails.get("texts") as FormArray;
  }

  getErrorMessage(){
    return "Server not exists";
  }

  onSubmit() {

  }
}
