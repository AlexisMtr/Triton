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

    constructor(private apiService: PoseidonApiService, private router: Router) {}

    ngOnInit(): void {
        this.apiService.getPools().subscribe(data => {
            this.pools = data;
        }, err => console.log(err));
    }

    public poolSelected(id: number): void {
        console.log(id);
        this.router.navigate(['/pool', id]);
    }

    public poolSettings(id: number): void {
        console.log(id);
        this.router.navigate(['/pool', id, 'settings']);
    }
}