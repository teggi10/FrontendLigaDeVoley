import { Jugador } from "./jugador";

export class Equipo {
    id?:number;
    nombre:string;
    localidad:string;
    sexo:string;
    puntos:number;
    categoria:string;
    userId:number;


    constructor(id:number,nombre:string,localidad:string,sexo:string,puntos:number,categoria:string,userId:number){
        this.id = id;
        this.nombre = nombre;
        this.localidad = localidad;
        this.sexo = sexo;
        this.puntos = puntos;
        this.categoria = categoria;
        this.userId = userId;
        
    }
}