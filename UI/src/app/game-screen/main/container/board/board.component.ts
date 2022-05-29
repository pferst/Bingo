import {Component, Input, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MainService} from "../../../../main.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() texts: Array<IText>;
  @Output() click: EventEmitter<IText> = new EventEmitter<IText>();
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  toMark: {to_check: boolean, answer: IText};

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }
  mark($event): void {
    this.toMark = $event;
    const playerText = localStorage.getItem('player');
    const player = JSON.parse(playerText);
    this.mainService.updatePlayerText(player.id, this.toMark.answer.id, this.toMark.to_check).subscribe(
      data => {},
      error => console.log("Error", error),
      () => {
        this.refresh.emit(true);
        const str = localStorage.getItem('texts');
        if(str)
        {
          let texts = JSON.parse(str);
          texts.find(x => x.id == this.toMark.answer.id).checked = this.toMark.to_check;
          localStorage.setItem('texts', JSON.stringify(texts));
        }
      }
    )
    // console.log(this.toMark);
  }

}
