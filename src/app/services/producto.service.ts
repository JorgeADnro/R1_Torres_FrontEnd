import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos';
  urlH = 'http://localhost:4000/api/productos/genero/H';
  urlM = 'http://localhost:4000/api/productos/genero/M';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  getProductosH(): Observable<any> {
    return this.http.get(this.urlH);
  }

  getProductosM(): Observable<any> {
    return this.http.get(this.urlM);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  getProductosByArea(areaInt: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/areaInt/${areaInt}`);
  }

  getProductosByGenero(genero: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/genero/${genero}`);
  }  

  getProductosByAreaYGenero(areaInt: string, genero: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/areaInt/${areaInt}/genero/${genero}`);
  }

  getProductosByAreaYFecha(areaInt: string, fechaCreacion: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/areaInt/${areaInt}/fechaCreacion/${fechaCreacion}`);
  }

  getProductosByFecha(fechaCreacion: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/fechaCreacion/${fechaCreacion}`);
  } 

}
