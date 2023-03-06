import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategoryDto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService:CategoryService){}
    @Post('/create')

    createCategory(@Body() createCategoryDto:CreateCategoryDto){
        const {title,englishTitle} = createCategoryDto

        return this.categoryService.create(title,englishTitle)
    }

    @Get('/getAll')

    getAllCategory (){

        return this.categoryService.find()

    }
}
