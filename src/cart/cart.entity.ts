import {Entity, ManyToOne, OneToMany, Property, Collection, Cascade, Rel} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
//import { ObjectId } from "mongodb";
import { Product } from "../product/product.entity.js";
import { Order } from '../order/order.entity.js';
@Entity()   
export class Cart extends BaseEntity {

    @Property({nullable: false})
    subtotal!: number

    @Property({nullable: false})
    quantity!: number

    @Property({nullable: false})
    product!: Product

    @ManyToOne(() => Order, {nullable: false})
    order!: Rel<Order>
}
