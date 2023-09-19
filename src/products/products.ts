export class Products {
    id: number
    productCode: number
    description: string
    stock: number
    measures: number
    name: string
    cuit: number
    categoryCode: number

    constructor(id: number, productCode: number, description: string, stock: number, measures: number, name: string, cuit: number, categoryCode: number){
        this.id = id;
        this.productCode = productCode;
        this.description = description;
        this.stock = stock;
        this.measures = measures;
        this.name = name;
        this.cuit = cuit;
        this.categoryCode = categoryCode; 
    }
}