export class priceHistory {
    id: number
    dataSince: number 
    price: number

    constructor(id: number, dataSince: number, price: number){
        this.id = id;
        this.dataSince = dataSince;
        this.price = price;
    }
}