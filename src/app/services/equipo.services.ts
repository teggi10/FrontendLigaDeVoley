import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Equipo } from "../models/equipo";

@Injectable({
    providedIn: 'root'
})
export class EquipoService {

  /*  URL = 'https://liga-de-voley.herokuapp.com/equipo/' */
  URL = environment.renderURL + 'equipos/';
    constructor(private http:HttpClient){
    }

    public getEquipos(): Observable<Equipo[]>{
      return this.http.get<Equipo[]>(this.URL + 'allEquipos');
    }

    public getEquiposByUser(id: number): Observable<Equipo[]>{
      return this.http.get<Equipo[]>(this.URL + 'equiposOfUser/' + id);
    }

    public getEquiposByCategory(category: string): Observable<Equipo[]>{
      return this.http.get<Equipo[]>(this.URL + 'equiposOfCategory/' + category);
    }

   public getEquipo(id: number): Observable<Equipo>{
      return this.http.get<Equipo>(this.URL + id);
   }

    public guardarEquipo(equipo: Equipo): Observable<any>{
     return this.http.post(this.URL + 'addEquipo', equipo);
   }

   public actualizarEquipo(id: number , equipo: Equipo): Observable<any>{
    return this.http.put(this.URL + id, equipo);
  }

  public borrarEquipo(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + id);
 }
}