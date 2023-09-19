import {Repository} from "../shared/repository.js";
import { Supplier } from "./supplier.entity.js";

const suppliers = [ // este es el nuestro 
    new Supplier(
        1,
        28-44444444-7,
        'Lady Purse',
        34719888,
        'ladyPurse.com',
        'ladypurse@hotmail.com',
    )
]

export class supplierRepository implements Repository <Supplier>{
    public findAll(): Supplier [] | undefined{
        return suppliers
    }

    public findOne (item: {id: string;}): Supplier | undefined{
        return suppliers.find((Supplier) => Supplier.cuil === parseInt(item.id))
    }

    public add(item: Supplier): Supplier | undefined {
        suppliers.push(item);
        return item;
      }

    public update(item: Supplier): Supplier | undefined {
        const index = suppliers.findIndex(Supplier => Supplier.cuil === item.cuil);
        if (index !== -1){
          suppliers[index] = {...suppliers[index], ...item};
        }
        return suppliers[index];
    }

    public delete(item: {id: string}): Supplier | undefined {
        const index = suppliers.findIndex(Supplier => Supplier.cuil === parseInt(item.id));
        if (index !== -1){
          const deletedsuppliers = suppliers[index];
          suppliers.splice(index, 1);
          return deletedsuppliers; 
        }
      }
}
