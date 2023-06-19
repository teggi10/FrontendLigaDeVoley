import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Jugador } from "../models/jugador";

@Injectable({
    providedIn: 'root'
})
export class JugadorService {

/*    URL = 'https://liga-de-voley.herokuapp.com/jugador/' */
URL = environment.renderURL + 'jugadores/';
    constructor(private http:HttpClient){
    }

    public getJugadores(): Observable<Jugador[]>{
      return this.http.get<Jugador[]>(this.URL + 'allJugadores');
    }

    public getJugadoresByTeam(idEquipo: number): Observable<Jugador[]>{
      return this.http.get<Jugador[]>(this.URL + 'jugadoresOfTeam/' + idEquipo);
    }

   public getJugador(id: number): Observable<Jugador>{
      return this.http.get<Jugador>(this.URL + id);
   }

    public guardarJugador(jugador: Jugador): Observable<any>{
     return this.http.post(this.URL + 'addJugador', jugador);
   }

   public actualizarJugador(id: number , jugador: Jugador): Observable<any>{
    return this.http.put(this.URL + id, jugador);
  }

  public borrarJugador(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + id);
 }
}