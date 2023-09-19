export class Discount {
    id: number
    dataSince: number 
    amount: number
    discount: number    

    constructor(id: number, dataSince: number, amount: number, discount: number){
        this.id= id;
        this.dataSince = dataSince;
        this.amount = amount;
        this. discount = discount;
    }
}