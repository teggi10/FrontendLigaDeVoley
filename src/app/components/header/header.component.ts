import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { EquipoService } from 'src/app/services/equipo.services';
import { TokenService } from 'src/app/services/token.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService: TokenService, private equipoService: EquipoService,
     private comunicacionService: ComunicacionService, private location: Location, private router:Router) { }

  ngOnInit() {
   this.comunicacionService.getCurrenUser().subscribe(user => {
    if(user.username){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
   })
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.comunicacionService.setCurrentUser({username: '', password: ''});
    this.isLogged = false;
    this.router.navigate(['/inicio']);
  
  }

  goToEquiposPerCategory(category:string){
     this.router.navigate(['/equipos/' + category]);
     this.comunicacionService.setCurrentCategory(category);
  }

  private getCurrentPath(): string | undefined {
    return this.location.path().split('?').shift();
  }

 /* obtenerEquipos(){
    this.equipoService.getEquipos().subscribe(data => {
      console.log(data)
    },error => {
      console.log(error);
    })
  }*/
  
}
