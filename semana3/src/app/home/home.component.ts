import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Chart, ChartOptions, registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topFabricantesChart: any;
  topCarrosChart: any;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTopFabricantes();
    this.loadTopCarrosComMaisPecas();
  }

  loadTopFabricantes(): void {
    this.http.get<any[]>(`${this.apiUrl}/carro/listaTop10Fabricantes`).subscribe(data => {
      const fabricantes = data.map(item => item.fabricante);
      const counts = data.map(item => item.count);
      const canvas = document.getElementById('topFabricantesChart') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.topFabricantesChart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: fabricantes,
              datasets: [{
                data: counts,
                backgroundColor: this.getColors(counts.length)
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Top 10 Fabricantes com mais Carros'
                }
              }
            } as ChartOptions<'pie'>
          });
        }
      }
    });
  }

  loadTopCarrosComMaisPecas(): void {
    this.http.get<any[]>(`${this.apiUrl}/peca/listaTop10CarroComMaisPecas`).subscribe(data => {
      const carros = data.map(item => item.carro);
      const counts = data.map(item => item.count);
      const canvas = document.getElementById('topCarrosChart') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.topCarrosChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: carros,
              datasets: [{
                data: counts,
                backgroundColor: this.getColors(counts.length)
              }]
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Top 10 Carros com mais Peças'
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            } as ChartOptions<'bar'>
          });
        }
      }
    });
  }

  getColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`);
    }
    return colors;
  }
}
