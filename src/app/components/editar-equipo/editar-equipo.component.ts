import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { IUser } from 'src/app/models/user.interface';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { EquipoService } from 'src/app/services/equipo.services';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent {

  equipoForm: FormGroup;
  id!:number;
  currentUser!: IUser;

  constructor( private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute,
     private equipoService : EquipoService, private comunicacionService: ComunicacionService) { 
    this.equipoForm = this.fb.group({
      nombre: ['', Validators.required],
      localidad: ['', Validators.required],
      sexo: [''],
      categoria: ['']
    })
    

 
  }
  
  ngOnInit(): void {
    this.comunicacionService.getCurrenUser().subscribe(user =>{
      this.currentUser = user;
    })
   this.id = this.aRoute.snapshot.params.id;
   this.equipoService.getEquipo(this.id).subscribe(equipo =>{
    this.equipoForm.setValue(
      {nombre: equipo.nombre,
      localidad: equipo.localidad,
      sexo: equipo.sexo,
      categoria: equipo.categoria
     }
      );
      this.rellenarCampos(equipo);
      this.equipoForm.value.nombre = equipo.nombre;
      this.equipoForm.value.localidad = equipo.localidad; 
      this.equipoForm.value.sexo = equipo.sexo;
      this.equipoForm.value.categoria = equipo.categoria;
   })
   
  }

  private rellenarCampos(equipo: Equipo){
    this.equipoForm = this.fb.group({
      nombre: [equipo.nombre, Validators.required],
      localidad: [equipo.localidad, Validators.required],
      sexo: [equipo.sexo],
      categoria: [equipo.categoria]
    })
  }
 
  editarEquipo(this: any){
    const nombre = this.equipoForm.value.nombre;
    const localidad = this.equipoForm.value.localidad;
    const sexo = this.equipoForm.value.sexo;
    const categoria = this.equipoForm.value.categoria;

    const newEquipo :  Equipo = new Equipo(this.id,nombre, localidad, sexo, 0 ,categoria, this.currentUser.id)

    this.equipoService.actualizarEquipo(this.id,newEquipo).subscribe((res: any) => {
      this.toastr.success('El equipo fue actualizado con exito', 'Equipo actualizado');
      this.router.navigate(['/perfil']);
    }),
    (error: any) =>{
      this.toastr.error(error, 'ERROR');
      };
  }
}
