import { Repository } from "../shared/repository.js";
import {Category} from "./category.entity.js"

const Categories = [
    new Category(
        1,
        'Carteras'
    )
]

export class CategoryRepository implements Repository<Category>{
    public findAll(): Category [] | undefined{   
        return Categories
    }

    public findOne (item: {id: string;}): Category | undefined{
        return Categories.find((Category) => Category.id === parseInt(item.id))
    }

    public add(item: Category): Category | undefined {
        Categories.push(item);
        return item;
      }

    public update(item: Category): Category | undefined {
        const index = Categories.findIndex(Category => Category.id === item.id);
        if (index !== -1){
          Categories[index] = {...Categories[index], ...item};
        }
        return Categories[index];
    }

    public delete(item: {id: string}): Category | undefined {
        const index = Categories.findIndex(Category => Category.id === parseInt(item.id));
        if (index !== -1){
          const deletedCategories = Categories[index];
          Categories.splice(index, 1);
          return deletedCategories; 
        }
      }
}
