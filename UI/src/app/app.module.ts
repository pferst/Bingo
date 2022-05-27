import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './game-screen/main/container/main-screen/main-screen.component';
import { BoardComponent } from './game-screen/main/container/board/board.component';
import { BoardFieldComponent } from './game-screen/main/components/board-field/board-field.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { JoinGameComponent } from './join-game/join-game.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { MainService } from "./main.service";
import { JoinCreateComponent } from './join-create/join-create.component';
import { MatTableModule } from '@angular/material/table';
import { GameAuthGuard } from "./GameAuthGuard";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    BoardComponent,
    BoardFieldComponent,
    CreateGameComponent,
    JoinGameComponent,
    JoinCreateComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [MainService, GameAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
