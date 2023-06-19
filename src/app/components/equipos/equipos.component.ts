import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
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
  category!: string;
  reload = false;
  loading = false;
  constructor(private equipoService:EquipoService,private router:Router, private aRoute: ActivatedRoute,
    private comunicacionService: ComunicacionService) { 

  }

  ngOnInit(): void {
    this.category = this.aRoute.snapshot.params.categoria;
    this.comunicacionService.getCurrentCategory().subscribe(category => {
        
        this.category = category;
        this.obtenerEquipos();
    })
  }

  verJugadores(idEquipo: number | undefined): void {
    this.router.navigate(['/jugadores/' + idEquipo] ,{queryParams: {backTo: this.category}} )
  }

  obtenerEquipos(){
    this.loading = true;
    this.equipoService.getEquiposByCategory(this.category).subscribe(data => { 
      this.equiposTotal= data;
      this.loading = false;
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
  }


