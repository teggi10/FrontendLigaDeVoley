import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user : FormGroup;
  
  constructor( private fb:FormBuilder, private authService: AuthService,
    private toastr: ToastrService){
    this.user = this.fb.group({
      id:[],
      username:['', [Validators.required]],
      password:['', [Validators.required]]  
})
  }

  onRegister(){
    const username = this.user.value.username;
    const password = this.user.value.password;
    const newUser = {username: username, password:password};

    this.authService.nuevo(newUser).subscribe( res => {
      this.toastr.success('Registro exitoso', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }),
    (      err: { error: { msg: string | undefined; }; }) => {
      this.toastr.error( err.error.msg, 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
       console.log(err.error.msg);
    }
  }
}
