import { Jugador } from "./jugador";

export class Equipo {
    idEquipo?:number;
    nombre?:string;
    localidad?:string;
    sexo?:string;
    nombreClave: string;
    puntos:number;
    categoria:string;
    jugadores:Jugador[];


    constructor(nombre:string,localidad:string,sexo:string,puntos:number,nombreClave:string,categoria:string,jugadores:Jugador[]){
        this.nombre = nombre;
        this.jugadores = jugadores;
        this.localidad = localidad;
        this.sexo = sexo;
        this.puntos = puntos;
        this.categoria = categoria;
        this.nombreClave = nombreClave;
    }
}