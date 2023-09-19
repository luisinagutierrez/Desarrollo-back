export class clients {
    id: number
    dni: number 
    firstName: string
    lastName: string
    phone: number
    email: string
    password: string
    street: string
    streetNumber: number
    //type: string[] = ['Minorista', 'Mayorista']
    postCode: number

    constructor(id: number, dni: number, firstName: string, lastName: string, phone: number, email: string, password: string, street: string, streetNumber: number, postCode: number){
        this.id = id;
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.street = street;
        this.streetNumber = streetNumber;
        //this.type = type;
        this.postCode = postCode
    }
}