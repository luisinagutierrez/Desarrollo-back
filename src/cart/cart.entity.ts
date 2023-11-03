import {Entity, ManyToOne, OneToMany, Property, Collection, Cascade} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { ObjectId } from "mongodb";
//import { Shipment } from "../models/shipment.entity.js";
import { Product } from "../product/product.entity.js";
import { User } from '../user/user.entity.js';
//import { City } from '../city/city.entity.js';

@Entity()   
export class Cart extends BaseEntity {

    @Property({nullable: false, unique: true})
    total!: number

    @OneToMany(() => Product, (product) => product.cart, {cascade:[Cascade.ALL]})
    products = new Collection<Product>(this);

    @ManyToOne(() => User, {nullable: false})
    user!: User
}
