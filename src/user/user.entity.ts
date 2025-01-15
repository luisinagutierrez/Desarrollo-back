import {Entity, ManyToOne, Property, Rel, BeforeCreate, BeforeUpdate} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
//import { Shipment } from "../models/shipment.entity.js";
import { City } from "../city/city.entity.js"
import bcrypt from 'bcrypt';
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

    @Property({nullable: true, unique: true})
    resetPasswordExpires?: Date


    // vi un par de videos q usan isDirty, pero no me lo reconoce 
    // así q tuve q poner un poco más de lógica en el controller en las funcione
    // q tocan de alguna manera la contra (signup, update, updatepassword)
    @BeforeCreate()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2b$')) {
          const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
        }
    }
}
