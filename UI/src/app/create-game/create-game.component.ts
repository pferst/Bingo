import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  gameDetails: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required]
    });
  }

  getErrorMessage(){
    return "Server not exists";
  }
}
