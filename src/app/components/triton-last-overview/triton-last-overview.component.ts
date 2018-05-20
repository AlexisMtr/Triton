import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';
import { TelemetryType } from '../../interfaces/telemetry';

@Component({
  selector: 'triton-last-overview',
  templateUrl: './triton-last-overview.component.html',
  styleUrls: ['./triton-last-overview.component.css']
})
export class TritonLastOverviewComponent implements OnInit, OnChanges {

    private waterTemperature: number;
    private waterPh: number;

    private poolVolume: number;

    private weatherCondition: string;
    private weatherTemperature: number;

    private batteryLevel: number;

    @Input() poolId: number;

    constructor(private poseidon: PoseidonApiService) { }

    ngOnInit() {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        this.Reload();
    }

    private Reload() : void
    {
        this.poseidon.GetCurrentTelemetries(this.poolId)
        .subscribe(telemetrySet => {
            
            let batteryPredicate = e => e.type == TelemetryType.Battery;
            this.batteryLevel = telemetrySet.filter(batteryPredicate).length == 0 ? null : telemetrySet.filter(batteryPredicate)[0].value;

            let levelPredicate = e => e.type == TelemetryType.Level;
            this.poolVolume = telemetrySet.filter(levelPredicate).length == 0 ? null : telemetrySet.filter(levelPredicate)[0].value;

            let phPredicate = e => e.type == TelemetryType.Ph;
            this.waterPh = telemetrySet.filter(phPredicate).length == 0 ? null : telemetrySet.filter(phPredicate)[0].value;

            let tempPredicate = e => e.type == TelemetryType.Temperature;
            this.waterTemperature = telemetrySet.filter(tempPredicate).length == 0 ? null : telemetrySet.filter(tempPredicate)[0].value;

        }, err => console.error(err));
    }
}