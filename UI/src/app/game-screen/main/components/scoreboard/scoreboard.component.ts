import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlayer} from "../../../../Models/IPlayer";
import {MainService} from "../../../../main.service";
import {IKickPlayer} from "../../../../Models/IKickPlayer";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  @Input() players: IPlayer[];
  @Output() vote: EventEmitter<IPlayer> = new EventEmitter<IPlayer>();
  @Input() voted: boolean;
  columnsToDisplay = ['position', 'crown', 'name', 'points', 'kick'];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  voteKick(player: IPlayer) {
    this.vote.emit(player);
  }
}
