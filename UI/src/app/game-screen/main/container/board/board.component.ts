import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {IText} from "../../../../Models/IText";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() texts: Array<IText>;
  @Output() click: EventEmitter<IText> = new EventEmitter<IText>();
  toMark: {to_check: boolean, answer: IText};

  constructor() { }

  ngOnInit(): void {
  }
  mark($event): void {
    this.toMark = $event;
    console.log(this.toMark);
  }
}
