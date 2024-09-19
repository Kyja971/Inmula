import { PartialType } from '@nestjs/mapped-types';
import { BonneBoiteDto } from './create-bonne-boite.dto';

export class UpdateBonneBoiteDto extends PartialType(BonneBoiteDto) {}
