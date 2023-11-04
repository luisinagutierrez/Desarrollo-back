import {Entity, ManyToOne, OneToMany, Property, Rel, Collection, Cascade} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Province } from "../province/province.entity.js";
import { Client } from '../client/client.entity.js';
//import { Shipment } from "../models/shipment.entity.js";

@Entity()   
export class City extends BaseEntity {
    @Property({nullable: false, unique: true, type: 'string'})
    postCode!: string 

    @Property({nullable: false, unique: true})
    name!: string

    @ManyToOne(() => Province, {nullable: false})
    province!: Rel<Province>

    @OneToMany(() => Client, (client) => client.city, {cascade:[Cascade.ALL]})
    clients = new Collection<Client>(this);
}