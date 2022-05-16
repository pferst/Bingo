import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JoinGameComponent} from "./join-game/join-game.component";
import {CreateGameComponent} from "./create-game/create-game.component";
import {MainScreenComponent} from "./game-screen/main/container/main-screen/main-screen.component";

const routes: Routes = [
  {
    path: 'join',
    component: JoinGameComponent
  },
  {
    path: 'create',
    component: CreateGameComponent
  },
  {
    path: ':id',
    component: MainScreenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
