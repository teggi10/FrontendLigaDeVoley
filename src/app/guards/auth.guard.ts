import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ComunicacionService } from '../services/comunicacion.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  realRol!: string;
  
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private comunicacionService: ComunicacionService,
    private toastr: ToastrService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.comunicacionService.getCurrenUser().subscribe((user)=> {
      if (!this.tokenService.getToken() || user.username == '') {
        this.toastr.error("Debe iniciar sesion para acceder a esta seccion", 'Error');
        this.router.navigate(['/inicio']);
        return false;
      }else{
        return true;
      }
    })
   
    return true;
  }
  
}
