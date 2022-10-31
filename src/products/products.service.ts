import {Injectable, NotFoundException} from '@nestjs/common'
import { Product } from './product.model'

@Injectable() 
export class ProductsService {

    products : Product[] = [];

    insertProduct(title : string, desc: string, price : number) : string{
        const prodId =  Math.floor(Math.random()*10).toString();
        const newProduct = new Product (prodId, title, desc, price);
        this.products.push(newProduct);
        console.log(this.products)
        return prodId; 
    }


    getProducts(){
        return [...this.products]
    }

    getSingleProduct(productId:string){
        const product = this.findProduct(productId)[0]
        console.log(product)
        return { ...product }
    }

    updateProduct(id: string, title : string, desc: string, price : number){
        const [product, productIndex] = this.findProduct(id);
        
        const updatedProduct = {...product}

        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price= price;
        }

        this.products[productIndex] = updatedProduct;



        
    }

    private findProduct(id:string):  [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex]

        console.log("--------->",product)

        if(!product){
            throw new NotFoundException('Could not find product ');
        }

        return [product, productIndex];
    }

    deleteProduct(id:string){
        const [product, productIndex] = this.findProduct(id)
        this.products.splice(productIndex,1)
    }
}