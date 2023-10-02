import { Category } from "../category/category.entity.js"
import { Supplier } from "../supplier/supplier.entity.js"

export class Product {
    id: number
    productCode: number
    description: string
    stock: number
    measures: number
    name: string
    image: string
    supplier: Supplier
    category: Category
    

    constructor(id: number, productCode: number, description: string, stock: number, measures: number, name: string, cuit: number, categoryCode: number, supplier: Supplier, category: Category, image: string){
        this.id = id;
        this.productCode = productCode;
        this.description = description;
        this.stock = stock;
        this.measures = measures;
        this.name = name;
        this.supplier = supplier;
        this.category = category; 
        this.image = image;
    }
}