import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../environments/environment";
import {Observable} from "rxjs";
import {IGame} from "./Models/IGame";
import {IPlayer} from "./Models/IPlayer";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly API = environment;
  // readonly games = '/games'; players = 'players';

  constructor(private http: HttpClient) { }

  getGameList(): Observable<IGame[]> {
    return this.http.get<IGame[]>(this.API.game);
  }
  getGame(id:string|number): Observable<IGame> {
    return this.http.get<IGame>(`${this.API.game}/${id}`);
  }

  addGame(data: IGame) {
    return this.http.post(this.API.game, data);
  }

  deleteGame(id:number|string){
    return this.http.delete(`${this.API.game}/${id}`);
  }

  getPlayerList(): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(this.API.player);
  }

  getPlayer(id:string|number): Observable<IPlayer> {
    return this.http.get<IPlayer>(`${this.API.player}/${id}`);
  }

  updatePlayer(id:number|string, data: IPlayer) {
    return this.http.put(`${this.API.player}/${id}`, data);
  }

}
