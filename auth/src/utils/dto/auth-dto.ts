import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsString, IsDate, IsEnum, IsEmail } from "class-validator";
import { RoleTypeEnum } from "src/models/role-type-enum";

export class AuthDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
  
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    readonly password: string = '';
  
    @IsEnum(RoleTypeEnum)
    @IsNotEmpty()
    readonly role: RoleTypeEnum;

}
