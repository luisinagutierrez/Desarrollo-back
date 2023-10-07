import {Repository} from "../shared/repository.js";
import { User } from "./user.entity.js";
import { db } from "../shared/db/conn.js";
import { ObjectId } from "mongodb";

const usersArray = [];

const Users = db.collection<User>("User"); //returns token
export class userRepository implements Repository <User>{
    public async findAll(): Promise<User [] | undefined>{
        return await Users.find().toArray();
    }

    public async findOne (item: {id: string;}): Promise<User | undefined>{
      const _id = new ObjectId(item.id);  
      return (await Users.findOne({_id})) || undefined;  
    }

    public async add(item: User): Promise<User | undefined> {
        item._id = (await Users.insertOne(item)).insertedId;
        return item;
      }

    public async update(id:string, item: User): Promise<User | undefined> {
      const _id = new ObjectId(id);
      return (await Users.findOneAndUpdate({_id}, {$set: item}, {returnDocument: "after"})) || undefined;
    }

    public async delete(item: {id: string}): Promise<User | undefined> {
      const _id = new ObjectId(item.id);
      return (await Users.findOneAndDelete({_id})) || undefined;
      }

    public async findOneByEmail (item: {email: string;}): Promise<User | undefined>{ 
      const email = item.email;
      return (await Users.findOne({email})) || undefined;
     }
}