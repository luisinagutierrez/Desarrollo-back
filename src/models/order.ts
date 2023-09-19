export class order {
    id: number
    orderNumber: number 
    date: number 

    constructor(id: number, orderNumber: number, date: number){
        this.id = id;
        this.orderNumber = orderNumber;
        this.date = date;
    }
}