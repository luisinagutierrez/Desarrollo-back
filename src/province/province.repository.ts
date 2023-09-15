import {Repository} from "../shared/repository.js";
import {Province} from "./province.entity.js";

const Provinces = [
    new Province(
        1,
        'Buenos Aires'
    )
]

export class provinceRepository implements Repository <Province>{
    public findAll(): Province [] | undefined{
        return Provinces
    }

    public findOne (item: {id: string;}): Province | undefined{
        return Provinces.find((Province) => Province.id === parseInt(item.id))
    }

    public add(item: Province): Province | undefined {
        Provinces.push(item);
        return item;
      }

    public update(item: Province): Province | undefined {
        const index = Provinces.findIndex(Province => Province.id === item.id);
        if (index !== -1){
          Provinces[index] = {...Provinces[index], ...item};
        }
        return Provinces[index];
    }

    public delete(item: {id: string}): Province | undefined {
        const index = Provinces.findIndex(Province => Province.id === parseInt(item.id));
        if (index !== -1){
          const deletedProvinces = Provinces[index];
          Provinces.splice(index, 1);
          return deletedProvinces; 
        }
      }
}
