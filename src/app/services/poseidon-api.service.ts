import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UserDataClaim } from '../interfaces/user-data-claim';
import { Token } from '../interfaces/token';
import { Telemetry, TelemetryType } from '../interfaces/telemetry';
import { identifierModuleUrl } from '@angular/compiler';
import { PaginatedElement } from '../interfaces/paginatedElement';
import { Pool } from '../interfaces/pool';


export enum Method 
{
    Get,
    Post,
    Put,
    Delete
};

@Injectable()
export class PoseidonApiService
{
    token: string = "bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTWVNfQURNSU4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhLm1hcnRpbmllckBnbWFpbC5jb20iLCJleHAiOjE1NTgzMzkwOTZ9.MqQ58Cnhd8wZrqHTdwCmhZfJVBTeGK-IhLd6fSrRb_y4gzxSfAms33oHZCCzzRUZSPpHhRQTAL7WP2VkuYguZA";
    constructor(private http: HttpClient) { }

    private baseUrl : string = "http://localhost:64705/api";

    public Connect(login: string, password: string): Observable<Token>
    {
        let endPoint = this.baseUrl + "/accounts/login";
        return Observable.create(observer =>
        {
            this.http.get(endPoint).subscribe(data => observer.next(data));
        });
    }

    public GetPool(poolId: number) : Observable<Pool>
    {
        let endPoint = this.baseUrl + '/pools/' + poolId;
        return this.HttpRequest(Method.Get, endPoint, null, null, true);
    }

    public GetCurrentTelemetries(poolId: number): Observable<Telemetry[]>
    {
        let endPoint = this.baseUrl + "/pools/" + poolId + "/telemetry/current";
        return this.HttpRequest<Telemetry[]>(Method.Get, endPoint, null, null, true);
    }

    public GetTelemetriesHistory(poolId: number, type?: TelemetryType, after?: Date, before?: Date): Observable<PaginatedElement<Telemetry>>
    {
        let endPoint = this.baseUrl + "/pools/" + poolId + "/telemetry/history";
        let params = new HttpParams();

        if(type !== undefined)
            params = params.append('type', type.toString());
        if(before !== undefined)
            params = params.append('before', before.toISOString());
        if(after !== undefined)
            params = params.append('after', after.toISOString());

        return this.HttpRequest<PaginatedElement<Telemetry>>(Method.Get, endPoint, params, null, true);
    }

    private HttpRequest<T>(method: Method, endpoint: string, params?: HttpParams, body?: any, authorize: boolean = true) : Observable<T>
    {
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': this.token
            }),
            params: params
        };
        
        if(!authorize) httpOptions.headers = null;
    
        return Observable.create(observer =>
        {
            if(method == Method.Get)
                this.http.get(endpoint, httpOptions).subscribe(data => observer.next(data));
            else if(method == Method.Post)
                this.http.post(endpoint, body, httpOptions).subscribe(data => observer.next(data));
            else if(method == Method.Put)
                this.http.put(endpoint, body, httpOptions).subscribe(data => observer.next(data));
            else if(method == Method.Delete)
                this.http.delete(endpoint, httpOptions).subscribe(data => observer.next(data));
        });
    }

}
