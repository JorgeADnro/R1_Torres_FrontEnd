import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { Producto } from 'src/app/models/producto';
import { Cargo } from 'src/app/models/cargo';
import { EventoService } from 'src/app/services/evento.service';
import { ProductoService } from 'src/app/services/producto.service';
import { CargoService } from 'src/app/services/cargo.service';
import { Ciudad } from 'src/app/models/ciudad';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  listProductos: Producto[] = [];
  listEventos: Evento[] = [];
  listCargos: Cargo[] = [];
  listCiudades: Ciudad[] = [];
  productoForm: FormGroup;
  titulo = 'Agregar datos';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute,
              private _eventoService: EventoService,
              private _cargoService: CargoService,
              private _ciudadService: CiudadService) { 
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      ciudad: ['', Validators.required],
      cargo: ['', Validators.required],
      areaInt: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerCargos();
    this.obtenerCiudades();
  }

  agregarProducto() {
    

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      apPaterno: this.productoForm.get('apPaterno')?.value,
      apMaterno: this.productoForm.get('apMaterno')?.value,
      edad: this.productoForm.get('edad')?.value,
      genero: this.productoForm.get('genero')?.value,
      correo: this.productoForm.get('correo')?.value,
      telefono: this.productoForm.get('telefono')?.value,
      ciudad: this.productoForm.get('ciudad')?.value,
      cargo: this.productoForm.get('cargo')?.value,
      fechaCreacion: this.productoForm.get('fechaCreacion')?.value,
      areaInt: this.productoForm.get('areaInt')?.value,
    }
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El participante fue registrado con exito!', 'Participante Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    })

  
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
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

  obtenerCargos() {
    this._cargoService.getCargos().subscribe(data => {
      console.log(data);
      this.listCargos = data;
    }, error => {
      console.log(error);
    })
  }

  obtenerCiudades() {
    this._ciudadService.getCiudades().subscribe(data => {
      console.log(data);
      this.listCiudades = data;
    }, error => {
      console.log(error);
    })
  }
  
}
