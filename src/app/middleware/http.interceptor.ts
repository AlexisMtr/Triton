import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AppService } from "../services/app.service";
import { Injectable } from "@angular/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private appService: AppService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(this.appService.isLogged()) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'bearer ' + this.appService.getToken()
                }
            });
        }
        return next.handle(req);
    }
}