import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OwmApiService {

    constructor(private http: HttpClient) {}

    private baseUrl: string = "http://api.openweathermap.org/data/2.5/";
    private appId: string;

    public getCurrentWeather(latitude: number, longitude: number): Observable<any> {
        let endpoint = this.baseUrl + 'weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + this.appId + '&unit=metric&lang=fr';
        return Observable.create(observer => {
            this.http.get(endpoint).subscribe(data => {
                observer.next(data);
            }, err => console.log(err));
        });
    }

    public getForecastWeather(latitude: number, longitude: number): Observable<any> {
        let endpoint = this.baseUrl + 'forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + this.appId + '&unit=metric&lang=fr';
        return Observable.create(observer => {
            this.http.get(endpoint).subscribe(data => {
                observer.next(data);
            }, err => console.log(err));
        });
    }
}