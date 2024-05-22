import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Carro } from '../models/carro.model';

@Component({
  selector: 'app-carro-form',
  templateUrl: './carro-form.component.html',
  styleUrls: ['./carro-form.component.css']
})
export class CarroFormComponent implements OnInit {
  carro: Carro = new Carro();
  fabricantes: string[] = [];
  isEditMode: boolean = false;

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const carroId = this.route.snapshot.paramMap.get('id');
    if (carroId) {
      this.isEditMode = true;
      this.carService.getCarro(+carroId).subscribe(data => {
        this.carro = data;
      });
    }
    this.loadFabricantes();
  }

  loadFabricantes(): void {
    this.carService.getFabricantes().subscribe(data => {
      this.fabricantes = data;
    });
  }

  navigateBack(): void {
    this.router.navigate(['/carros']);
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.carService.updateCarro(this.carro).subscribe(() => {
        this.router.navigate(['/carros']);
      });
    } else {
      this.carService.createCarro(this.carro).subscribe(() => {
        this.router.navigate(['/carros']);
      });
    }
  }

  clearForm(): void {
    this.carro = new Carro();
  }
}
