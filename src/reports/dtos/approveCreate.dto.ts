import { IsBoolean, IsString } from "class-validator";


export default class ApproveCreateRequestDto {
   @IsBoolean()
    approved:boolean
}