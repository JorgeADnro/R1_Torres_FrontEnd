import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  eventoForm: FormGroup;
  titulo = 'Agregar datos';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _eventoService: EventoService,
              private aRouter: ActivatedRoute) { 
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cupo: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEvento() {

    const EVENTO: Evento = {
      nombre: this.eventoForm.get('nombre')?.value,
      descripcion: this.eventoForm.get('descripcion')?.value,
      fecha: this.eventoForm.get('fecha')?.value,
      cupo: this.eventoForm.get('cupo')?.value,
    }

    console.log(EVENTO);
    this._eventoService.guardarEvento(EVENTO).subscribe(data => {
      this.toastr.success('El participante fue registrado con exito!', 'Participante Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.eventoForm.reset();
    })

  
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar evento';
      this._eventoService.obtenerEvento(this.id).subscribe(data => {
        this.eventoForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          fecha: data.fecha,
          cupo: data.cupo,
        })
      })
    }
  }

}