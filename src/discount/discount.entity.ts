import {Entity, ManyToOne, Property, Rel} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()   
export class Discount extends BaseEntity {

    @Property({nullable: false, unique: true})
    dateSince!: Date 

    @Property({nullable: false, unique: true})
    amount!: number

    @Property({nullable: false, unique: true})
    discountPercentage!: number
}