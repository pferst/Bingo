import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  gameDetails: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required]
    });
  }

  getErrorMessage(){
    return "Server not exists";
  }

}
