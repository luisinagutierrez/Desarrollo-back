import { ObjectId } from "mongodb";

export class Province {
    _id?: ObjectId
    name: string

    constructor(_id: ObjectId, name: string){
        this._id = _id;
        this.name = name;
    }
}