export class Discount {
    id: string;
    dataSince: number 
    amount: number
    discount: number    

    constructor(id: string, dataSince: number, amount: number, discount: number){
        this.id= id;
        this.dataSince = dataSince;
        this.amount = amount;
        this. discount = discount;
    }
}