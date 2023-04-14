import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { Producto } from 'src/app/models/producto';
import { EventoService } from 'src/app/services/evento.service';
import { GeneroService } from 'src/app/services/genero.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  listUsuarios: Producto[] = [];
  listUsuarios2: Producto[] = [];
  listEventos: Evento[] = [];
  
  constructor(private _productoService: ProductoService,
        private toastr: ToastrService,
        private _eventoService: EventoService,
        private _generoService: GeneroService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerEventos();
    const generoM = 'Masculino'; // Aquí puedes establecer el valor del género a buscar
    const generoF = 'Femenino'; // Aquí puedes establecer el valor del género a buscar
    this.obtenerGenero(generoM);
    this.obtenerGeneroF(generoF);
  }


  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }

  obtenerEventos() {
    this._eventoService.getEventos().subscribe(data => {
      console.log(data);
      this.listEventos = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerGenero(genero: string): void {
    console.log('Género a buscar:', genero);
    this._generoService.getGenero(genero).subscribe(data => {
      console.log('Usuarios encontrados:', data);
      this.listUsuarios = data;
    }, error => {
      console.log('Error al obtener usuarios:', error);
    }) 
  }

  obtenerGeneroF(genero: string): void {
    console.log('Género a buscar:', genero);
    this._generoService.getGeneroF(genero).subscribe(data => {
      console.log('Usuarios encontrados:', data);
      this.listUsuarios2 = data;
    }, error => {
      console.log('Error al obtener usuarios:', error);
    }) 
  }

}