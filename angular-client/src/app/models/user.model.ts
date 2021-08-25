export class User{
    id:number
    firstName:string
    lastName:string
    middleName:string
    roleKey:number
    address:string
    customerName:string
    phone:string
    email:string
    username:string

    constructor(init:string){
        this.id = 0
        this.firstName = init
        this.middleName = init
        this.lastName = init
        this.email = init
        this.phone = init
        this.address = init
        this.roleKey = 0
        this.customerName = init
        // this.username = init
    }
}

export enum Role {
    SUPER_ADMIN,
    ADMIN,
    SUBSCRIBER
}

//user interface