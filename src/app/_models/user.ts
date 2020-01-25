import { Role } from './role';

export interface User {
    "email" : string,
    "password"?:string,
    "confirm_password"? : string,
    "firstname"? : string,
    "lastname"? : string,
    "unique_no"? : string,
    "role"? : Role,
    "token"?:string,
    "token_type"? : string,
    "expire_in"?:string
}