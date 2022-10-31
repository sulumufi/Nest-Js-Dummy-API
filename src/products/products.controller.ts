import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'
import { StreamOptions } from 'stream';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {

    }

    @Post()
    addProducts(
        @Body('title') prodTitle: string, 
        @Body('description') prodDescription: string, 
        @Body('price') prodPrice: number
        ): any {

        console.log (prodTitle)
        console.log  (prodDescription)
        console.log (prodPrice)
    
        const generatedID = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return {id : generatedID} 

    }
    @Get()
    getAllProducts(){
        return this.productsService.getProducts()
    }


    @Get(':id')
    getproduct(@Param('id') prodId :string){
        console.log("prodId",prodId)
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId : string,  @Body('title') title : string, @Body('description') desc : string, @Body('price') price : number) {
        this.productsService.updateProduct(prodId, title, desc, price);

    }  

    @Delete(':id')
    deleteProduct(@Param('id') prodId : string ){
        this.productsService.deleteProduct(prodId);
    }
}
