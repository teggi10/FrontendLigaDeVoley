import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { Fecha } from 'src/app/models/fecha';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.services';
import { FechasService } from 'src/app/services/fechas.service';
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
  i : number = 0;
  roles!: string[];
  authUserName = sessionStorage.getItem('AuthUserName');
  isAdminEquipo = false;
  isAdmin = false;
  equipo!: Equipo;
  tiempoTranscurrido = Date.now();
  fecha = new Date(this.tiempoTranscurrido);
  diaActual = this.fecha.getDate();
  mesActual = this.fecha.getMonth() + 1; 
  fechaValida = true;
  fechas : Fecha[] = [];
  ultimaModificacion!:Date;
  constructor(private fechasService: FechasService , private tokenService: TokenService,private router: Router,private toastr: ToastrService, private equipoService: EquipoService, private aRoute: ActivatedRoute, private jugadorService: JugadorService) { 
  
  }

  ngOnInit(): void {
      this.idEquipo = this.aRoute.snapshot.params.id;
     this.obtenerJugadores(this.idEquipo);
    this.roles = this.tokenService.getAuthorities();
    this.obtenerEquipo(this.idEquipo);
    this.roles.forEach(rol => {
      if(rol == 'ROLE_ADMIN'){
       this.isAdmin = true;
}
    })
   this.validarFecha();
    }


    public validarFecha(){
      let i: number = 0;
this.fechasService.getFechas().subscribe(data => {
  this.fechas = data; 
  while (i <= data.length && this.fechaValida) {
     if(data[i].mes == this.mesActual){
      if(this.diaActual > (data[i].dia - 7)){
        this.fechaValida = false;
      }else if(this.diaActual > data[i].dia){
        this.fechaValida = true;
      }else{
        this.fechaValida = true;
      }
     }
      i++;
  }
}) 
}

    public obtenerEquipo(idEquipo:number){
      this.equipoService.getEquipo(idEquipo).subscribe(data => {
       this.equipo = data;
       if(data.nombreClave == this.authUserName){
        this.isAdminEquipo = true;
       }
      })
    }
   
    public obtenerJugadores(idEquipo:number){
      this.equipoService.getEquipo(idEquipo).subscribe(data => {
       this.jugadores = data.jugadores;
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
        this.router.navigate(['/editar-jugador'],{queryParams: {id: id}});
      }
 
  }


  

