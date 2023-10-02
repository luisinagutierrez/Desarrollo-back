import {Repository} from "../shared/repository.js";
import { Category } from "./category.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const categoriesArray = [];

const Categories = db.collection<Category>("Category"); //returns token
export class categoryRepository implements Repository <Category>{
    public async findAll(): Promise<Category [] | undefined>{
        return await Categories.find().toArray();
    }

    public async findOne (item: {id: string;}): Promise<Category | undefined>{
      const _id = new ObjectId(item.id);  
      return (await Categories.findOne({_id})) || undefined;  
    }

    public async add(item: Category): Promise<Category | undefined> {
        item._id = (await Categories.insertOne(item)).insertedId;
        return item;
      }

    public async update(id:string, item: Category): Promise<Category | undefined> {
      const _id = new ObjectId(id);
      return (await Categories.findOneAndUpdate({_id}, {$set: item}, {returnDocument: "after"})) || undefined;
    }

    public async delete(item: {id: string}): Promise<Category | undefined> {
      const _id = new ObjectId(item.id);
      return (await Categories.findOneAndDelete({_id})) || undefined;
      }
}