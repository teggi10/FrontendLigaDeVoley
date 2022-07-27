import { Equipo } from "./equipo";

export class Jugador {

    idJugador: number;
    nombre:string;
    apellido:string;
    posicion:string;
    fechaNac: string;
    dni: number;
    numero:number;
    equipo: Equipo;
    eliminado:boolean;

    constructor(idJugador:number,nombre:string,apellido:string,posicion:string,numero:number,dni:number,fechaNac:string,eliminado:boolean, equipo : Equipo){
        this.nombre = nombre;
        this.apellido = apellido;
        this.posicion = posicion;
        this.numero = numero;
        this.equipo = equipo;
        this.idJugador = idJugador;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.eliminado = eliminado;
    }
}
