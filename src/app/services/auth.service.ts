import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://liga-de-voley.herokuapp.com
  authURL = environment.renderURL + 'users/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: IUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'new', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', loginUsuario);
  }
}
