import {Entity, ManyToOne, Property, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Client } from "../client/client.entity.js";
//import { Shipment } from "../models/shipment.entity.js";
@Entity()   
export class User extends BaseEntity {

    @Property({nullable: false, unique: true})
    email!: string

    @Property({nullable: false, unique: true})
    password!: string 

    @Property({nullable: false, unique: true})
    privilege!: string

    @Property({nullable: false, unique: true})
    image!: string

    // @Property({nullable: false, unique: true})
    // resetPasswordToken!: string

    // @ManyToOne(() => Client, {nullable: false})
    // client!: Rel<Client>

}