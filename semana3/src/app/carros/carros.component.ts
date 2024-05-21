import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {
  carros: any[] = [];
  totalRecords: number = 0;
  pesquisa: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadCars({ first: 0, rows: 10 });
  }

  loadCars(event: any): void {
    const page = event.first / event.rows;
    const size = event.rows;
    const termo = this.pesquisa ? `/${this.pesquisa}` : '';
    this.dataService.getCarrosPaginados(page, size, termo).subscribe(data => {
      this.carros = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  cadastrarCarro(): void {
    // Navegar para a tela de cadastro de carro
  }

  editarCarro(carro: any): void {
    // Navegar para a tela de edição de carro com os dados do carro
  }

  removerCarro(id: number): void {
    // Implementar a lógica de remoção de carro
  }

  pesquisar(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.pesquisa = inputElement.value;
      this.loadCars({ first: 0, rows: 10 });
    }
  }

  clearPesquisa(): void {
    this.pesquisa = '';
    this.loadCars({ first: 0, rows: 10 });
  }
}
