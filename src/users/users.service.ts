import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import  CreateUserDto  from './dtos/user.dtos';
import  UserEntity  from './user.entity';
@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(UserEntity)
        private repo:Repository<UserEntity>
        ){}


       async createUser(createUserDto:CreateUserDto){
            const {email,password} = createUserDto

            const user = this.repo.create({email,password})

            return await this.repo.save(user)
        }


       async  findUser(id:number) {

            if(!id) {
                return null
            }
            const user = await this.repo.findOne({where:{id}})

            if(!user) throw new NotFoundException('user not founded')
           
            return user
        }

   
        


        async updateUserById(id:number,attrs:Partial<UserEntity>) {


            const user = await this.findUser(id)

            if(!user) throw new NotFoundException('user not founded')

            const updateResult = Object.assign(user,attrs)

            return await this.repo.save(user)
        }



        async removeUserById(id:number){

            const user = await this.findUser(id)

            if(!user) throw new NotFoundException('user not founded')

            return await this.repo.remove(user)
        }
}
