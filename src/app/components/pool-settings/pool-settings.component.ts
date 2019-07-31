import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';
import { ActivatedRoute } from '@angular/router';
import { PoolConfiguration } from '../../interfaces/poolConfiguration';
import { Options } from 'ng5-slider';

@Component({
    selector: 'app-pool-settings',
    templateUrl: './pool-settings.component.html',
    styleUrls: ['./pool-settings.component.css', './pool-settings.component.scss']
})
export class PoolSettingsComponent implements OnChanges {

    @Input() pool: PoolConfiguration;
    @Input() showModal: boolean;

    @Output() validate: EventEmitter<any> = new EventEmitter<any>();
    @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

    private isBusy: boolean = false;

    name: string;
    temperatureMinValue: number = 0;
    temperatureMaxValue: number = 0;
    phMinValue: number = 0;
    phMaxValue: number = 0;
    waterLevelMinValue: number = 0;
    waterLevelMaxValue: number = 0;

    temperatureOptions: Options = {
        floor: -5,
        ceil: 40,
        animate: false,
        noSwitching: true
    };
    levelOptions: Options = {
        floor: 0,
        ceil: 150,
        animate: false,
        noSwitching: true
    };
    phOptions: Options = {
        floor: 1,
        ceil: 9,
        animate: false,
        noSwitching: true
    };

    constructor(private apiService: PoseidonApiService, private route: ActivatedRoute) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (this.isPoolChangesDefined(changes)) {
            this.isBusy = true;
            this.apiService.getPool(changes.pool.currentValue.id).subscribe(data => {
                console.log(data);
                this.pool = data;
                this.deconstruct(data);
                this.isBusy = false;
            }, err => console.log(err));
        }
    }

    private deconstruct(pool: PoolConfiguration): void {
        this.name = pool.name;
        this.phMaxValue = pool.phMaxValue;
        this.phMinValue = pool.phMinValue;
        this.waterLevelMaxValue = pool.waterLevelMaxValue;
        this.waterLevelMinValue = pool.waterLevelMinValue;
        this.temperatureMaxValue = pool.temperatureMaxValue;
        this.temperatureMinValue = pool.temperatureMinValue;
    }

    public cancel(): void {
        this.deconstruct(this.pool);
        this.canceled.emit();
    }

    public apply(): void {
        this.validate.emit({
            waterLevelMaxValue: this.waterLevelMaxValue,
            waterLevelMinValue: this.waterLevelMinValue,
            phMaxValue: this.phMaxValue,
            phMinValue: this.phMinValue,
            temperatureMaxValue: this.temperatureMaxValue,
            temperatureMinValue: this.temperatureMinValue,
        });
    }

    private isPoolChangesDefined(poolChanges: SimpleChanges): boolean {
        return poolChanges.pool !== undefined && poolChanges.pool.currentValue !== undefined && poolChanges.pool.currentValue !== null
    }

}
