import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importo el componente lista y formulario
import { GameListComponent } from './components/game-list/game-list.component'
import { GameFormComponent } from './components/game-form/game-form.component'

//Cada route se maneja como objeto
const routes: Routes = [
  {
    //Cuando visiten el route inicial, lo redirecciona a /games
    path:'',
    redirectTo:'/games',
    //Le tengo que agregar esto
    pathMatch: 'full' 
  },
  //renderiza un componente
  {
    path:'games',
    component: GameListComponent
  },
  {
    path: 'games/add',
    component: GameFormComponent
  },
  {
    path: 'games/edit/:id',
    component: GameFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
