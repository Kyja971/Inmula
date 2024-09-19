import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BonneBoiteService } from './bonne-boite.service';
import { BonneBoiteDto } from './dto/create-bonne-boite.dto';
import { UpdateBonneBoiteDto } from './dto/update-bonne-boite.dto';

@Controller('boite')
export class BonneBoiteController {
  constructor(private readonly bonneBoiteService: BonneBoiteService) {}

  @Post()
  create(@Body() createBonneBoiteDto: BonneBoiteDto) {
    return this.bonneBoiteService.create(createBonneBoiteDto);
  }

  @Get('unactivated')
  findAll() {
    return this.bonneBoiteService.findAll();
  }

  @Get()
  fakeResult() {
    return this.bonneBoiteService.fakeResult();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bonneBoiteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBonneBoiteDto: UpdateBonneBoiteDto,
  ) {
    return this.bonneBoiteService.update(+id, updateBonneBoiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonneBoiteService.remove(+id);
  }
}
