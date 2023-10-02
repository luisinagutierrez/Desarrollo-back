import { ObjectId } from "mongodb";

export class Discount {
    _id: ObjectId
    dateSince: Date 
    amount: number
    discount: number    

    constructor(_id: ObjectId, dateSince: Date , amount: number, discount: number){
        this._id= _id;
        this.dateSince = dateSince;
        this.amount = amount;
        this. discount = discount;
    }
}