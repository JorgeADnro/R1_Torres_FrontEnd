import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) { 
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
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
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

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          apPaterno: data.apPaterno,
          apMaterno: data.apMaterno,
          edad: data.edad,
          genero: data.genero,
          correo: data.correo,
          telefono: data.telefono,
          ciudad: data.ciudad,
          cargo: data.cargo,
        })
      })
    }
  }

}
