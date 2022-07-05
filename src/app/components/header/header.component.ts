import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/services/equipo.services';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService: TokenService, private equipoService: EquipoService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    console.log(this.isLogged);
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

 /* obtenerEquipos(){
    this.equipoService.getEquipos().subscribe(data => {
      console.log(data)
    },error => {
      console.log(error);
    })
  }*/
}
