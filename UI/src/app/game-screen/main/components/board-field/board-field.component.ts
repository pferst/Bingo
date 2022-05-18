import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {IText} from "../../../../Models/IText";

@Component({
  selector: 'app-board-field',
  templateUrl: './board-field.component.html',
  styleUrls: ['./board-field.component.css']
})
export class BoardFieldComponent implements OnInit {
  @Input() data: IText;
  checked: boolean = false;
  @ViewChild('field') field: any;
  @Output() mark: EventEmitter<{to_check: boolean, answer: IText}>= new EventEmitter<{to_check: null, answer: null}>();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  choose(): void {
    this.checked = !this.checked;
    this.mark.emit({to_check: this.checked, answer: this.data});
    if(this.checked) {
      this.renderer.setStyle(this.field.nativeElement, 'backgroundColor', 'rgb(221, 158, 205)');
    }
    else{
      this.renderer.setStyle(this.field.nativeElement, 'backgroundColor', 'rgb(243 244 246)');
    }
  }
  revoke($event: any): void {
    $event.preventDefault();
  }
}
