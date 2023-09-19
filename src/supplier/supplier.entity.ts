export class Supplier {
    id: number
    cuil: number 
    businessName: string
    phone: number
    webPage: string
    email: string

    constructor(id: number, cuil: number, businessName: string, phone: number, webPage: string, email: string){
        this.id = id;
        this.cuil = cuil;
        this.businessName = businessName;
        this.phone = phone;
        this.webPage = webPage;
        this.email = email;
    }
}