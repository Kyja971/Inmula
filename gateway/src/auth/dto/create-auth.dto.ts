import {
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  Contains,
} from 'class-validator';
import { RoleTypeEnum } from '../models/role-type-enum';

export class AuthDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsEmail()
  @IsNotEmpty()
  @Contains('@aelion.fr')
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(RoleTypeEnum)
  @IsNotEmpty()
  readonly role: RoleTypeEnum;
}
