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
      text: "yes"
    },
    {
      id: 2,
      text: "pls"
    },
    {
      id: 3,
      text: "do"
    },
    {
      id: 4,
      text: "it"
    },
    {
      id: 5,
      text: "snitch"
    },
    {
      id: 6,
      text: "it"
    },
    {
      id: 7,
      text: "is"
    },
    {
      id: 8,
      text: "already"
    },
    {
      id: 9,
      text: "bitch"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
