import { Repository } from "../shared/repository.js";
import {Discount} from "./discount.entity.js";

const Discounts = [
    new Discount(
      1,
      23052023,
      1000000,
      0.1
    )
]

export class DiscountRepository implements Repository<Discount>{
    public findAll(): Discount [] | undefined{
        return Discounts
    }

    public findOne (item: {id: string}): Discount | undefined{
        return Discounts.find((Discount) => Discount.id === parseInt(item.id)) //??? ESTÁ MAL
    }
    
    public add(item: Discount): Discount | undefined {
        Discounts.push(item);
        return item;
      }

    public update(item: Discount): Discount | undefined {
        const index = Discounts.findIndex(Discount => Discount.id === item.id); // NECESITA DOS PARÁMETROS IGUAL Q EN EL FIN ONE
        if (index !== -1){
          Discounts[index] = {...Discounts[index], ...item};
        }
        return Discounts[index];
    }

    public delete(item: {id: string}): Discount | undefined {
        const index = Discounts.findIndex(Discount => Discount.id === parseInt(item.id)) //??? ESTÁ MAL
        if (index !== -1){
          const deletedDiscounts = Discounts[index];
          Discounts.splice(index, 1);
          return deletedDiscounts; 
        }
      }
}
