import {Entity, ManyToOne, Property} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Category } from "../category/category.entity.js";
import { Supplier } from "../supplier/supplier.entity.js";
//import { Shipment } from "../models/shipment.entity.js";

@Entity()   
export class Product extends BaseEntity {

    @Property({nullable: false, unique: true})
    id!: string

    @Property({nullable: false, unique: true})
    productCode!: number

    @Property({nullable: false, unique: true})
    description!: string 

    @Property({nullable: false, unique: true})
    price!: number

    @Property({nullable: false, unique: true})
    name!: string

    @Property({nullable: false, unique: true})
    image!: string

    @ManyToOne(() => Category, {nullable: false})
    category!: Category

    @ManyToOne(() => Supplier, {nullable: false})
    supplier!: Supplier
}