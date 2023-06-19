import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { Fecha } from 'src/app/models/fecha';
import { Jugador } from 'src/app/models/jugador';
import { IUser } from 'src/app/models/user.interface';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { EquipoService } from 'src/app/services/equipo.services';
import { FechasService } from 'src/app/services/fechas.service';
import { JugadorService } from 'src/app/services/jugador.services';
import { TokenService } from 'src/app/services/token.service';
import { DeleteComponent } from '../../modals/delete/delete.component';


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
  isAdminEquipo = false;
  isAdmin = false;
  equipo!: Equipo;
  tiempoTranscurrido = Date.now();
  fecha = new Date(this.tiempoTranscurrido);
  diaActual = this.fecha.getDate();
  mesActual = this.fecha.getMonth() + 1; 
  fechaValida = true;
  fechas : Fecha[] = [];
  fechaModificacionValida!: string;
  back!: string;
  currentUser!: IUser;
  loading = false;
  constructor(private fechasService: FechasService , private tokenService: TokenService,private router: Router,private toastr: ToastrService,
     private equipoService: EquipoService, private aRoute: ActivatedRoute, private jugadorService: JugadorService,
     private comunicacionService: ComunicacionService, public dialog: MatDialog) { 
  
  }

  ngOnInit(): void {
      
      this.idEquipo = this.aRoute.snapshot.params.id;
      this.back = this.aRoute.snapshot.queryParams['backTo'];
      this.equipoService.getEquipo(this.idEquipo).subscribe(equipo => {
        this.equipo = equipo;
      });
      this.jugadorService.getJugadoresByTeam(this.idEquipo).subscribe(jugadores => {
        this.jugadores = jugadores; 
      })
      this.comunicacionService.getCurrenUser().subscribe(user => {
        this.currentUser = user;
        this.equipoService.getEquiposByUser(user.id as number).subscribe(equipos => {
          if(equipos){
            console.log(equipos);
            equipos.forEach(equipo => {
              console.log(equipo,this.idEquipo);
              if(equipo.id == this.idEquipo){
                 this.isAdminEquipo = true;  //Comentar para deshabilitar
              }
            })
          }
          console.log(this.isAdminEquipo);
        }
        );
      })

    /*  this.obtenerJugadores(this.idEquipo);
    this.roles = this.tokenService.getAuthorities();
    this.obtenerEquipo(this.idEquipo); */
   /*  this.roles.forEach(rol => {
      if(rol == 'ROLE_ADMIN'){
       this.isAdmin = true;
}
   }) */
  // this.validarFecha();
  
    }


    public validarFecha(){
      let i: number = 0;
this.fechasService.getFechas().subscribe(data => {
  this.fechas = data; 
  while (i <= data.length && this.fechaValida) {
     if(data[i].mes == this.mesActual){
      if(this.diaActual > (data[i].diaValido) && this.diaActual < data[i].dia){
        this.fechaValida = false;
        this.fechaModificacionValida = data[i].diaValido + "/" + data[i].mesValido;
      }
      else if(this.diaActual > data[i].dia){
        if(this.diaActual < data[i+1].diaValido){
          this.fechaValida = true;
          this.fechaModificacionValida = data[i+1].diaValido + "/" + data[i+1].mesValido;
        }
      }
     }
      i++;
  }
}) 
}

/*     public obtenerEquipo(idEquipo:number){
      this.equipoService.getEquipo(idEquipo).subscribe(data => {
       this.equipo = data;
       if(data.nombreClave == this.authUserName){
        this.isAdminEquipo = true;
       }
      })
    }
   
    public obtenerJugadores(idEquipo:number){
      this.equipoService.getEquipo(idEquipo).subscribe(data => {
        const filteredPlayers = data.jugadores.filter(jugador => jugador.eliminado !== true);
        this.jugadores = filteredPlayers;
        console.log(data.jugadores);
        console.log(this.jugadores);
      }, error => {
        console.log(error);
      });   
        } */

        backTo(){
          if(this.back == 'perfil'){
            this.router.navigate(['/perfil']);
          }else{
            if(this.back){
              this.router.navigate(['/equipos/' + this.back]);
            }else{
              this.router.navigate(['/perfil']);
            }
           
          }
        }

    public eliminarJugador(id: number){
       /*  let result =  confirm('¿Seguro desea eliminar este jugador?');
        if (result != false){
        this.jugadores.forEach( jugador => {
          if(jugador.idJugador == id)
          this.jugadores.splice(this.jugadores.indexOf(jugador), 1)
        }) */
        this.jugadorService.getJugador(id).subscribe( jugador => {
          if(jugador){
            let dialogRef = this.dialog.open(DeleteComponent,{
              data:{
                nombre: jugador.nombre
              },
              maxWidth: '100%',
              width: '80%',
              height: '40%'
            })

            dialogRef.afterClosed().subscribe(data =>{
              if(data){
                this.jugadorService.borrarJugador(id).subscribe(res => {
                  if(res){
                    this.toastr.success('El jugador: '+ res.jugador.nombre +' fue eliminado con exito', 'Jugador eliminado');
                    this.jugadorService.getJugadoresByTeam(this.idEquipo).subscribe(jugadores => {
                      this.jugadores = jugadores; 
                    });
                  }else{
                    this.toastr.error(res.msg, 'Error');
                  }
                
                }, (error: any) =>{
                  this.toastr.error(error, 'Error');
                });
              }
            })
          }else{
            this.toastr.error('No existe ese jugador', 'Error');
          }
        })
       
    }
      public editarJugador(id: number){
        console.log(this.equipo.id);
        this.router.navigate(['/editar-jugador/' + id ],{queryParams: {idEquipo: this.idEquipo}});
      }
 
  }


  

