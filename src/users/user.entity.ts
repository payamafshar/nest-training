
import { ProductEntity } from '../product/product.entity'
import ReportsEntity from 'src/reports/report.entity'
import {Column , PrimaryGeneratedColumn , Entity,OneToMany, ManyToOne} from 'typeorm'
import { BasketEntity } from 'src/product/basket.entity'



@Entity()
export default class UserEntity {

    @PrimaryGeneratedColumn()
   id:number

    @Column({nullable:true})
    email:string
    @Column({default:true})
    admin:boolean
    @Column({nullable:true})
    password:string
    @Column({nullable:true,type:'bigint'})
    mobile:number
    @Column({nullable:true})
    otpCode:number
    @Column({ nullable: true, type: 'bigint' })
    otpExpiresIn:number
    @OneToMany(() => ReportsEntity , report => report.user)
    report:ReportsEntity[]
    @ManyToOne(()=>ProductEntity,(product)=>product.user)
    product:ProductEntity

    @OneToMany(() => BasketEntity , basket => basket.user)
    baskets:BasketEntity[]

}