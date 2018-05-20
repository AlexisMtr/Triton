import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserDataClaim } from '../interfaces/user-data-claim';
import { Token } from '../interfaces/token';

@Injectable()
export class PoseidonApiService
{

    constructor(private http: Http) { }

    private baseUrl : string = "http://localhost:64705/api";

    public Connect(login: string, password: string): Observable<Token>
    {
        let endPoint = this.baseUrl + "/token";
        return this.http.get(endPoint)
            .map(response => response.json() as Token);
    }

}
