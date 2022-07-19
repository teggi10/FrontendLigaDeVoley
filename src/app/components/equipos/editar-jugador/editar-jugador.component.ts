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
      idJugador: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numero: [''],
      posicion: [''],
      equipo:[{}],
      dni:['', Validators.required],
      fechaNac:['', Validators.required]
    })
   }

  ngOnInit(): void {
   /* this.aRoute.params.subscribe(params => {
      this.idJugador = params['id']; 
    })*/
    this.idEquipo = this.aRoute.snapshot.params.idEquipo;
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
          idJugador: [jugador.idJugador],
          nombre: [jugador.nombre, Validators.required],
          apellido: [jugador.apellido, Validators.required],
          numero: [jugador.numero],
          posicion: [jugador.posicion],
          equipo:[jugador.equipo],
          dni: [jugador.dni, Validators.required],
          fechaNac: [jugador.fechaNac, Validators.required]
        })
      }


  actualizarJugador(this: any){
    const JUGADOR: Jugador ={
      idJugador: this.jugador.idJugador,
      nombre : this.jugadorForm.get('nombre')?.value,
      apellido : this.jugadorForm.get('apellido')?.value,
      numero : this.jugadorForm.get('numero')?.value,
      posicion : this.jugadorForm.get('posicion')?.value,
      equipo: this.jugador.equipo,
      dni: this.jugadorForm.get('dni')?.value,
      fechaNac: this.jugadorForm.get('fechaNac')?.value
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
