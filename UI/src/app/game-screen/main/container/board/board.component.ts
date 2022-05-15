import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {IAnswer} from "../../../../Models/IAnswer";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() texts: Array<IAnswer>;
  @Output() click: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();
  toMark: {to_check: boolean, answer: IAnswer};

  constructor() { }

  ngOnInit(): void {
  }
  mark($event): void {
    this.toMark = $event;
    console.log(this.toMark);
  }
}
