import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Pool } from "../../interfaces/pool";
import { PoseidonApiService } from "../../services/poseidon-api.service";
import { ActivatedRoute } from "@angular/router";
import { TelemetryType } from "../../interfaces/telemetry";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DatePipe } from "@angular/common";
import { DateTimePipe } from "../../middleware/datetime.pipe";

@Component({
    selector: "app-pool",
    templateUrl: "./pool.component.html",
    styleUrls: ["./pool.component.css"]
})
export class PoolComponent implements OnInit, OnChanges {

    private pool: Pool;
    private poolId: number;

    private waterTemperature: number;
    private waterPh: number;
    private poolVolume: number;
    private weatherCondition: string;
    private weatherTemperature: number;
    private batteryLevel: number;

    private start: Date = new Date('2018-06-01');
    private end: Date = new Date(Date.now());

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

    constructor(private apiService: PoseidonApiService, private route: ActivatedRoute) {}

    ngOnChanges(): void {
        this.reload();
        this.updateCharts()
    }
    
    ngOnInit(): void {
        console.log(this.route);
        this.poolId = this.route.snapshot.params['id'];
        this.reload();
        this.updateCharts();
    }

    public startDateChange(event: any, start: boolean) : void {
        if(start) {
            this.start = new Date(event.target.value);
        }
        else {
            this.end = new Date(event.target.value);
        }
            
        this.updateCharts();
    }

    private reload(): void {
        
        this.apiService.getPool(this.poolId).subscribe(data => {
            this.pool = data;
        }, err => console.log(err));
        
        this.apiService.getCurrentTelemetries(this.poolId)
            .subscribe(telemetrySet => {
                
                let batteryPredicate = e => e.type == TelemetryType.Battery;
                this.batteryLevel = telemetrySet.filter(batteryPredicate).length == 0 ? null : telemetrySet.filter(batteryPredicate)[0].value;

                let levelPredicate = e => e.type == TelemetryType.Level;
                this.poolVolume = telemetrySet.filter(levelPredicate).length == 0 ? null : telemetrySet.filter(levelPredicate)[0].value;

                let phPredicate = e => e.type == TelemetryType.Ph;
                this.waterPh = telemetrySet.filter(phPredicate).length == 0 ? null : telemetrySet.filter(phPredicate)[0].value;

                let tempPredicate = e => e.type == TelemetryType.Temperature;
                this.waterTemperature = telemetrySet.filter(tempPredicate).length == 0 ? null : telemetrySet.filter(tempPredicate)[0].value;

            }, err => console.error(err)
        );
    }

    private updateCharts() : void {
        let datePipe = new DateTimePipe();
        this.apiService.getTelemetriesHistory(this.poolId, TelemetryType.Temperature, this.start, this.end)
            .subscribe(data => {
                let temperature = data.elements.map(e => e.value);

                this.tempLabel.splice(0, this.tempLabel.length, ...data.elements.map(e => datePipe.transform(e.dateTime)));
                this.tempDatas = [ { data: temperature, label: 'Température' } ]

                this.minTemp = temperature.reduce((previous, current) => previous < current ? previous : current);
                this.maxTemp = temperature.reduce((previous, current) => previous > current ? previous : current);
            }
        );
        this.apiService.getTelemetriesHistory(this.poolId, TelemetryType.Level, this.start, this.end)
            .subscribe(data => {
                let level = data.elements.map(e => e.value);

                this.levelLabel.splice(0, this.levelLabel.length, ...data.elements.map(e => datePipe.transform(e.dateTime)))
                this.levelDatas = [ { data: level, label: 'Niveau d\'eau' } ];

                this.minLevel = level.reduce((previous, current) => previous < current ? previous : current);
                this.maxLevel = level.reduce((previous, current) => previous > current ? previous : current);
            }
        );
    }
}