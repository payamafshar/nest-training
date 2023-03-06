import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from '../product/product.entity'

@Entity()
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column()
    englishTitle:string
    
    @OneToMany(()=>ProductEntity,(product) => product.category)
    products:ProductEntity[]
}