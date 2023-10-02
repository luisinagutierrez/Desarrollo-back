import {Repository} from "../shared/repository.js";
import { Discount } from "./discount.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const discountsArray = [];

const Discounts = db.collection<Discount>("Discount"); //returns token
export class discountRepository implements Repository <Discount>{ 
    public async findAll(): Promise<Discount [] | undefined>{
        return await Discounts.find().toArray();
    }

    public async findOne (item: {id: string;}): Promise<Discount | undefined>{
      const _id = new ObjectId(item.id);  
      return (await Discounts.findOne({_id})) || undefined;  
    }

    public async add(item: Discount): Promise<Discount | undefined> {
        item._id = (await Discounts.insertOne(item)).insertedId;
        return item;
      }

    public async update(id:string, item: Discount): Promise<Discount | undefined> {
      const _id = new ObjectId(id);
      return (await Discounts.findOneAndUpdate({_id}, {$set: item}, {returnDocument: "after"})) || undefined;
    }

    public async delete(item: {id: string}): Promise<Discount | undefined> {
      const _id = new ObjectId(item.id);
      return (await Discounts.findOneAndDelete({_id})) || undefined;
      }
}