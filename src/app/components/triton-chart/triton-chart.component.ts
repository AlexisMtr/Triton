import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';
import { TelemetryType } from '../../interfaces/telemetry';

@Component({
  selector: 'triton-chart',
  templateUrl: './triton-chart.component.html',
  styleUrls: ['./triton-chart.component.css']
})
export class TritonChartComponent implements OnInit, OnChanges
{
    private start: Date = new Date('2018-05-19');
    private end: Date = new Date('2018-05-21');

    private tempDatas: any[] = [{ data: [] }];
    private tempLabel: string[] = [];
    private minTemp: number;
    private maxTemp: number;

    private levelDatas: any[] = [{ data: [] }];
    private levelLabel: string[] = [];
    private minLevel: number;
    private maxLevel: number;

    private chartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 10,
                    suggestedMax: 40
                }
            }]
        }
    };

    @Input() poolId: number;

    constructor(private poseidon: PoseidonApiService) { }

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.UpdateCharts();
    }

    public UpdateCharts() : void
    {
        this.poseidon.GetTelemetriesHistory(this.poolId, TelemetryType.Temperature, this.start, this.end)
            .subscribe(data =>
            {
                let temperature = data.elements.map(e => e.value);

                this.tempLabel.splice(0, this.tempLabel.length, ...data.elements.map(e => new Date(e.dateTime).toLocaleTimeString()))
                this.tempDatas = [ { data: temperature, label: 'Température' } ]

                this.minTemp = temperature.reduce((previous, current) => previous < current ? previous : current);
                this.maxTemp = temperature.reduce((previous, current) => previous > current ? previous : current);
            }
        );
        this.poseidon.GetTelemetriesHistory(this.poolId, TelemetryType.Level, this.start, this.end)
            .subscribe(data =>
            {
                let level = data.elements.map(e => e.value);

                this.levelLabel.splice(0, this.levelLabel.length, ...data.elements.map(e => new Date(e.dateTime).toLocaleTimeString()))
                this.levelDatas = [ { data: level, label: 'Niveau d\'eau' } ];

                this.minLevel = level.reduce((previous, current) => previous < current ? previous : current);
                this.maxLevel = level.reduce((previous, current) => previous > current ? previous : current);
            }
        );
    }
}