import {Repository} from "../shared/repository.js";
import {Province} from "./province.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const provincesArray = [];

const Provinces = db.collection<Province>("Province"); //returns token
export class provinceRepository implements Repository <Province>{
    public async findAll(): Promise<Province [] | undefined>{
        return await Provinces.find().toArray();
    }

    public async findOne (item: {id: string;}): Promise<Province | undefined>{
      const _id = new ObjectId(item.id);  
      return (await Provinces.findOne({_id})) || undefined;  
    }

    public async add(item: Province): Promise<Province | undefined> {
        item._id = (await Provinces.insertOne(item)).insertedId;
        return item;
      }

    public async update(id:string, item: Province): Promise<Province | undefined> {
      const _id = new ObjectId(id);
      return (await Provinces.findOneAndUpdate({_id}, {$set: item}, {returnDocument: "after"})) || undefined;
    }

    public async delete(item: {id: string}): Promise<Province | undefined> {
      const _id = new ObjectId(item.id);
      return (await Provinces.findOneAndDelete({_id})) || undefined;
      }
}
