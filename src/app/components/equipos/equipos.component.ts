import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.services';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  titulo = "Listado de equipos";
  equiposTotal : Equipo[]= [];
  equiposFemenino : Equipo[]= [];
  equiposMasculino : Equipo[]= [];
  equipo!: Equipo;
  id :string = '';
  constructor(private equipoService:EquipoService,private router:Router) { 

  }

  ngOnInit(): void {
this.obtenerEquipos()

  }

  verJugadores(): void {
    
   this.router.navigate(['equipos/jugadores'],{queryParams: {id: this.id}})
  }

  obtenerEquipos(){
    this.equipoService.getEquipos().subscribe(data => { 
      this.equiposTotal= data;
    },error => {
      console.log(error);
    })
  }

  obtenerEquiposMasculinos(){
    this.equipoService.getEquipos().subscribe(data => {
     data.forEach((equipo: Equipo) => {
      if (equipo.sexo == "M"){
        console.log(equipo);
        this.equiposMasculino.push(equipo) ;
      }

      
     }); 
    },error => {
      console.log(error);
    })
  }

  obtenerEquiposFemeninos(){
    this.equipoService.getEquipos().subscribe(data => {
      data.forEach((equipo: Equipo) => {
        if (equipo.sexo == "F")
        console.log(equipo);
        this.equiposFemenino.push(equipo) ;
       }); 
    },error => {
      console.log(error);
    })
  }

  /*obtenerEquipo(){
    this.equipoService.getEquipo().subscribe(data => {
      console.log(data);
      this.equipo= data;
    },error => {
      console.log(error);
    })*/
  }


