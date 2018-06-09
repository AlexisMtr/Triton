import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Token } from '../interfaces/token';
import { Telemetry, TelemetryType } from '../interfaces/telemetry';
import { PaginatedElement } from '../interfaces/paginatedElement';
import { Pool } from '../interfaces/pool';
import { AppService } from './app.service';


export enum Method {
    Get,
    Post,
    Put,
    Delete
};

@Injectable()
export class PoseidonApiService {

    constructor(private http: HttpClient, private appService: AppService) { }

    private baseUrl : string = "http://localhost:64705/api";

    public connect(login: string, password: string): Observable<any> {
        let endPoint = this.baseUrl + "/accounts/login";
        return Observable.create(observer => {
            this.http.post(endPoint, {
                email: login,
                password: password
            }).subscribe(data => {
                let token = data as Token;
                this.appService.saveToken(token.token)
                observer.next(data)
            });
        });
    }

    public logout(): void {
        this.appService.logout();
    }

    public getPools(): Observable<PaginatedElement<Pool>> {
        let endPoint = this.baseUrl + '/pools';
        return this.httpRequest(Method.Get, endPoint, null, null);
    }

    public getPool(poolId: number) : Observable<Pool> {
        let endPoint = this.baseUrl + '/pools/' + poolId;
        return this.httpRequest(Method.Get, endPoint, null, null);
    }

    public getCurrentTelemetries(poolId: number): Observable<Telemetry[]> {
        let endPoint = this.baseUrl + "/pools/" + poolId + "/telemetry/current";
        return this.httpRequest<Telemetry[]>(Method.Get, endPoint, null, null);
    }

    public getTelemetriesHistory(poolId: number, type?: TelemetryType, after?: Date, before?: Date): Observable<PaginatedElement<Telemetry>> {
        let endPoint = this.baseUrl + "/pools/" + poolId + "/telemetry/history";
        let params = new HttpParams();

        if(type !== undefined) {
            params = params.append('type', type.toString());
        }
        if(before !== undefined) {
            params = params.append('before', before.toISOString());
        }
        if(after !== undefined) {
            params = params.append('after', after.toISOString());
        }

        return this.httpRequest<PaginatedElement<Telemetry>>(Method.Get, endPoint, params, null);
    }

    private httpRequest<T>(method: Method, endpoint: string, params?: HttpParams, body?: any) : Observable<T> {
        
        let httpOptions = {
            headers: null,
            params: params
        };
    
        return Observable.create(observer => {
            if(method == Method.Get) {
                this.http.get(endpoint, httpOptions).subscribe(data => observer.next(data));
            }
            else if(method == Method.Post) {
                this.http.post(endpoint, body, httpOptions).subscribe(data => observer.next(data));
            }
            else if(method == Method.Put) {
                this.http.put(endpoint, body, httpOptions).subscribe(data => observer.next(data));
            }
            else if(method == Method.Delete) {
                this.http.delete(endpoint, httpOptions).subscribe(data => observer.next(data));
            }
        });
    }
}
