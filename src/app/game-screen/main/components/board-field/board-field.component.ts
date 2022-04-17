import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-field',
  templateUrl: './board-field.component.html',
  styleUrls: ['./board-field.component.css']
})
export class BoardFieldComponent implements OnInit {
  @Input() data: string;
  disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  choose(): void {
    this.disabled = !this.disabled;
  }
}
