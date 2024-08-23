import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyType } from 'src/Types/company/company.type';
import { PoeType } from 'src/Types/poe/poe.type';

class CompanyTypeDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;
}

class PoeTypeDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsDateString()
  @IsNotEmpty()
  readonly beginAt: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly endAt: Date;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly name: string;
}

export class CreateInternDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @MaxLength(15)
  readonly gender: string;

  @IsArray()
  readonly emails: Array<string>;

  @IsString()
  readonly phonenumber: string;

  @IsString()
  @MaxLength(50)
  readonly function: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyTypeDto)
  readonly company: CompanyType;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PoeTypeDto)
  readonly poe: PoeType;
}
