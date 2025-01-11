import {Entity, ManyToOne, Property, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
//import { Shipment } from "../models/shipment.entity.js";
import { City } from "../city/city.entity.js"
@Entity()   
export class User extends BaseEntity {

    @Property({nullable: false, unique: true})
    email!: string

    @Property({nullable: false, unique: true})
    password!: string 

    @Property({nullable: false, unique: true})
    privilege!: string

    @Property({nullable: true, unique: true})
    image?: string

    @Property({nullable: false, unique: true})
    firstName!: string

    @Property({nullable: false, unique: true})
    lastName!: string

    @Property({nullable: false, unique: true})
    phone!: number

    @Property({nullable: true, unique: true})
    street?: string

    @Property({nullable: true, unique: true})
    streetNumber?: string

    @ManyToOne(() => City, {nullable: false})
    city!: Rel<City>
    
    @Property({nullable: true, unique: true})
    resetPasswordToken?: string

}