import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipo } from 'src/app/models/equipo';
import { IUser } from 'src/app/models/user.interface';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { EquipoService } from 'src/app/services/equipo.services';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.css']
})
export class AgregarEquipoComponent {

  equipoForm: FormGroup;
  id!:number;
  currentUser!: IUser;

  constructor( private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute, private equipoService : EquipoService, private comunicacionService: ComunicacionService) { 
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
  }
 
  agregarEquipo(this: any){
    const nombre = this.equipoForm.value.nombre;
    const localidad = this.equipoForm.value.localidad;
    const sexo = this.equipoForm.value.sexo;
    const categoria = this.equipoForm.value.categoria;

    const newEquipo :  Equipo = new Equipo(0,nombre, localidad, sexo, 0 ,categoria, this.currentUser.id)

    this.equipoService.guardarEquipo(newEquipo).subscribe((res: any) => {
      this.toastr.success('El equipo fue cargado con exito', 'Equipo inscripto');
      this.router.navigate(['/perfil']);
    }),
    (error: any) =>{
      this.toastr.error(error, 'ERROR');
      };
  }
}
