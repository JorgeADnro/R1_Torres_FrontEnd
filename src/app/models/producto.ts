export class Producto {
    static filter(arg0: (Producto: { genero: string; }) => boolean) {
      throw new Error('Method not implemented.');
    }
    _id?: number;
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    edad: number;
    genero: string;
    correo: string;
    telefono: string;
    ciudad: string;
    cargo: string;
    fecha: Date;
    areaInt: string[];

    constructor(nombre: string, apPaterno: string, apMaterno: string, edad: number,genero: string,correo: string,
        telefono: string,ciudad: string,cargo: string,fecha: Date,areaInt:string[]){
        this.nombre = nombre;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.edad = edad;
        this.genero = genero;
        this.correo = correo;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.cargo = cargo;
        this.fecha=fecha;
        this.areaInt=areaInt;
    }
}