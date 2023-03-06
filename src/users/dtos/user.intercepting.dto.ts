


import { Expose } from "class-transformer";



export class UserIntercept {

    @Expose()
    id:number
    @Expose()
    email:string
    password:string
}