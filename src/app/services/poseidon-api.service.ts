import { Injectable, NgModuleFactoryLoader } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Token } from '../interfaces/token';
import { Telemetry, TelemetryType } from '../interfaces/telemetry';
import { PaginatedElement } from '../interfaces/paginatedElement';
import { Pool } from '../interfaces/pool';
import { AppService } from './app.service';
import { PoolConfiguration } from '../interfaces/poolConfiguration';


export enum Method {
    Get,
    Post,
    Put,
    Delete
};

@Injectable()
export class PoseidonApiService {

    constructor(private http: HttpClient, private appService: AppService) { }

    private baseUrl: string = "http://localhost:64705/api";

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

    public getPools(): Observable<PaginatedElement<PoolConfiguration>> {
        let endPoint = this.baseUrl + '/pools';
        return this.httpRequest(Method.Get, endPoint, null, null);
    }

    public getPool(poolId: number): Observable<PoolConfiguration> {
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

        if (type !== undefined) {
            params = params.append('type', type.toString());
        }
        if (before !== undefined) {
            params = params.append('before', before.toISOString());
        }
        if (after !== undefined) {
            params = params.append('after', after.toISOString());
        }
        params = params.append('rowsPerPage', '999999');

        return this.httpRequest<PaginatedElement<Telemetry>>(Method.Get, endPoint, params, null);
    }

    public updateConfiguration(poolId: number, configuration: PoolConfiguration): Observable<PoolConfiguration> {
        let endPoint = this.baseUrl + "/pools/" + poolId;
        console.log('execute', configuration);
        return this.httpRequest<PoolConfiguration>(Method.Put, endPoint, null, configuration);
    }

    public unlinkPoolToDevice(poolId: number): Observable<boolean> {
        let endpoint = this.baseUrl + '/pools/' + poolId + '/association';
        return Observable.create(observer => {
            this.httpRequest(Method.Delete, endpoint, null, null).subscribe(success => {
                observer.next(true);
            }, err => {
                console.log('err', err);
                observer.next(false);
            });
        });
    }

    public linkPoolToDevice(poolId: number, deviceId: string): Observable<boolean> {
        let endpoint = this.baseUrl + '/pools/' + poolId + '/association/' + deviceId;
        return Observable.create(observer => {
            this.httpRequest(Method.Put, endpoint, null, null).subscribe(success => {
                observer.next(true);
            }, err => {
                console.log('err', err);
                observer.next(false);
            });
        });
    }

    public getAvailableDevices(): Observable<string[]> {
        let endpoint = this.baseUrl + '/device';
        let params = new HttpParams();
        params = params.append("isAvailable", "true");
        return this.httpRequest(Method.Get, endpoint, params, null);
    }

    public createPool(name: string, latitude: number, longitude: number): Observable<PoolConfiguration> {
        let endpoint = this.baseUrl + '/pools';
        let body = {
            name: name,
            latitude: latitude,
            longitude: longitude
        };

        return this.httpRequest(Method.Post, endpoint, null, body);
    }

    public deletePool(poolId: number): Observable<boolean> {
        let endpoint = this.baseUrl + '/pools/' + poolId;
        return Observable.create(observer => {
            this.httpRequest(Method.Delete, endpoint, null, null).subscribe(success => {
                observer.next(true);
            }, err => {
                console.log('err', err);
                observer.next(false);
            });
        });
    }

    private httpRequest<T>(method: Method, endpoint: string, params?: HttpParams, body?: any): Observable<T> {

        let httpOptions = {
            headers: null,
            params: params
        };

        return Observable.create(observer => {
            if (method == Method.Get) {
                this.http.get(endpoint, httpOptions).subscribe(data => observer.next(data));
            }
            else if (method == Method.Post) {
                this.http.post(endpoint, body, httpOptions).subscribe(data => observer.next(data));
            }
            else if (method == Method.Put) {
                this.http.put(endpoint, body, httpOptions).subscribe(data => observer.next(data));
            }
            else if (method == Method.Delete) {
                this.http.delete(endpoint, httpOptions).subscribe(data => observer.next(data));
            }
        });
    }
}
