import UserEntity from "src/users/user.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm"
import { CategoryEntity } from '../category/category.entity'
import { BasketEntity } from "./basket.entity"
import { OrderEntity } from "./order.entity"


@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    text:string

    @Column()
    price:string

    @Column()
    image:string

    @OneToMany(()=> UserEntity,(user)=>user.product)
    user:UserEntity[]

    @Column({default:1})
    count:number

    @Column()
    discount:string

    @ManyToOne(()=>CategoryEntity, (category) => category.products)
    category:CategoryEntity


    
    @OneToMany( () => OrderEntity , order => order.product )
    orders:OrderEntity[]

    @RelationId((product:ProductEntity)=>product.category)
    categoryId:number
}