import { Request } from "express"

export enum orderStatus{
    pending = "pending",
    cancelled = "cencelled",
    ontheway = "ontheway",
    delivered = "delivered",
    preparation = "preparation"
}

export enum PaymentMethod{
    khalti = "khalti",
    esewa = "esewa",
    COD = "cod"
}

export enum PaymentStatus{
    paid = "paid",
    unpaid = "unpaid"
}

export interface IExtendedRequest extends Request{
    user? : {
        username : string,
        email : string,
        role : string,
        password : string,
        id : string

    }

}