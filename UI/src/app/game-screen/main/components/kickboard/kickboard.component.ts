import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlayer} from "../../../../Models/IPlayer";
import {IKickPlayer} from "../../../../Models/IKickPlayer";

@Component({
  selector: 'app-kickboard',
  templateUrl: './kickboard.component.html',
  styleUrls: ['./kickboard.component.css']
})
export class KickboardComponent implements OnInit {

  @Input() players: IKickPlayer[];
  columnsToDisplay = ['name', 'count', 'f1'];
  @Input() voted: any;
  @Input() all: number;
  @Input() f1: number;
  @Output() kick: EventEmitter<IKickPlayer> = new EventEmitter<IKickPlayer>();

  constructor() { }

  ngOnInit(): void {
  }
  vote(player){
    this.kick.emit(player);
  }
}
