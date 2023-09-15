export class Products {
    productCode: number
    description: string
    stock: number
    measures: number
    name: string
    cuit: number
    categoryCode: number

    constructor(productCode: number, description: string, stock: number, measures: number, name: string, cuit: number, categoryCode: number){
        this.productCode = productCode;
        this.description = description;
        this.stock = stock;
        this.measures = measures;
        this.name = name;
        this.cuit = cuit;
        this.categoryCode = categoryCode; 
    }
}