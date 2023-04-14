import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  url = 'http://localhost:4000/api/productos/';
  url2 = 'http://localhost:4000/api/productos/f';
  
  constructor(private http: HttpClient) { }

  getGenero(genero: string): Observable<any> {
    const params = new HttpParams().set('genero', genero);
    return this.http.get<Producto[]>(this.url, { params }).pipe(
      tap(data => console.log('Usuarios encontrados:', data)),
      catchError(error => {
        console.log('Error al obtener usuarios:', error);
        return throwError(error);
      })
    );
  }

  getGeneroF(genero: string): Observable<any> {
    const params = new HttpParams().set('genero', genero);
    return this.http.get<Producto[]>(this.url2, { params }).pipe(
      tap(data => console.log('Usuarios encontrados:', data)),
      catchError(error => {
        console.log('Error al obtener usuarios:', error);
        return throwError(error);
      })
    );
  }
}
