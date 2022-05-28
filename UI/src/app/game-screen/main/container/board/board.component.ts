import {Component, Input, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

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
