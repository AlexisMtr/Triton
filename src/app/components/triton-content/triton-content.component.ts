import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-triton-content',
  templateUrl: './triton-content.component.html',
  styleUrls: ['./triton-content.component.css']
})
export class TritonContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
            suggestedMin: -10,
            suggestedMax: 50
        }
      }]
  }

  };

  chartData = [
    { data: [15, 15.5, 17, 20.5, 22, 24, 25, 27.2, 28.4, 29.5, 29.8, 30.1, 30.6, 31, 31.2, 31.7, 32, 32.5, 32.9, 33.1, 33.5, 33.6, 34, 34.5, 35], label: 'Température extérieur' },
    { data: [24, 24.4, 24.6, 25, 25, 25, 25.8, 26, 26.4, 26.5, 26.5, 26.7, 26.6, 26.5, 26.7, 26.8, 27, 27.1, 27.2, 27.1, 27, 27.5, 27.5, 27.6, 27.7], label: 'Température de l\'eau' }
  ];

  chartLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  myColors = [
    {
      backgroundColor: 'rgba(103, 58, 183, 0)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    {
      backgroundColor: 'rgba(103, 58, 183, 0)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
  ];

  onChartClick(event) {
    console.log(event);
  }

}
