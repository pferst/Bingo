import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-join-create',
  templateUrl: './join-create.component.html',
  styleUrls: ['./join-create.component.css']
})
export class JoinCreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  goToJoin() {
    this.router.navigate(['/join']);
  }

}
