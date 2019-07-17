import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: 'app-pool-creation',
    templateUrl: './pool-creation.component.html',
    styleUrls: ['./pool-creation.component.css']
})
export class PoolCreationComponent {

    @Input() showModal: boolean = false;

    @Output() validate: EventEmitter<any> = new EventEmitter<any>();
    @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

    private name: string;
    private lat: number;
    private lng: number;

    public apply(): void {
        this.validate.emit({
            name: this.name,
            latitude: this.lat,
            longitude: this.lng,
        });
    }

    public cancel(): void {
        this.canceled.emit();
    }
}