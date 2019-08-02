import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from "@angular/core";
import { Pool } from "../../interfaces/pool";
import { Options } from "ng5-slider";
import { PoseidonApiService } from "../../services/poseidon-api.service";
import { TimeSpan } from "../../tools/timeSpan";
import { DeviceConfiguration } from "../../interfaces/deviceConfiguration";

@Component({
    selector: 'app-device-settings',
    templateUrl: './device-settings.component.html',
    styleUrls: ['./device-settings.component.css', './device-settings.component.scss']
})
export class DeviceSettingsComponent implements OnChanges {

    @Input() pool: Pool;
    @Input() showModal: boolean;

    @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
    @Output() validate: EventEmitter<any> = new EventEmitter<any>();

    private isBusy: boolean = false;

    name: string;
    deviceId: string = "";
    pubDelay: number = 0;
    updateDelay: number = 0;

    pubOptions: Options = {
        floor: 0,
        ceil: 120,
        showTicks: true,
        tickStep: 15
    };
    updateOptions: Options = {
        floor: 0,
        ceil: 360,
        showTicks: true,
        tickStep: 30
    };

    constructor(private apiService: PoseidonApiService) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (this.isPoolChangesDefined(changes)) {
            this.isBusy = true;
            this.apiService.getPool(changes.pool.currentValue.id).subscribe(data => {
                console.log(data);
                this.pool = data;
                this.name = this.pool.name;
                this.deviceId = this.pool.deviceId;
                this.apiService.getDeviceConfiguration(this.deviceId).subscribe(cfg => {
                    let pubDelay: TimeSpan = TimeSpan.fromString(cfg.publicationDelay);
                    let checkUpdate: TimeSpan = TimeSpan.fromString(cfg.configurationUpdateCheckDelay);

                    console.log(pubDelay.totalMinutes);
                    console.log(checkUpdate.days);
                    this.pubDelay = pubDelay.totalMinutes;
                    this.updateDelay = checkUpdate.days;
                    this.isBusy = false;
                }, err => console.log(err));
            }, err => console.log(err));
        }
    }

    public apply(): void {
        let config: DeviceConfiguration = {
            configurationUpdateCheckDelay: new TimeSpan(this.updateDelay, 0, 0, 0).toString(),
            publicationDelay: new TimeSpan(0, 0, this.pubDelay, 0).toString(),
            sleepModeStart: new Date(),
            version: "1"
        };
        this.validate.emit({
            deviceId: this.deviceId,
            configuration: config
        });
    }

    public cancel(): void {
        this.canceled.emit();
    }

    private isPoolChangesDefined(poolChanges: SimpleChanges): boolean {
        return poolChanges.pool !== undefined && poolChanges.pool.currentValue !== undefined && poolChanges.pool.currentValue !== null
    }
}