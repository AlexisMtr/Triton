import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    constructor() { }

    public isLogged(): boolean {
        return localStorage.getItem('bearer') !== null;
    }

    public saveToken(token: string): void {
        localStorage.setItem('bearer', token);
    }

    public getToken(): string {
        return localStorage.getItem('bearer');
    }

    public logout(): void {
        localStorage.removeItem('bearer');
    }
}