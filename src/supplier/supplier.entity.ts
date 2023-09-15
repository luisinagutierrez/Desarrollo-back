export class Supplier {
    cuil: number 
    businessName: string
    phone: number
    webPage: string
    email: string

    constructor(cuil: number, businessName: string, phone: number, webPage: string, email: string){
        this.cuil = cuil;
        this.businessName = businessName;
        this.phone = phone;
        this.webPage = webPage;
        this.email = email;
    }
}