import { PipeTransform } from "@angular/core";

export class DateTimePipe implements PipeTransform {

    transform(value: Date | string, ...args: any[]): string {
        if(typeof value === "string") value = new Date(value);

        let day = value.getDate() > 10 ? value.getDate() : '0' + value.getDate();
        let month = value.getMonth() + 1 > 10 ? (value.getMonth() + 1) : '0' + (value.getMonth() + 1);
        let hour = value.getHours() > 10 ? value.getHours() : '0' + value.getHours();
        let minutes = value.getMinutes() > 10 ? value.getMinutes() : '0' + value.getMinutes();

        return day + '/' + month + ' ' + hour + ':' + minutes;
    }

}