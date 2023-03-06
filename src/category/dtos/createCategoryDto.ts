import { IsString } from "class-validator"



export class CreateCategoryDto {
    @IsString()
    title:string
    @IsString()
    englishTitle:string
}