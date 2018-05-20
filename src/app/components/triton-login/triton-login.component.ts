import { Component, OnInit, Input } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';

class User {
  login     : string;
  password  : string;
}

@Component({
    selector: 'app-triton-login',
    templateUrl: './triton-login.component.html',
    styleUrls: ['./triton-login.component.css']
})
export class TritonLoginComponent implements OnInit {

    @Input() user : User = new User();

    constructor(private poseidon: PoseidonApiService) { }

    ngOnInit()
    {
    }

    connect()
    {
        console.log("try connect", this.user.login, this.user.password);
        this.poseidon.Connect(this.user.login, this.user.password)
            .subscribe(token => {
                console.log(token.Token);
            }, error => {
                console.log("Error", error); 
            }); 
    }

}
