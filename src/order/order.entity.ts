import {Entity, ManyToOne, OneToMany, Property, Collection, Cascade, Rel} from '@mikro-orm/core'; 
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Product } from "../product/product.entity.js";
import { User } from '../user/user.entity.js';
import { Cart } from '../cart/cart.entity.js';

@Entity()   
export class Order extends BaseEntity {

    // COMENTÉ LO Q ESTÁ COMENTADO PQ COMO NO SON PARÁMETROS QUE PASEMOS NO HAY PROBLEMA CUANDO CREAMOS 
    // LA ORDEN, SOLO ME CONCENTRÉ EN QUE SE CREE CON LOS PARÁMETROS COMPLICADOS POR ASÍ DECIRLE


    // @Property({nullable: false})
    // status!: string //pendiente, cancelado, confirmado
    
    // @Property({nullable: true})
    // orderDate?: Date

    @Property({nullable: false, unique: true})
    total!: number

    // @Property({nullable: true})
    // updatedDate?: Date

    @OneToMany(() => Cart, (cart) => cart.order, {cascade:[Cascade.ALL]})
    carts = new Collection<Cart>(this);

    @ManyToOne(() => User, {nullable: false})
    user?: Rel<User>
    
    @OneToMany(() => Product, (product) => product.order, {cascade:[Cascade.ALL]})
        products = new Collection<Product>(this);
    }
