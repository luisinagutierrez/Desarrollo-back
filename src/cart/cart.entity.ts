import {Entity, ManyToOne, OneToMany, Property} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Collection, ObjectId } from "mongodb";
//import { Shipment } from "../models/shipment.entity.js";
import { Product } from "../product/product.entity.js";

@Entity()   
export class Cart extends BaseEntity {

    @Property({nullable: false, unique: true})
    id!: string 

    @Property({nullable: false, unique: true})
    productAmount!: number

    @OneToMany(() => Product, product => product)
    products = new Collection<Product>(this); 
}
