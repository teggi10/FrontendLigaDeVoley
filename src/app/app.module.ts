import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TablaPosicionesComponent } from './components/tabla-posiciones/tabla-posiciones.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { HttpClientModule} from '@angular/common/http';
import { JugadoresComponent } from './components/equipos/jugadores/jugadores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AgregarJugadorComponent } from './components/equipos/agregar-jugador/agregar-jugador.component';


import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/auth/login/login.component';
import { EditarJugadorComponent } from './components/equipos/editar-jugador/editar-jugador.component';
import { BeachVoleyComponent } from './components/beach-voley/beach-voley.component';
import { LigaInternaComponent } from './components/liga-interna/liga-interna.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    InicioComponent,
    TablaPosicionesComponent,
    EquiposComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FixtureComponent,
    JugadoresComponent,
    AgregarJugadorComponent,
    LoginComponent,
    EditarJugadorComponent,
    BeachVoleyComponent,
    LigaInternaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatIconModule,
    MatToolbarModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
