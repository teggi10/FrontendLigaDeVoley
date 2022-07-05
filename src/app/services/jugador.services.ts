import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Jugador } from "../models/jugador";

@Injectable({
    providedIn: 'root'
})
export class JugadorService {

   URL = 'https://liga-de-voley.herokuapp.com/jugador/'
    constructor(private http:HttpClient){
    }

    public getJugadores(): Observable<Jugador[]>{
      return this.http.get<Jugador[]>(this.URL + 'lista');
    }

   public getJugador(id: number): Observable<Jugador>{
      return this.http.get<Jugador>(this.URL + 'detail/' + id);
   }

    public guardarJugador(jugador: Jugador): Observable<any>{
     return this.http.post(this.URL + 'create', jugador);
   }

   public actualizarJugador(id: number , jugador: Jugador): Observable<any>{
    return this.http.put(this.URL + 'update/' + id, jugador);
  }

  public borrarJugador(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + 'delete/' + id);
 }
}