export class Discount {
    id: number
    dateSince: Date 
    amount: number
    discount: number    

    constructor(id: number, dateSince: Date , amount: number, discount: number){
        this.id= id;
        this.dateSince = dateSince;
        this.amount = amount;
        this. discount = discount;
    }
}