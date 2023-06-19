import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.services';
import { JugadorService } from 'src/app/services/jugador.services';

@Component({
  selector: 'app-editar-jugador',
  templateUrl: './editar-jugador.component.html',
  styleUrls: ['./editar-jugador.component.css']
})
export class EditarJugadorComponent implements OnInit {
idJugador! :number;
jugador!: Jugador;
jugadorForm: FormGroup;
idEquipo!: number;
  constructor(private equipoService: EquipoService ,private router : Router,private aRoute: ActivatedRoute,
     private jugadorService: JugadorService,private fb: FormBuilder,private toastr: ToastrService) {
    this.jugadorForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numero: [''],
      posicion: [''],
      equipoId:[0],
      dni:['', Validators.required],
      fecha_nac:['', Validators.required],
      eliminado:[false]
    })
   }

  ngOnInit(): void {
    this.idEquipo = this.aRoute.snapshot.queryParams['idEquipo'];
    this.idJugador = this.aRoute.snapshot.params.id;
    this.obtenerJugador(this.idJugador);
  }

  public obtenerJugador(idJugador:number){
    this.jugadorService.getJugador(idJugador).subscribe(data => {
     this.jugador = data;
     this.rellenarCampos(data);
    }, error => {
      console.log(error);
    });
      }
     
      public rellenarCampos(jugador: Jugador){
        this.jugadorForm = this.fb.group({
          id: [jugador.id],
          nombre: [jugador.nombre, Validators.required],
          apellido: [jugador.apellido, Validators.required],
          numero: [jugador.numero],
          posicion: [jugador.posicion],
          equipoId:[jugador.equipoId],
          dni: [jugador.dni, Validators.required],
          fecha_nac: [jugador.fecha_nac, Validators.required],
          eliminado: [jugador.eliminado]
        })
        this.jugadorForm.setValue(
          {
          id: jugador.id,
          nombre: jugador.nombre,
          apellido: jugador.apellido,
          numero: jugador.numero,
          posicion: jugador.posicion,
          equipoId: jugador.equipoId,
          dni: jugador.dni,
          fecha_nac: jugador.fecha_nac,
          eliminado: jugador.eliminado
         })
      }


    volver(){
      this.router.navigate(['/jugadores/' + this.idEquipo],{queryParams: {backTo: 'perfil'}})
    }
    
  actualizarJugador(this: any){
    const JUGADOR: Jugador ={
      id: this.jugador.id,
      nombre : this.jugadorForm.get('nombre')?.value,
      apellido : this.jugadorForm.get('apellido')?.value,
      numero : this.jugadorForm.get('numero')?.value,
      posicion : this.jugadorForm.get('posicion')?.value,
      equipoId: this.jugador.equipoId,
      dni: this.jugadorForm.get('dni')?.value,
      fecha_nac: this.jugadorForm.get('fecha_nac')?.value,
      eliminado: this.jugador.eliminado
    }
   
    this.jugadorService.actualizarJugador(this.idJugador,JUGADOR).subscribe(() => {
      this.toastr.success('El jugador  fue actualizado con exito', 'Jugador actualizado',{ "positionClass" : "toast-top-center"});
      this.router.navigate(['/jugadores/',this.idEquipo])
    }, (error: any) =>{
      console.log(error);
      this.jugadorForm.reset();
      
    }
    );}

}
