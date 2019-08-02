const MILLIS_PER_SECOND = 1000;
const MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;   //     60,000
const MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;     //  3,600,000
const MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;        // 86,400,000

const MIN_PER_HOUR = 60;
const SEC_PER_MIN = 60;
const HOUR_PER_DAY = 24;

export class TimeSpan {
    private _days: number;
    private _hours: number;
    private _minutes: number;
    private _secondes: number;

    get days(): number {
        return Math.floor(this._days);
    }

    get hours(): number {
        return Math.floor(this._hours);
    }

    get minutes(): number {
        return Math.floor(this._minutes);
    }

    get secondes(): number {
        return Math.floor(this._secondes);
    }

    get totalMinutes(): number {
        return (this.days * 24 * 60) + (this.hours * 60) + this.minutes;
    }

    get totalSeconds(): number {
        return (this.totalMinutes * 60) + this.secondes;
    }

    constructor(days: number, hours: number, minutes: number, secondes: number) {
        this.build(days, hours, minutes, secondes);
    }

    private build(days: number, hours: number, minutes: number, secondes: number): void {
        let _seconds = secondes % SEC_PER_MIN;
        let carryMin = Math.floor(secondes / SEC_PER_MIN);

        let _minutes = (minutes + carryMin) % MIN_PER_HOUR;
        let carryHour = Math.floor((minutes + carryMin) / MIN_PER_HOUR);

        let _hours = (hours + carryHour) % HOUR_PER_DAY;
        let carryDay = Math.floor((hours + carryHour) / HOUR_PER_DAY);

        let _days = Math.floor(days + carryDay);

        this._secondes = _seconds;
        this._minutes = _minutes;
        this._hours = _hours;
        this._days = _days;
    }

    public toString(): string {
        let output: string = '';

        if (this._days >= 1) {
            output += this.days.toFixed(0) + '.';
        }

        let localHours = this.hours > 9 ? this.hours.toFixed(0) : '0' + this.hours.toFixed(0);
        let localMin = this.minutes > 9 ? this.minutes.toFixed(0) : '0' + this.minutes.toFixed(0);
        let localSec = this.secondes > 9 ? this.secondes.toFixed(0) : '0' + this.secondes.toFixed(0);

        output += localHours + ':' + localMin + ':' + localSec;

        return output;
    }

    public static fromString(timespan: string): TimeSpan {
        let timespanSplit = timespan.split(':');

        let days: number;
        let hours: number;
        let minutes: number;
        let secondes: number;

        // mm:ss
        if (timespanSplit.length === 2) {
            days = 0;
            hours = 0;
            minutes = Number.parseInt(timespanSplit[0]);
            secondes = Number.parseInt(timespanSplit[1]);
            console.log(timespan, days, hours, minutes, secondes);

            return new TimeSpan(days, hours, minutes, secondes);
        } else if (timespanSplit.length === 3) { // [dd.]hh:mm:ss
            let daysSplit = timespanSplit[0].split('.');
            // dd.hh
            if (daysSplit.length === 2) {
                days = Number.parseInt(daysSplit[0]);
                hours = Number.parseInt(daysSplit[1])
            } else {
                days = 0;
                hours = Number.parseInt(timespanSplit[0]);
            }
            minutes = Number.parseInt(timespanSplit[1]);
            secondes = Number.parseInt(timespanSplit[2]);

            console.log(timespan, days, hours, minutes, secondes);
            return new TimeSpan(days, hours, minutes, secondes);
        }
    }

}