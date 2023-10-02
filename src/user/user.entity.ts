import { ObjectId } from "mongodb";


export class User{
  _id: ObjectId
  email: string
  password: string
  privilege: string //admin - cliente

  constructor(_id: ObjectId, email: string, password: string, privilege: string){
    this._id = _id;
    this.email = email;
    this.password = password;
    this.privilege = privilege;
  }
}