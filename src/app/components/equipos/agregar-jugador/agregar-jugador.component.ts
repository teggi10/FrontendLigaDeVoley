import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
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
    idEquipo : 0,
    nombre : '',
    localidad : '',
    sexo: '',
    puntos: 0,
    jugadores : [],
    nombreClave: ''
  };


  constructor( private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute, private equipoService : EquipoService, private jugadorService : JugadorService) { 
    this.jugadorForm = this.fb.group({
      idJugador: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numero: ['', Validators.required],
      posicion: ['', Validators.required],
      equipo: [{}],
      dni: ['', Validators.required],
      fechaNac: ['', Validators.required]
    })
    

 
  }
  
  ngOnInit(): void {
    /*this.aRoute.queryParams.pipe(filter(params => params.id)).subscribe(params => {
      this.id = params.id;
    })*/
    
    this.id = this.aRoute.snapshot.params.id;

    console.log(this.id);
    this.equipoService.getEquipo(this.id).subscribe((data: Equipo) =>{
      this.equipo.nombre = data.nombre;
      this.equipo.localidad = data.localidad;
      this.equipo.sexo = data.sexo;
      this.equipo.puntos = data.puntos;
      this.equipo.jugadores = data.jugadores;
      this.equipo.idEquipo = data.idEquipo;
      console.log(this.equipo);
    })
    console.log(this.equipo);
  }
 
  agregarJugador(this: any){
    const JUGADOR: Jugador ={
      idJugador: 0,
      nombre : this.jugadorForm.get('nombre')?.value,
      apellido : this.jugadorForm.get('apellido')?.value,
      numero : this.jugadorForm.get('numero')?.value,
      posicion : this.jugadorForm.get('posicion')?.value,
      equipo: this.equipo,
      dni: this.jugadorForm.get('dni')?.value,
      fechaNac: this.jugadorForm.get('fechaNac')?.value
    }
   
    console.log(JUGADOR);
    
    this.jugadorService.guardarJugador(JUGADOR).subscribe(() => {
      this.toastr.success('El jugador  fue cargado con exito', 'Jugador cargado');
     
    },
    (error: any) =>{
      console.log(error);
      
    });

    this.equipo.jugadores.push(JUGADOR);
    console.log(this.equipo);

    this.equipoService.actualizarEquipo(this.id, this.equipo).subscribe(() => {
      this.toastr.success('El equipo  fue actualizado con exito', 'Equipo actualizado');
      this.router.navigate(['jugadores/'],{queryParams: {id: this.jugador.idEquipo}})
    }, (error: any) =>{
      console.log(error);
      this.jugadorForm.reset();
      
    }
    )
  }
}
   


