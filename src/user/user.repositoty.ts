import {Repository} from "../shared/repository.js";
import { User } from "./user.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const categoriesArray = [];

const Categories = db.collection<User>("User"); //returns token
export class userRepository implements Repository <User>{
    public async findAll(): Promise<User [] | undefined>{
        return await Categories.find().toArray();
    }

    public async findOne (item: {id: string;}): Promise<User | undefined>{
      const _id = new ObjectId(item.id);  
      return (await Categories.findOne({_id})) || undefined;  
    }

    public async add(item: User): Promise<User | undefined> {
        item._id = (await Categories.insertOne(item)).insertedId;
        return item;
      }

    public async update(id:string, item: User): Promise<User | undefined> {
      const _id = new ObjectId(id);
      return (await Categories.findOneAndUpdate({_id}, {$set: item}, {returnDocument: "after"})) || undefined;
    }

    public async delete(item: {id: string}): Promise<User | undefined> {
      const _id = new ObjectId(item.id);
      return (await Categories.findOneAndDelete({_id})) || undefined;
      }
}