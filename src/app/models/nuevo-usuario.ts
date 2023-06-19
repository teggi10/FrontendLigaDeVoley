export class NuevoUsuario {
    nombre!: string;
    nombreUsuario!: string;
    email!: string;
    password!: string;
    authorities!: string[];

    constructor(nombreUsuario : string, password:string){
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
