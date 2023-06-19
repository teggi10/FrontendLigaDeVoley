import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtDto } from 'src/app/models/jwt-dto';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario | undefined;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj: string | undefined;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private comunicacionService: ComunicacionService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
   
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
        console.log(data);
        this.isLogged = true;
        this.tokenService.setToken(data.token);
     /*    this.tokenService.setAuthorities(data.authorities); */
        this.roles = data.authorities;
        this.comunicacionService.setCurrentUser(data.user);
        this.toastr.success('Bienvenido ' + data.user.username, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
       /*  this.refresh(); */
        this.router.navigate(['/perfil']);
      },
      (      err: { error: { msg: string | undefined; }; }) => {
        this.isLogged = false;
        this.errMsj = err.error.msg;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
         console.log(err.error.msg);
      }
    );
   
  }

  refresh(): void {
    window.location.reload();
}
}
