import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.services';
import { JugadorService } from 'src/app/services/jugador.services';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  jugadores: Jugador[]=[];
  idEquipo! : number;
  roles!: string[];
  isAdmin = false;
  equipo!: Equipo;
  constructor(private tokenService: TokenService,private router: Router,private toastr: ToastrService, private equipoService: EquipoService, private aRoute: ActivatedRoute, private jugadorService: JugadorService) { 
  }

  ngOnInit(): void {
      this.idEquipo = this.aRoute.snapshot.params.id;
     this.obtenerJugadores(this.idEquipo);
    this.roles = this.tokenService.getAuthorities();
    this.obtenerEquipo(this.idEquipo);
    this.roles.forEach(rol => {
      if(rol == 'ROL_ADMIN' && this.equipo.nombreClave == this.tokenService.getUserName()){
       this.isAdmin = true;
}
    })
    }
    public obtenerEquipo(idEquipo:number){
      this.equipoService.getEquipo(idEquipo).subscribe(data => {
        console.log(data);
       this.equipo = data;
      })
    }
   
  
    public obtenerJugadores(idEquipo:number){
      this.equipoService.getEquipo(idEquipo).subscribe(data => {
       this.jugadores = data.jugadores;
       console.log(this.jugadores);
      }, error => {
        console.log(error);
      });
      
        }

    public eliminarJugador(id: number){
     alert('¿Seguro desea eliminar este jugador?');
     this.jugadores.forEach( jugador => {
      if(jugador.idJugador == id)
      this.jugadores.splice(this.jugadores.indexOf(jugador), 1)
    })
     this.jugadorService.borrarJugador(id).subscribe(() => {
      this.toastr.success('El jugador  fue eliminado con exito', 'Jugador eliminado');
      //this.router.navigate(['jugadores'],{queryParams: {id: this.idEquipo}});
    }, (error: any) =>{
      console.log(error);
    });

    
  /*
     console.log(this.jugadores);

   this.equipoService.getEquipo(this.idEquipo).subscribe(data => {
    equipo = data;
    equipo.jugadores = this.jugadores;
    console.log(equipo);
    this.equipoService.actualizarEquipo(this.idEquipo,equipo).subscribe(() => {
      this.toastr.success('El jugador  fue eliminado con exito', 'Jugador eliminado');
      this.router.navigate(['/jugadores/{{this.id}}']);
    }, (error: any) =>{
      console.log(error);
    });
    
  })*/
  
   
      }
      public editarJugador(id: number){
        console.log(id);
        this.router.navigate(['/editar-jugador'],{queryParams: {id: id}});
      }
 
  }


  

