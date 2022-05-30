import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from "../../../../Models/IPlayer";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  @Input() players: IPlayer[];
  columnsToDisplay = ['position', 'crown', 'name', 'points'];

  constructor() { }

  ngOnInit(): void {
  }

}
