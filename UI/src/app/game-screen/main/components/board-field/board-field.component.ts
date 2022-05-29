import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable, takeUntil} from "rxjs";

@Component({
  selector: 'app-board-field',
  templateUrl: './board-field.component.html',
  styleUrls: ['./board-field.component.css']
})
export class BoardFieldComponent implements OnInit, AfterViewInit {
  @Input() data: IText;
  checked: boolean = false;
  @ViewChild('field') field: any;
  @Output() mark: EventEmitter<{to_check: boolean, answer: IText}>= new EventEmitter<{to_check: null, answer: null}>();


  constructor(private renderer: Renderer2, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if(this.data.checked)
    {
      this.choose();
    }
  }

  choose(): void {
    this.checked = !this.checked;
    console.log(this.checked);
    if(!this.checked)
    {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: this.data.value,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) this.sendRequest();
        else {console.log("Nie"); this.choose();}
      })
      console.log("out");
    }
    else
    {
      this.renderer.setStyle(this.field.nativeElement, 'backgroundColor', 'rgb(221, 158, 205)');
      this.mark.emit({to_check: this.checked, answer: this.data});
    }
  }

  sendRequest() {
    this.renderer.setStyle(this.field.nativeElement, 'backgroundColor', 'rgb(243 244 246)');
    this.mark.emit({to_check: this.checked, answer: this.data});
  }

  revoke($event: any): void {
    $event.preventDefault();
  }
}

@Component({
  selector: 'dialog-confirm-uncheck',
  templateUrl: 'dialog-confirm-uncheck.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
