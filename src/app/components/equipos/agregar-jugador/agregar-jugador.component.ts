import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.services';
import { JugadorService } from 'src/app/services/jugador.services';




@Component({
  selector: 'app-agregar-jugador',
  templateUrl: './agregar-jugador.component.html',
  styleUrls: ['./agregar-jugador.component.css']
})
export class AgregarJugadorComponent implements OnInit {

  jugadorForm: FormGroup;
  id!:number;
  equipo: Equipo = {
    id: 0,
    nombre: '',
    localidad: '',
    sexo: '',
    puntos: 0,
    categoria: '',
    userId: 0
  };
  jugadores! : Jugador[];
  jugadoresEquipo! : Jugador[];


  constructor( private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute, private equipoService : EquipoService, private jugadorService : JugadorService) { 
    this.jugadorForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numero: [null],
      posicion: [""],
      equipo: [],
      dni: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      eliminado:[false]
    })
    

 
  }
  
  ngOnInit(): void {

     this.id = this.aRoute.snapshot.params.id;
     /*
    this.equipoService.getEquipo(this.id).subscribe((data: Equipo) =>{
      this.equipo.nombre = data.nombre;
      this.equipo.localidad = data.localidad;
      this.equipo.sexo = data.sexo;
      this.equipo.puntos = data.puntos;
      this.equipo.jugadores = data.jugadores;
      this.equipo.categoria = data.categoria;
      this.equipo.idEquipo = data.idEquipo;
      this.jugadoresEquipo =this.equipo.jugadores.filter((jugador) => jugador.eliminado !== true);
    })
    this.jugadorService.getJugadores().subscribe(data => {
      this.jugadores = data;
    }) */
  }
  volver(){
    this.router.navigate(['/jugadores/' + this.id],{queryParams: {backTo: 'perfil'}})
  }
 
  agregarJugador(this: any){
    const JUGADOR: Jugador ={
      id: 0,
      nombre : this.jugadorForm.get('nombre')?.value,
      apellido : this.jugadorForm.get('apellido')?.value,
      numero : this.jugadorForm.get('numero')?.value,
      posicion : this.jugadorForm.get('posicion')?.value,
      equipoId: this.id,
      dni: this.jugadorForm.get('dni')?.value,
      fecha_nac: this.jugadorForm.get('fecha_nac')?.value,
      eliminado: this.jugadorForm.get('eliminado').value
    }

    this.jugadorService.guardarJugador(JUGADOR).subscribe((res: any) => {
      if(res.jugador){
        this.toastr.success('El jugador  fue cargado con exito', 'Jugador cargado');
        this.router.navigate(['/jugadores/',this.id])
      }else{
        if(res.msg){
          this.toastr.error(res.msg, 'Error');
        }else{
          this.toastr.error(res, 'Error');
        }
        
      }
    }),
    (error: any) =>{
      console.log(error)
      this.toastr.error(error, 'ERROR');
      
    };
//console.log(this.jugadores.includes(this.jugadores.find((jugador: Jugador) => (jugador.dni == JUGADOR.dni))));
//console.log(this.equipo.jugadores.includes(this.equipo.jugadores.find((jugador: Jugador) => (jugador.dni == JUGADOR.dni))));
   /*  if(this.jugadoresEquipo.length < 18){
      if(this.jugadores.includes(this.jugadores.find((jugador: Jugador) => (jugador.dni == JUGADOR.dni))) == true){
        if(this.equipo.jugadores.includes(this.equipo.jugadores.find((jugador: Jugador) => (jugador.dni == JUGADOR.dni))) == true){
          this.jugadorService.actualizarJugador(this.equipo.jugadores.find((jugador: Jugador) =>(jugador.dni == JUGADOR.dni)).idJugador,JUGADOR).subscribe(() => {
            this.toastr.success('El jugador  fue cargado con exito', 'Jugador cargado');
            this.router.navigate(['/jugadores/',this.id])
          },
          (error: any) =>{
            this.toastr.error(error, 'ERROR');
            
          });
        }else{
          this.toastr.error('Este jugador fue anotado en otro equipo', 'ERROR');
        }
      }else{
        this.jugadorService.guardarJugador(JUGADOR).subscribe(() => {
          this.toastr.success('El jugador  fue cargado con exito', 'Jugador cargado');
          this.router.navigate(['/jugadores/',this.id])
        },
        (error: any) =>{
          console.log(error)
          this.toastr.error(error, 'ERROR');
          
        });
      }
    }else{
      this.toastr.error('La cantidad maxima de jugadores por equipo es 18', 'Cantidad maxima alcanzada');
    } */

  }
}
   


