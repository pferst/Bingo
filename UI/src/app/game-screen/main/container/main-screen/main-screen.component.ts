import { Component, OnInit } from '@angular/core';
import {IText} from "../../../../Models/IText";
import {MainService} from "../../../../main.service";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  texts: Array<IText> = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    // this.texts = this.mainService.
  }

}
