import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  texts: Array<string> = ["yes", "pls", "do", "it", "snitch", "it", "is", "already", "bitch"];

  constructor() { }

  ngOnInit(): void {
  }

}
