

export class User{
  id: number
  email: string
  password: string
  privilege: string //admin - cliente

  constructor(id: number, email: string, password: string, privilege: string){
    this.id = id;
    this.email = email;
    this.password = password;
    this.privilege = privilege;
  }
}