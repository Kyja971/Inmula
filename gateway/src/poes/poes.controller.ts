import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PoeService } from './poe.service';
import { CreatePoeDto } from './dto/create-poe.dto';
@Controller('poe')
export class PoeController {
  constructor(private readonly poesService: PoeService) {}

  @Post()
  add(@Body() createPoeDto: CreatePoeDto) {
    return this.poesService.add(createPoeDto);
  }

  @Get()
  findAll() {
    return this.poesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poesService.remove(+id);
  }
}
