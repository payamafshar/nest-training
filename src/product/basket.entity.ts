import UserEntity from "src/users/user.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { OrderEntity } from "./order.entity"
import { ProductEntity } from "./product.entity"





@Entity()
export class BasketEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    totalCount:number

    @Column({type:'bigint'})
    totalPayment:number

    @Column({nullable:true})
    loggedUserId:number

    @ManyToOne(() => UserEntity, user => user.baskets) 
    user:UserEntity


    @OneToMany( () =>  OrderEntity , order => order.basket,{"cascade":true,onDelete:'SET NULL'})
    orders:OrderEntity[]

}