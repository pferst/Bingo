import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../main.service";
import * as moment from "moment";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  gameDetails: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, public mainService: MainService) { }

  ngOnInit(): void {
    this.gameDetails = this.fb.group({
      gameId: ['', Validators.required],
      playerName: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.gameDetails.value);
    let { gameId, playerName } = this.gameDetails.value;
    // console.log("GameId: ", typeof gameId);
    // console.log("playerName: ", playerName);
    // console.log("texts: ", texts);
    let gameData, playerData, textData = null;
    playerName = playerName.trim();
    gameId = gameId.trim();
    if(playerName.length===0 || gameId.length===0)
    {
      this.error = "Every field has to contain at least one sign (space doesn't count)";
      return;
    }
    this.error=null;

    if(gameId.includes('#')){
      if (!/^[a-zA-Z0-9]+#[a-zA-Z0-9]+$/.test(gameId)){
        this.error = "Enter valid GAME name: name#id or id";
        return;
      }
      const gameDetails = gameId.split('#');
      gameId = gameDetails[1];
    }
    let answer = null;
    this.mainService.getGame(gameId).subscribe(
      data => {
        answer = data;
      },
      error => {
        this.error = "Game doesn't exists";
        console.log("Error", error);
      },
      () => {
        if(answer==null){
          this.error = "Game doesn't exists";
        }
        else{
          let playerCheck = null;
          this.mainService.checkPlayer(gameId, playerName).subscribe(
            data => playerCheck = data,
            error => console.log("Error", error),
            () => {
              if(playerCheck.length===0){
                let playerData;
                this.error = null;
                this.mainService.addPlayer({name: playerName, gameId: gameId, points: 0, position: 0}).subscribe(
                  data => playerData=data,
                  error => console.log("Error", error),
                  () => {
                    // console.log(playerData);
                    localStorage.setItem('player', JSON.stringify(playerData));
                    localStorage.setItem('lastRequest', moment.now().toString());
                    this.mainService.redirectToGame(gameId, answer.name);
                  }
                );
              }
              else {
                this.error = "Username already used";
              }
            }
          )
        }
      }
    );
  }

}
