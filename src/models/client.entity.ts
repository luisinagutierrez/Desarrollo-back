import { City } from "./city.entity.js"
import { User } from "./user.entity.js"

export class Client {
    id: number
    dni: number 
    firstName: string
    surName: string
    phone: number
    password: string
    street: string
    streetNumber: number
    //type: string[] = ['Minorista', 'Mayorista']
    city: City
    user: User

    constructor(id: number, dni: number, firstName: string, surName: string, phone: number, password: string, street: string, streetNumber: number, city: City, user: User){
        this.id = id;
        this.dni = dni;
        this.firstName = firstName;
        this.surName = surName;
        this.phone = phone;
        this.password = password;
        this.street = street;
        this.streetNumber = streetNumber;
        //this.type = type;
        this.city = city;
        this.user = user;
    }
}