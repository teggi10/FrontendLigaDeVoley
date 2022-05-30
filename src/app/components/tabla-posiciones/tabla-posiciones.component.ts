import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.services';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.component.html',
  styleUrls: ['./tabla-posiciones.component.css']
})
export class TablaPosicionesComponent implements OnInit {
  equiposTotal : Equipo[]= [];
  equiposFemenino : Equipo[]= [];
  equiposMasculino : Equipo[]= [];
  
  constructor(private equipoService:EquipoService) { }

  ngOnInit(): void {
    this.obtenerEquipos();
    this.obtenerEquiposMasculinos();
    this.obtenerEquiposFemeninos();
  }

  obtenerEquipos(){
    this.equipoService.getEquipos().subscribe(data => {
      console.log(data);
      this.equiposTotal= data;
    },error => {
      console.log(error);
    })
  }

  obtenerEquiposMasculinos(){
    this.equipoService.getEquipos().subscribe(data => {
     data.forEach((equipo: Equipo) => {
      if (equipo.sexo == "Masculino"){
        console.log(equipo);
        this.equiposMasculino.push(equipo) ;
      }
this.equiposMasculino.sort(function (a, b) {
  if (a.puntos == null) {
    return 1;
  }
  if (b.puntos == null) {
    return -1;
  }
  if (a.puntos > b.puntos) {
    return 1;
  }
  if (a.puntos < b.puntos) {
    return -1;
  }
  // a must be equal to b
  return 0;
})
      
     }); 
    },error => {
      console.log(error);
    })
  }

  obtenerEquiposFemeninos(){
    this.equipoService.getEquipos().subscribe(data => {
      data.forEach((equipo: Equipo) => {
        if (equipo.sexo == "Femenino"){
          console.log(equipo);
          this.equiposFemenino.push(equipo) ;
        }
       }); 
       this.equiposFemenino.sort(function (a, b) {
        if (a.puntos == null) {
          return 1;
        }
        if (b.puntos == null) {
          return -1;
        }
        if (a.puntos > b.puntos) {
          return 1;
        }
        if (a.puntos < b.puntos) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
      console.log(this.equiposFemenino)
    },error => {
      console.log(error);
    })
  }
}
