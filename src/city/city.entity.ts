import {Entity, ManyToOne, Property, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Province } from "../province/province.entity.js";
//import { Shipment } from "../models/shipment.entity.js";

@Entity()   
export class City extends BaseEntity {

    @Property({nullable: false, unique: true})
    postCode!: string 

    @Property({nullable: false, unique: true})
    name!: string

    @ManyToOne(() => Province, {nullable: false})
    province!: Rel<Province>
}