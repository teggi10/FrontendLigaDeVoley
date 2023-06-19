import { Equipo } from "./equipo";

export class Jugador {
    id: number;
    nombre:string;
    apellido:string;
    posicion?:string;
    fecha_nac: string;
    dni: number;
    numero?:number;
    equipoId: number;
    eliminado:boolean;

    constructor(id:number,nombre:string,apellido:string,posicion:string,numero:number,dni:number,fecha_nac:string,eliminado:boolean, equipoId : number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.posicion = posicion;
        this.numero = numero;
        this.equipoId = equipoId;
        this.id = id;
        this.dni = dni;
        this.fecha_nac = fecha_nac;
        this.eliminado = eliminado;
    }
}
