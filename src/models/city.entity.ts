import { Province } from "../province/province.entity.js";
import { Shipment } from "./shipment.entity.js";

export class City {
    id: number
    postCode: string 
    name: string
    province: Province
    shipment: Shipment

    constructor(id: number, postCode: string, name: string, province: Province, shipment: Shipment){
        this.id = id;
        this.postCode = postCode;
        this.name = name;
        this.province = province;
        this.shipment = shipment;
    }
}