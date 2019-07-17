import { Component, OnInit } from "@angular/core";
import { PoseidonApiService } from "../../services/poseidon-api.service";
import { Pool } from "../../interfaces/pool";
import { PaginatedElement } from "../../interfaces/paginatedElement";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./home-list.component.html",
    styleUrls: ["./home-list.component.css"],
    selector: "app-home-list"
})
export class HomeListComponent implements OnInit {

    private pools: PaginatedElement<Pool>;
    private currentPool: Pool;
    private availableDevices: string[];
    private showModal: boolean = false;

    constructor(private apiService: PoseidonApiService, private router: Router) { }

    ngOnInit(): void {
        this.apiService.getPools().subscribe(data => {
            console.log(data);
            this.pools = data;
        }, err => console.log(err));
        this.apiService.getAvailableDevices().subscribe(data => {
            this.availableDevices = data;
        }, err => console.log(err));
    }

    public poolSelected(id: number): void {
        console.log(id);
        this.router.navigate(['/pool', id]);
    }

    public changeCurrentPool(pool: Pool): void {
        this.currentPool = pool;
    }

    public poolSettings(id: number): void {
        console.log(id);
        this.router.navigate(['/pool', id, 'settings']);
    }

    public openAssociateModal(pool: Pool): void {
        this.currentPool = pool;
        this.showModal = pool !== null;
    }

    public closeModal(event: any): void {
        if (event.done && event.device !== null) {
            this.apiService.linkPoolToDevice(this.currentPool.id, event.device).subscribe(success => {
                this.showModal = false;
                if (success) {
                    this.pools.elements.filter(e => e.id === this.currentPool.id)[0].deviceId = event.device;
                    this.availableDevices = this.availableDevices.filter((value, _index, _arr) => {
                        return value !== event.device;
                    });
                }
                this.currentPool = null;
            }, err => console.log(err));
        } else {
            this.showModal = false;
            this.currentPool = null;
        }
    }

    public unlinkPool(pool: Pool): void {
        this.apiService.unlinkPoolToDevice(pool.id).subscribe(success => {
            if (success) {
                pool.deviceId = null;
            }
            this.apiService.getAvailableDevices().subscribe(data => {
                this.availableDevices = data;
            }, err => console.log(err));
        }, err => console.log("my err", err));
    }
}