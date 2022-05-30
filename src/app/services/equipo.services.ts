import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Equipo } from "../models/equipo";

@Injectable({
    providedIn: 'root'
})
export class EquipoService {

   URL = 'http://localhost:8080/equipo/'
    constructor(private http:HttpClient){
    }

    public getEquipos(): Observable<Equipo[]>{
      return this.http.get<Equipo[]>(this.URL + 'lista');
    }

   public getEquipo(id: number): Observable<Equipo>{
      return this.http.get<Equipo>(this.URL + 'detail/' + id);
   }

    public guardarEquipo(equipo: Equipo): Observable<any>{
     return this.http.post(this.URL + 'create', equipo);
   }

   public actualizarEquipo(id: number , equipo: Equipo): Observable<any>{
    return this.http.put(this.URL + 'update/' + id, equipo);
  }

  public borrarEquipo(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + 'detail/' + id);
 }
}