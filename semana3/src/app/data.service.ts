import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  getTop10Fabricantes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/carro/listaTop10Fabricantes`);
  }

  getTop10CarrosComMaisPecas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/peca/listaTop10CarroComMaisPecas`);
  }
  getCarrosPaginados(page: number, size: number, termo: string = ''): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/carro/listaTodosPaginado${termo}?page=${page}&size=${size}`);
  }
}
