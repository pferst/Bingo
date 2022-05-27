import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SnackBarComponent implements OnInit {


  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  openSnackBar(info: string) {
    this._snackBar.open(info, "OK", {
      horizontalPosition: 'left',
      duration: 5000,
    });
  }

}
