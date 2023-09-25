import { Product } from "../product/product.entity.js"
import { Order } from "./order.entity.js"


export class OrderList{
  id: number
  productAmount: number
  order: Order
  products: Product[]

  constructor(id: number, productAmount: number, order: Order, products: Product[]){
    this.id = id;
    this.productAmount = productAmount;
    this.order = order;
    this.products = products;
  }
}