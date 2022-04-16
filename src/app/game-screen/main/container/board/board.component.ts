import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {IAnswer} from "../../../../Models/IAnswer";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() texts: Array<string>;
  @Output() click: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  constructor() { }

  ngOnInit(): void {
  }

  mark($event?: IAnswer) {
    console.log($event);
  }

}
