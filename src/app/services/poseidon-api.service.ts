import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PoseidonApiService {

  constructor(private http: Http) { }

  private baseUrl : string = "http://localhost:64705/api";

  connect(login: string, password: string): Observable<Response> {
    let endPoint = this.baseUrl + "/token";
    return this.http.get(endPoint)
      .map(response => response.json());
  }

}
