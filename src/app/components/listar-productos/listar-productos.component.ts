import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Evento } from 'src/app/models/evento';
import { Producto } from 'src/app/models/producto';
import { EventoService } from 'src/app/services/evento.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  listProductosH: Producto[] = [];
  listProductosM: Producto[] = [];
  listEventos: Evento[] = [];
  areasInt: string[] = [];
  filtroArea: string = '';
  filtroGenero: string = '';
  filtroFecha: string = '';
  areaIntSeleccionada: string = '';
  generoSeleccionado: string = '';
  eventoSeleccionado: string = '';
  fechaRegistro: Date= new Date;

  constructor(private _productoService: ProductoService,
        private toastr: ToastrService,
        private _eventoService: EventoService
        ) {

         }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerEventos();
    this.obtenerProductosH();
    this.obtenerProductosM();
   
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerProductosH() {
    this._productoService.getProductosH().subscribe(data => {
      console.log(data);
      this.listProductosH = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerProductosM() {
    this._productoService.getProductosM().subscribe(data => {
      console.log(data);
      this.listProductosM = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')){
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }
  }

  obtenerEventos() {
    this._eventoService.getEventos().subscribe(data => {
      console.log(data);
      this.listEventos = data;
    }, error => {
      console.log(error);
    })
  }
  
    aplicarFiltro(): void {
      if (this.filtroArea !== '') {
        this._productoService.getProductosByArea(this.filtroArea).pipe(
          map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
        ).subscribe((productos: Producto[]) => {
          this.listProductos = productos;
        });
      } else {
        this.obtenerProductos();
      }
    }


  aplicarFiltroAG(): void {
    if (this.filtroArea !== '' && this.filtroGenero !== '') {
      this._productoService.getProductosByAreaYGenero(this.filtroArea,this.filtroGenero).pipe(
        map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      ).subscribe((productos: Producto[]) => {
        this.listProductos = productos;
      });
    } else if (this.filtroArea !== '') {
      this._productoService.getProductosByArea(this.filtroArea).pipe(
        map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      ).subscribe((productos: Producto[]) => {
        this.listProductos = productos;
      });
    } else if (this.filtroGenero !== '') {
      this._productoService.getProductosByGenero(this.filtroGenero).pipe(
        map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      ).subscribe((productos: Producto[]) => {
        this.listProductos = productos;
      });
    } else {
      this.obtenerProductos();
    }
  }

  aplicarFiltroAF(): void {
    if (this.filtroArea !== '' && this.filtroFecha !== '') {
      this._productoService.getProductosByAreaYFecha(this.filtroArea, this.filtroFecha).pipe(
        map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      ).subscribe(productos => {
        this.listProductos = productos;
      });
    } else if (this.filtroArea !== '') {
      this._productoService.getProductosByArea(this.filtroArea).pipe(
        map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      ).subscribe(productos => {
        this.listProductos = productos;
      });
    } else if (this.filtroFecha !== '') {
      this._productoService.getProductosByFecha(this.filtroFecha).pipe(
        map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      ).subscribe(productos => {
        this.listProductos = productos;
      });
    } else {
      this.obtenerProductos();
    }
  }

  aplicarFiltroFecha(): void {
    if (this.filtroFecha !== '') {
      this._productoService.getProductosByFecha(this.filtroFecha).subscribe((productos: Producto[]) => {
        this.listProductos = productos;
      });
    } else {
      this.obtenerProductos();
    }
  }
  

}