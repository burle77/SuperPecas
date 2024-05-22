import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/carros`;

  constructor(private http: HttpClient) {}

  getCarros(page: number = 0): Observable<any> { // ajuste para Observable<any>
    return this.http.get<any>(`${this.apiUrl}/listaTodosPaginado?page=${page}&size=10`);
  }

  searchCarros(term: string, page: number = 0): Observable<any> { // ajuste para Observable<any>
    return this.http.get<any>(`${this.apiUrl}/listaTodosPaginado/${term}?page=${page}&size=10`);
  }

  getCarro(id: number): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/${id}`);
  }

  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }

  updateCarro(carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.apiUrl}/${carro.id}`, carro);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFabricantes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/fabricantes`);
  }

  getCarrosPaginados(page: number, size: number): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
