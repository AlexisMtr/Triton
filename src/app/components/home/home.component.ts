import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pool } from "../../interfaces/pool";
import { PaginatedElement } from "../../interfaces/paginatedElement";
import { PoseidonApiService } from "../../services/poseidon-api.service";

@Component({
    selector: "app-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {

    constructor(private apiService: PoseidonApiService) {}

    public disconnect(): void {
        this.apiService.logout();        
    }
}