import { Client } from "./client.entity.js";

export class Order {
    id: number
    orderNumber: number 
    date: Date
    client: Client 

    constructor(id: number, orderNumber: number, date: Date, client: Client ){
        this.id = id;
        this.orderNumber = orderNumber;
        this.date = date;
        this.client = client;
    }
}