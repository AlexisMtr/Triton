export enum TelemetryType
{
    Temperature,
    Ph,
    Level,
    Battery,
    Other
}

export interface Telemetry
{
    type: TelemetryType;
    value: any;
    unit: string;
    dateTime: Date;
}