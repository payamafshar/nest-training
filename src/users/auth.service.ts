import { InjectRepository } from "@nestjs/typeorm";
import {BadRequestException, Session, UnauthorizedException} from '@nestjs/common'
import CreateUserDto from "./dtos/user.dtos";
import UserEntity from "./user.entity";
import { Repository } from "typeorm";
import  createOtpDtop   from "./dtos/otpDto";
import CreateOtpDtop from "./dtos/otpDto";
import * as jwt from 'jsonwebtoken'
import CheckOtpDto from "./dtos/checkOtp.dto";

const randomNumberGenerator = () => {

    return Math.floor(Math.random()*10000 +10000)
}

export default class AuthService {

    constructor(@InjectRepository(UserEntity) private repo:Repository<UserEntity> ){}

   async signUp(createUserDto:CreateUserDto){

       const  {email , password} = createUserDto

       const user = await this.repo.findOne({where:{email}})

       if(user) throw new BadRequestException('user with email already exist')

       const createdUser = this.repo.create({email,password})

       const sginUpedUser = await this.repo.save(createdUser)
       return sginUpedUser

    }


   async signIn(createUserDto:CreateUserDto){

        const { email , password} = createUserDto

        const user = await this.repo.findOne({where:{email}})

        if(!user) throw new UnauthorizedException('email or password is wrong')

        if(user.password !== password) throw new UnauthorizedException('email or password is wrong')

        return user
            
            
       
    }

    async getOtpfromUser(createOtpDtop:CreateOtpDtop){

        const {mobile} = createOtpDtop
    

        
        const otpCode = randomNumberGenerator()
        const otpExpiresIn =new Date().getTime() + 90000
        const user = await this.repo.findOne({where:{mobile}})
        if(!user) {

            const createdOtp = this.repo.create({otpCode,otpExpiresIn,mobile})
            const createdUserWithOtp = await this.repo.save(createdOtp)
            return {
                mobile:createOtpDtop.mobile,
                code:otpCode
            }
        }else {

            const updatedOtp = await this.repo.update({mobile},{otpCode,otpExpiresIn})
         
            return {
                mobile:createOtpDtop.mobile,
                code:otpCode,
             
            }
        }

       
    }

    async checkOtpFromUser(checkOtpDto:CheckOtpDto , session:any) {

        const {code,mobile} = checkOtpDto 

        const user = await this.repo.findOne({where:{mobile}})

        const now = new Date().getTime()
        

        if(+now > +user.otpExpiresIn) throw new BadRequestException('کد شما منقضی شده است')

        if(+user.otpCode != +code) throw new BadRequestException('کد وارد شده صحیح نمی باشد')

        const token =  jwt.sign({mobile:user.mobile},'dontguesssecret',{expiresIn:'24days'})
        session.userToken = token
        return {
            token
        }
    }
}