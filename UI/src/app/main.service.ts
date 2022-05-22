import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../environments/environment";
import {Observable} from "rxjs";
import {IGame} from "./Models/IGame";
import {IPlayer} from "./Models/IPlayer";
import {Router} from "@angular/router";
import {IText} from "./Models/IText";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly API = environment;

  constructor(private http: HttpClient, private router: Router) { }

  // game
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

  // player
  getPlayerList(): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(this.API.player);
  }

  getPlayer(id:string|number): Observable<IPlayer> {
    return this.http.get<IPlayer>(`${this.API.player}/${id}`);
  }

  addPlayer(data: IPlayer) {
    return this.http.post(this.API.player, data);
  }

  updatePlayer(id:number|string, data: IPlayer) {
    return this.http.put(`${this.API.player}/${id}`, data);
  }

  // Texts
  getTextList(): Observable<IText[]> {
    return this.http.get<IText[]>(this.API.text);
  }
  addTexts(texts: IText[]) {
    let textsAPI = [];
    for(let el of texts) {
      textsAPI.push({value: el['value']});
    }
    return this.http.post(this.API.text, textsAPI);
  }

}
