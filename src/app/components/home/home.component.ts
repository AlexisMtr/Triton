import { Component, OnInit, state } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PoseidonApiService } from "../../services/poseidon-api.service";

@Component({
    selector: "app-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {

    constructor(private apiService: PoseidonApiService, private router: Router) {}

    public disconnect(): void {
        this.apiService.logout();
        this.router.navigate(['/'], { queryParams: { returnUrl: this.router.url }});
    }
}