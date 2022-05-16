import { Component, OnInit } from '@angular/core';
import {IText} from "../../../../Models/IText";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  texts: Array<IText> = [
    {
      id: 1,
      text: "yes",
      checked: false
    },
    {
      id: 2,
      text: "pls",
      checked: false
    },
    {
      id: 3,
      text: "do",
      checked: false
    },
    {
      id: 4,
      text: "it",
      checked: false
    },
    {
      id: 5,
      text: "snitch",
      checked: false
    },
    {
      id: 6,
      text: "it",
      checked: false
    },
    {
      id: 7,
      text: "is",
      checked: false
    },
    {
      id: 8,
      text: "already",
      checked: false
    },
    {
      id: 9,
      text: "bitch",
      checked: false
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
