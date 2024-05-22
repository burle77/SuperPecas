import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Carro } from '../models/carro.model';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {
  carros: Carro[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCarros();
  }

  loadCarros(page: number = 0): void {
    this.carService.getCarros(page).subscribe(response => {
      this.carros = response.content;
      this.totalPages = response.totalPages;
    });
  }

  navigateToAddCar(): void {
    this.router.navigate(['/carros/add']);
  }

  navigateToEditCar(id: number): void {
    this.router.navigate(['/carros/edit', id]);
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.loadCarros(this.currentPage - 1);
    });
  }

  onSearch(event: any): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.carService.searchCarros(searchTerm, this.currentPage - 1).subscribe(response => {
      this.carros = response.content;
      this.totalPages = response.totalPages;
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCarros(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCarros(this.currentPage - 1);
    }
  }
}
