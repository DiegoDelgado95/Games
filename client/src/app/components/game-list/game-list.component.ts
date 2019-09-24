import { Component, OnInit, HostBinding } from '@angular/core';

//Importo el servicio
import { GamesService } from '../../services/games.service';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})


export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  //vector tipo Game
  games:any=[];

  //Le paso al constructor
  constructor(private gamesServices: GamesService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(){
    //El subscribe me devuele 2 valores, respuesta y error
    this.gamesServices.getGames().subscribe(
      res => {
        this.games = res
      },
      err => console.error(err)
    )
  }

  deleteGame(id:string){
    this.gamesServices.deleteGame(id).subscribe(
      res => {
        console.log(res)
        this.getGames();
      },
      err => console.error(err)
    )
  }

}
