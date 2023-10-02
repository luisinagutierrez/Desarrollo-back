import { ObjectId } from "mongodb"

export class Supplier {
    _id: ObjectId
    cuil: number 
    businessName: string
    phone: number
    webPage: string
    email: string

    constructor(_id: ObjectId, cuil: number, businessName: string, phone: number, webPage: string, email: string){
        this._id = _id;
        this.cuil = cuil;
        this.businessName = businessName;
        this.phone = phone;
        this.webPage = webPage;
        this.email = email;
    }
}