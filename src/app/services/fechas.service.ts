import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fecha } from '../models/fecha';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor(private http: HttpClient) { }

  getFechas(): Observable<Fecha[]>{
    return this.http.get<Fecha[]>('./assets/fechas.json');
  }
}
