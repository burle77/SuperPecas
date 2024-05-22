import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carro-form',
  templateUrl: './carro-form.component.html',
  styleUrls: ['./carro-form.component.css']
})
export class CarroFormComponent implements OnInit {
  carroForm: FormGroup;
  fabricantes: string[] = [];
  isEditMode: boolean = false;
  carro: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {
    this.carroForm = this.fb.group({
      nomeModelo: ['', [Validators.required, Validators.maxLength(255)]],
      fabricante: ['', Validators.required],
      codigoUnico: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.dataService.getFabricantes().subscribe(fabricantes => {
      this.fabricantes = fabricantes || [];
    });

    const carroId = this.route.snapshot.paramMap.get('id');
    if (carroId) {
      this.isEditMode = true;
      this.dataService.getCarroById(carroId).subscribe(carro => {
        this.carro = carro || {};
        this.carroForm.patchValue(this.carro);
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/carros']);
  }

  onSubmit(): void {
    if (this.carroForm.invalid) {
      return;
    }
  
    console.log('Formulário enviado', this.carroForm.value); 
  
    const carroData = this.carroForm.value;
    if (this.isEditMode) {
      this.dataService.updateCarro(this.carro.id, carroData).subscribe(
        () => this.showSuccessMessage('Carro atualizado com sucesso!'),
        () => this.showErrorMessage('Erro ao atualizar o carro.')
      );
    } else {
      this.dataService.addCarro(carroData).subscribe(
        () => this.showSuccessMessage('Carro adicionado com sucesso!'),
        () => this.showErrorMessage('Erro ao adicionar o carro.')
      );
    }
  }
  

  onClear(): void {
    this.carroForm.reset();
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000
    });
    this.voltar();
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }
}
