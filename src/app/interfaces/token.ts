import { UserDataClaim } from "./user-data-claim";

export interface Token {
    Token :     string;
    Timestamp : number;
    UserData :  UserDataClaim;
}
