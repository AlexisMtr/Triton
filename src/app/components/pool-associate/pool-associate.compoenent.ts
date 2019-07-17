import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Pool } from "../../interfaces/pool";

@Component({
    selector: 'app-pool-associate',
    templateUrl: './pool-associate.component.html',
    styleUrls: ['./pool-associate.component.css']
})
export class PoolAssociateComponent {

    @Input() pool: Pool;
    @Input() devices: string[];
    @Input() showModal: boolean;

    @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
    @Output() done: EventEmitter<any> = new EventEmitter<any>();

    private selectedDevice: string;

    public apply(): void {
        this.done.emit({ done: true, device: this.selectedDevice });
    }

    public cancel(): void {
        this.canceled.emit({ done: false, device: null });
    }
}