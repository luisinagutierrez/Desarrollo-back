import { Product } from "../product/product.entity.js";

export class PriceHistory {
    id: number
    dateSince: Date 
    price: number
    product: Product

    constructor(id: number, dateSince: Date, price: number, product: Product){
        this.id = id;
        this.dateSince = dateSince;
        this.price = price;
        this.product = product;
    }
}