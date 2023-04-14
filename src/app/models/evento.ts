export class Evento {
    _id?: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    cupo: Number;

    constructor(nombre: string,descripcion:string,fecha:Date,cupo:Number){
        this.nombre = nombre;
        this.descripcion=descripcion;
        this.fecha=fecha;
        this.cupo=cupo;
    }
}