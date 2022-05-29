import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JoinGameComponent} from "./join-game/join-game.component";
import {CreateGameComponent} from "./create-game/create-game.component";
import {MainScreenComponent} from "./game-screen/main/container/main-screen/main-screen.component";
import {JoinCreateComponent} from "./join-create/join-create.component";
import {CanActivate} from "@angular/router";
import {GameAuthGuard} from "./GameAuthGuard";

const routes: Routes = [
  {
    path: 'join',
    component: JoinGameComponent,
    canActivate: [GameAuthGuard],
    canLoad: [GameAuthGuard],
  },
  {
    path: 'create',
    component: CreateGameComponent,
    canActivate: [GameAuthGuard],
    canLoad: [GameAuthGuard],
  },
  {
    path: ':name#:id',
    component: MainScreenComponent
  },
  {
    path: '',
    component: JoinCreateComponent,
    canActivate: [GameAuthGuard],
    canLoad: [GameAuthGuard],
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
