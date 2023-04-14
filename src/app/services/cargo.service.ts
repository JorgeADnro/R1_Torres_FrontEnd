import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  url = 'http://localhost:4000/api/cargos/';

  constructor(private http: HttpClient) { }

  getCargos(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerCargo(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}