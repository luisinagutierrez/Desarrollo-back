import { City } from "../city/city.entity.js"
import { User } from "../user/user.entity.js"
import {Entity, ManyToOne, Property} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
//import { Shipment } from "../models/shipment.entity.js";

@Entity()   
export class Client extends BaseEntity {

    @Property({nullable: false, unique: true})
    id!: string 

    @Property({nullable: false, unique: true})
    dni!: number

    @Property({nullable: false, unique: true})
    name!: string

    @Property({nullable: false, unique: true})
    firstName!: string

    @Property({nullable: false, unique: true})
    LastName!: string

    @Property({nullable: false, unique: true})
    phone!: number

    @Property({nullable: false, unique: true})
    street!: string

    @Property({nullable: false, unique: true})
    streetNumber!: string
// en provincia ver error

}