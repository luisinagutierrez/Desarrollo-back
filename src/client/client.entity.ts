import { City } from "../city/city.entity.js"
import { User } from "../user/user.entity.js"
import {Entity, ManyToOne, Property, Collection, Rel, OneToMany, Cascade} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
//import { Shipment } from "../models/shipment.entity.js";

@Entity()   
export class Client extends BaseEntity {
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

    @OneToMany(() => User, (user) => user.client, {cascade:[Cascade.ALL]})
    users = new Collection<User>(this);

    @ManyToOne(() => City, {nullable: false})
    city!: Rel<City>
}