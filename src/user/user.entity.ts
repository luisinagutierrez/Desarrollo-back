import { ObjectId } from "mongodb";


export class User{
  _id: ObjectId
  email: string
  password: string
  privilege: string //admin - cliente
  resetPasswordToken: string
  resetPasswordExpires: Date

  constructor(_id: ObjectId, email: string, password: string, privilege: string, resetPasswordToken: string, resetPasswordExpires: Date){ 
    this._id = _id;
    this.email = email;
    this.password = password;
    this.privilege = privilege;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpires = resetPasswordExpires;
  }
}