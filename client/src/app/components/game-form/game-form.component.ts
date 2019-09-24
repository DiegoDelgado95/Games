import { Component, OnInit, HostBinding } from '@angular/core';
//Importo el modelo de objeto
import { Game } from 'src/app/models/game';
//Import el servicio
import { GamesService } from '../../services/games.service'
//Import para recibir los parametros por url y navegar atravez por angular
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  //El componente esta dentro de un row
  @HostBinding('class') classes = "row";

  game: Game ={
    id:0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  //Variable de control para saber si edito o creo
  edit:boolean = false;

  //Debo pasarle al constructor el servicio y los router
  constructor(private gameService: GamesService, private route:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    //Funcion de inicio, valido que los parametros para editar esten, con edit controlo si el form edita o crea un juego
    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.gameService.getGame(params.id).subscribe(
        res => {
          console.log(res)
          //En caso de editar, le paso los valores al objeto game y se muestren en form por doble enlace
          this.game = res[0];
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewGame(){
    //Elimino estos datos del objeto, no los requiero
    delete this.game.created_at;
    delete this.game.id;

    //El suscribe me devuele la respuesta y el error
    this.gameService.saveGame(this.game).subscribe(
      res => {
        console.log(res)
        //Me permite mandar el objeto game a una ruta
        this.route.navigate(['/games']);
      },
      err => console.error(err)
    )
  }

  //No hace falta pasarle ningun parametro por el doble enlace de datos con game
  updateGame(){
    delete this.game.created_at;
    this.gameService.updateGame(this.game.id,this.game).subscribe(
      res => {
        console.log(res)
        //Lo redirecciono
        this.route.navigate(['/games']);
      },
      err => console.error(err)
    );
  }

}
