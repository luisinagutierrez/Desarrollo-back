import {Repository} from "../shared/repository.js";
import { Supplier } from "./supplier.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const suppliersArray = [];

const Suppliers = db.collection<Supplier>("Supplier"); //returns token
export class supplierRepository implements Repository <Supplier>{
    public async findAll(): Promise<Supplier [] | undefined>{
        return await Suppliers.find().toArray();
    }

    public async findOne (item: {id: string;}): Promise<Supplier | undefined>{
      const _id = new ObjectId(item.id);  
      return (await Suppliers.findOne({_id})) || undefined;  
    }

    public async add(item: Supplier): Promise<Supplier | undefined> {
        item._id = (await Suppliers.insertOne(item)).insertedId;
        return item;
      }

    public async update(id:string, item: Supplier): Promise<Supplier | undefined> {
      const _id = new ObjectId(id);
      return (await Suppliers.findOneAndUpdate({_id}, {$set: item}, {returnDocument: "after"})) || undefined;
    }

    public async delete(item: {id: string}): Promise<Supplier | undefined> {
      const _id = new ObjectId(item.id);
      return (await Suppliers.findOneAndDelete({_id})) || undefined;
      }
}