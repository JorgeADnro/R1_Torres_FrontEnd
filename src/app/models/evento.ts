import { Producto } from "./producto";

export class Evento {
    _id?: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    cupo: number;

    constructor(nombre: string,descripcion:string,fecha:Date,cupo:number){
        this.nombre = nombre;
        this.descripcion=descripcion;
        this.fecha=fecha;
        this.cupo=cupo;
    }

    actualizarCupo(cantidad: number) {
        this.cupo -= cantidad;
    }
    
}