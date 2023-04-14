import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  url = 'http://localhost:4000/api/ciudad/';

  constructor(private http: HttpClient) { }

  getCiudades(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerCiudad(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}