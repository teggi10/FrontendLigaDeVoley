import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarJugadorComponent } from './components/equipos/agregar-jugador/agregar-jugador.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { JugadoresComponent } from './components/equipos/jugadores/jugadores.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TablaPosicionesComponent } from './components/tabla-posiciones/tabla-posiciones.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EditarJugadorComponent } from './components/equipos/editar-jugador/editar-jugador.component';
import { BeachVoleyComponent } from './components/beach-voley/beach-voley.component';
import { LigaInternaComponent } from './components/liga-interna/liga-interna.component';
import { EquipoGuardService } from './guards/equipo-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'liga-interna', component: LigaInternaComponent},
  {path: 'beach-voley', component: BeachVoleyComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'jugadores/:id', component: JugadoresComponent},   
  {path: 'agregar-jugador/:id', component: AgregarJugadorComponent, canActivate : [EquipoGuardService], data: {expectedRol:['admin']}}, 
  {path: 'editar-jugador/:id', component: EditarJugadorComponent, canActivate : [EquipoGuardService], data: {expectedRol:['admin']}},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
