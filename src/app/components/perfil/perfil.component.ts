import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { IUser } from 'src/app/models/user.interface';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { EquipoService } from 'src/app/services/equipo.services';
import { DeleteComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  currentUser! : IUser;
  equiposOfUser: Equipo[] = [];
  constructor(private comuncacionService: ComunicacionService, private equiposService: EquipoService,
    public dialog: MatDialog, private toastr: ToastrService,private router:Router){}

  ngOnInit(): void {
    this.comuncacionService.getCurrenUser().subscribe(user => {
      this.currentUser = user;
      this.equiposService.getEquiposByUser(user.id as number).subscribe(equipos => {
        this.equiposOfUser = equipos;
      })
    })
  }

  verJugadores(idEquipo: number | undefined): void {
    this.router.navigate(['/jugadores/' + idEquipo],{queryParams: {backTo: 'perfil'}})
  }

  openDeleteModal(nombre: string,idEquipo :number | undefined){
    let dialogRef = this.dialog.open(DeleteComponent,{
      data:{
        nombre: nombre
      },
      maxWidth: '100%',
      width: '80%',
      height: '40%'
    })

    dialogRef.afterClosed().subscribe(data =>{
      if(data){
        this.equiposService.borrarEquipo(idEquipo as number).subscribe(res => {
          if(res){
            this.toastr.success('El equipo se elimino con exito', 'Equipo eliminado');
            this.equiposService.getEquiposByUser(this.currentUser.id as number).subscribe(equipos => {
              this.equiposOfUser = equipos;
            })
          }else{
            this.toastr.error(res.msg, 'Error');
          }
         
        })
      }
    })
  }

}
