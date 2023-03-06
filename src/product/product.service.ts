import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { EntityManager, getRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './product.entity';
import {CategoryEntity} from '../category/category.entity'
import { BasketEntity } from './basket.entity';
import UserEntity from 'src/users/user.entity';
import { OrderEntity } from './order.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity) private  repo:Repository<ProductEntity>,
        @InjectRepository(CategoryEntity) private categoryRepo:Repository<CategoryEntity>,
        @InjectRepository(BasketEntity) private basketRepo:Repository<BasketEntity>,
        @InjectRepository(OrderEntity)  private orderRepo:Repository<OrderEntity>
    ){}



    async create(createProductDto:CreateProductDto,file:Express.Multer.File,categoryTitle:string){

        const {title,text,discount,price} = createProductDto

        
     // enter category title or category id when create A Product for realize product will be saved on witch product
        const imagePath = file.path.replace(/\\/g,'/')
        const image = `http://localhost:3000/${imagePath}`

        const category = await this.categoryRepo.findOne({where:{englishTitle:categoryTitle}})

        const product = this.repo.create({title,text,discount,image,price})

        product.category = category



        return this.repo.save(product)
    }

    getAll(){

        // return this.repo
        // .createQueryBuilder('products')
        // .leftJoinAndSelect('products.category','category')
        // .getOne()
        return this.repo.find({relations:['user']})
    }

    async createBasket(productId:number,user:UserEntity){

        //totalCount   //totalpAYMENT

        const product = await this.repo.findOne({where:{id:productId}})


        
       
     
        const loggedInUser = user.id

        const findedBasket = await this.basketRepo.findOne({where:{loggedUserId:loggedInUser},relations:['user','orders','orders.product']})


            const createOrder = this.orderRepo.create({quantity:1,logginUserId:loggedInUser})
                 createOrder.product = product
               await this.orderRepo.save(createOrder)
       
        if(!findedBasket) {

            const totalCount = 1
            const totalPayment = +product.price
            const productBasket = this.basketRepo.create({totalCount,totalPayment})
            productBasket.user = user
            productBasket.loggedUserId = user.id
            productBasket.orders = [createOrder]
             return this.basketRepo.save(productBasket)
        }else {

            findedBasket.orders.push(createOrder)

            findedBasket.totalPayment =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

             return total + (item.quantity * +item.product.price)

        },0)
             findedBasket.totalCount =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

               return total + item.quantity
        },0)

        return this.basketRepo.save(findedBasket)
        }
    }


    async increaseProductInBasket(productId:number,user:UserEntity){

       

        const loggedInUser = user.id


       
        const findedBasket = await this.basketRepo.findOne({where:{loggedUserId:loggedInUser},relations:{orders:true}})

        const findProductInBasket = findedBasket.orders.find(item => item.product.id == productId)

        findProductInBasket.quantity +=1
        
    
          findedBasket.totalPayment =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

            return total+ (item.quantity * +item.product.price)
     },0)
          findedBasket.totalCount =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

            return total+ item.quantity
     },0)

     
       
        
        return this.basketRepo.save(findedBasket)

  
   



    }
    async decreaseProductInBasket(productId:number,user:UserEntity){

       

        const loggedInUser = user.id


       
        const findedBasket = await this.basketRepo.findOne({where:{loggedUserId:loggedInUser},relations:{orders:true}})

        const findProductInBasket = findedBasket.orders.find(item => item.product.id == productId)

        if(findProductInBasket.quantity > 1 ) {

            findProductInBasket.quantity = findProductInBasket.quantity - 1
        }else {

           const filterdData =  findedBasket.orders.filter(item => item.product.id != productId)

            findedBasket.orders = filterdData

           
        }

        
    
          findedBasket.totalPayment =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

            return total+ (item.quantity * +item.product.price)
     },0)
          findedBasket.totalCount =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

            return total+ item.quantity
     },0)

     
       
        
        return this.basketRepo.save(findedBasket)


    }


    async deleteProductInBasket (productId:number , user:UserEntity) {


        const loggedInUser = user.id

        const findedBasket = await this.basketRepo.findOne({where:{loggedUserId:loggedInUser},relations:{orders:true}})


        const deletedProductArray = findedBasket.orders.filter( item => item.product.id != productId )

        findedBasket.orders = deletedProductArray

        findedBasket.totalPayment =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

            return total+ (item.quantity * +item.product.price)
     },0)
          findedBasket.totalCount =  findedBasket.orders.reduce((total:number,item:OrderEntity):any=>{

            return total+ item.quantity
     },0)

       
        
        return this.basketRepo.save(findedBasket)

    }

}
