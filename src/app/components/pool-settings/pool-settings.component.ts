import { Component, OnInit, NgModuleRef } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';
import { ActivatedRoute } from '@angular/router';
import { Pool } from '../../interfaces/pool';
import { PoolConfiguration } from '../../interfaces/poolConfiguration';

@Component({
    selector: 'app-pool-settings',
    templateUrl: './pool-settings.component.html',
    styleUrls: ['./pool-settings.component.css']
})
export class PoolSettingsComponent implements OnInit {

    private poolId: number;
    private pool: PoolConfiguration;

    name: string;
    latitude: number;
    longitude: number;
    temperatureMinValue: number;
    temperatureMaxValue: number;
    phMinValue: number;
    phMaxValue: number;
    waterLevelMinValue: number;
    waterLevelMaxValue: number;

    constructor(private apiService: PoseidonApiService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.poolId = this.route.snapshot.params['id'];
        this.apiService.getPool(this.poolId).subscribe(data => {
            console.log(data);
            this.pool = data;
            this.deconstruct(data);
        }, err => console.log(err));
    }

    private deconstruct(pool: PoolConfiguration): void {
        this.name = pool.name;
        this.phMaxValue = pool.phMaxValue;
        this.phMinValue = pool.phMinValue;
        this.waterLevelMaxValue = pool.waterLevelMaxValue;
        this.waterLevelMinValue = pool.waterLevelMinValue;
        this.temperatureMaxValue = pool.temperatureMaxValue;
        this.temperatureMinValue = pool.temperatureMinValue;
        this.latitude = pool.latitude;
        this.longitude = pool.longitude;
    }

    public cancelUpdate(): void {
        this.deconstruct(this.pool);
    }

    public updateConfiguration(): void {
        console.log("update");
        this.apiService.updateConfiguration(this.poolId, {
            waterLevelMaxValue: this.waterLevelMaxValue,
            waterLevelMinValue: this.waterLevelMinValue,
            phMaxValue: this.phMaxValue,
            phMinValue: this.phMinValue,
            temperatureMaxValue: this.temperatureMaxValue,
            temperatureMinValue: this.temperatureMinValue,
            name: this.name,
            latitude: 0.00,
            longitude: 0.00,
            id: this.poolId,
            deviceId: this.pool.deviceId
        }).subscribe(data => this.deconstruct(data), err => console.log(err));
    }

}
