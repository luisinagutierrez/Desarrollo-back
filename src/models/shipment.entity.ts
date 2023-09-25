export class Shipment {
    id: number
    cuit: string 
    businessName: string
    phone: number

    constructor(id: number, cuit: string, businessName: string, phone: number){
        this.id = id;
        this.cuit = cuit;
        this.businessName = businessName;
        this.phone = phone;
    }
}