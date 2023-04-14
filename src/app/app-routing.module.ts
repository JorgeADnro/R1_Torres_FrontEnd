import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';

import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';

// componentes
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';


const routes: Routes = [
  { path: 'ver-participantes', component: ListarProductosComponent },
  { path: 'ver-eventos', component: ListarEventosComponent },
  { path: 'añadir-participante', component: CrearProductoComponent },
  { path: 'editar-participante/:id', component: CrearProductoComponent },
  { path: 'añadir-evento', component: CrearEventoComponent },
  { path: 'editar-evento/:id', component: CrearEventoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
