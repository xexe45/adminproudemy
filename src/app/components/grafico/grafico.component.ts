import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: []
})
export class GraficoComponent implements OnInit {
  @Input() grafico1: any = {
    'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
    'data': [24, 30, 46],
    'type': 'doughnut',
    'leyenda': 'El pan se come con'
  };

  constructor() {
  }

  ngOnInit() {}
}
