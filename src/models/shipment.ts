export class shipment {
    id: number
    cuit: number 
    businessName: string
    phone: number
    address: string 

    constructor(id: number, cuit: number, businessName: string, phone: number, address: string){
        this.id = id;
        this.cuit = cuit;
        this.businessName = businessName;
        this.phone = phone;
        this.address = address;
    }
}