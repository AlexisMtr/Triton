import { Component, OnInit, Input } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';
import { Router } from '@angular/router';

class User {
  login     : string;
  password  : string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    @Input() user : User = new User();

    constructor(private poseidon: PoseidonApiService, private router: Router) { }

    public connect(): void {
        
        this.poseidon.connect(this.user.login, this.user.password)
            .subscribe(_token => {
                this.router.navigate(['/']);
            }, error => {
                console.log("Error", error); 
            }
        ); 
    }

}
