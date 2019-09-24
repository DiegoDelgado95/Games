import { Injectable } from '@angular/core';

//Modulo para pedir peticiones
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  //Variable que contiene la base de la api
  API_URI = 'http://localhost:3000/api'

  //Le paso la variable httpclient
  constructor(private http: HttpClient ) { }

  //funcion para obtener los juegos de la api
  getGames(){
    return this.http.get(`${this.API_URI}/games`);
  }

  getGame(id: string){
    return this.http.get(`${this.API_URI}/games/${id}`);
  }

  saveGame(game: Game){
    return this.http.post(`${this.API_URI}/games`, game);
  }

  deleteGame(id: string){
    return this.http.delete(`${this.API_URI}/games/${id}`);
  }

  //Retorna un Obersable tipo Game, le indico que le id es tipo string o number
  updateGame(id: string|number, updateGame: Game): Observable<Game> {
    return this.http.put(`${this.API_URI}/games/${id}`, updateGame);
  }
}
