import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { GameListComponent } from './components/game-list/game-list.component';

//Importo el service que cree
import { GamesService } from './services/games.service';
//Importo el modulo http
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameFormComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Agrego el http
    HttpClientModule,
    //Agrego form para el doble enlacamiento
    FormsModule
  ],
  providers: [
    //Agrego el servicio
    GamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
