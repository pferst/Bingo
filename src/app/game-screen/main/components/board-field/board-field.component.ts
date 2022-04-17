import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-board-field',
  templateUrl: './board-field.component.html',
  styleUrls: ['./board-field.component.css']
})
export class BoardFieldComponent implements OnInit {
  @Input() data: string;
  checked: boolean = false;
  @ViewChild('field') field: any;
  @Output() mark: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  choose(): void {
    this.checked = !this.checked;
    this.mark.emit(this.checked);
    if(this.checked) {
      this.renderer.setStyle(this.field.nativeElement, 'backgroundColor', 'rgb(185, 28, 28)');
    }
    else{
      this.renderer.setStyle(this.field.nativeElement, 'backgroundColor', 'rgb(243 244 246)');
    }
  }
  revoke($event: any): void {
    $event.preventDefault();
  }
}
