import { NgModule, isDevMode } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { RegistroComponent } from './components/auth/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AgregarEquipoComponent } from './components/agregar-equipo/agregar-equipo.component';
import { EditarEquipoComponent } from './components/editar-equipo/editar-equipo.component';
import { EquipoInterceptorService } from './interceptors/equipo-interceptor.service';
import { DeleteComponent } from './components/modals/delete/delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
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
    RegistroComponent,
    PerfilComponent,
    AgregarEquipoComponent,
    EditarEquipoComponent,
    DeleteComponent,
    
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
    MatToolbarModule,
    MatDialogModule,
    MatTreeModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: EquipoInterceptorService, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
