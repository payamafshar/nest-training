import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
@Injectable()
export class CategoryService {


    constructor(@InjectRepository(CategoryEntity) private repo:Repository<CategoryEntity>){}


    create(title:string,englishTitle:string) {

        const category = this.repo.create({title,englishTitle})

        return this.repo.save(category)
    }

    find(){
        return this.repo.createQueryBuilder('category').leftJoinAndSelect('category.products','products').getMany()
    }
}
