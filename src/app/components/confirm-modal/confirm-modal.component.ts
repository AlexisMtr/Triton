import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    templateUrl: "./confirm-modal.component.html",
    styleUrls: ["./confirm-modal.component.css"],
    selector: "app-confirm-modal"
})
export class ConfirmModalComponent {

    @Input() text: string;
    @Input() showModal: boolean = false;

    @Output() confirmed: EventEmitter<any> = new EventEmitter<any>();
    @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

    public confirm(): void {
        this.confirmed.emit();
    }

    public cancel(): void {
        this.canceled.emit();
    }

}