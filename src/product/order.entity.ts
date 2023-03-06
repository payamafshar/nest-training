import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasketEntity } from "./basket.entity";
import { ProductEntity } from "./product.entity";




@Entity()
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    quantity:number

    @Column()
    logginUserId:number

    @ManyToOne( () => ProductEntity , product => product.orders,{eager:true,cascade:true,onDelete:'CASCADE'} )
    product:ProductEntity

    @ManyToOne( () =>  BasketEntity , basket => basket.orders )
    @JoinColumn({name:'basket_id'})
    basket:BasketEntity
}