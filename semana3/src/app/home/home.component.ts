import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '@canvasjs/charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTop10Fabricantes().subscribe(data => {
      this.renderTop10FabricantesChart(data);
    });

    this.dataService.getTop10CarrosComMaisPecas().subscribe(data => {
      this.renderTop10CarrosChart(data);
    });
  }

  renderTop10FabricantesChart(data: any) {
    let chart = new CanvasJS.Chart("top10FabricantesChart", {
      animationEnabled: true,
      title: {
        text: "Top 10 Fabricantes"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0\"%\"",
        dataPoints: data.map((item: any) => ({ y: item.value, label: item.label }))
      }]
    });
    chart.render();
  }

  renderTop10CarrosChart(data: any) {
    let chart = new CanvasJS.Chart("top10CarrosChart", {
      animationEnabled: true,
      title: {
        text: "Top 10 Carros com Mais Peças"
      },
      data: [{
        type: "column",
        dataPoints: data.map((item: any) => ({ y: item.value, label: item.label }))
      }]
    });
    chart.render();
  }
}
