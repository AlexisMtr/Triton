import { Pool } from "./pool";

export interface PoolConfiguration extends Pool {
    temperatureMinValue: number;
    temperatureMaxValue: number;
    phMinValue: number;
    phMaxValue: number;
    waterLevelMinValue: number;
    waterLevelMaxValue: number;
    latitude: number;
    longitude: number;
}