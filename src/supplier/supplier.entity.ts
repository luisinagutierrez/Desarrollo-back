import { ObjectId } from "mongodb"
import {Entity, ManyToOne, Property} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { City } from "../city/city.entity.js"
//import { Shipment } from "../models/shipment.entity.js";

@Entity()   
export class Supplier extends BaseEntity {

    @Property({nullable: false, unique: true})
    id!: string 

    @Property({nullable: false, unique: true})
    cuil!: number

    @Property({nullable: false, unique: true})
    businessName!: string

    @Property({nullable: false, unique: true})
    email!: string

    @Property({nullable: false, unique: true})
    phone!: string

    @ManyToOne(() => City, {nullable: false})
    city!: City

    // en provincia ver error con producto

}