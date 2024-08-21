import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PoeService } from './poe.service';
import { CreatePoeDto } from './dto/create-poe.dto';
//import { UpdatePoeDto } from './dto/update-poe.dto';

@Controller('poe')
export class PoeController {
  constructor(private readonly poesService: PoeService) {}

  @Post()
  create(@Body() createPoeDto: CreatePoeDto) {
    return this.poesService.create(createPoeDto);
  }

  @Get()
  findAll() {
    return this.poesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePoeDto: UpdatePoeDto) {
  //   return this.poesService.update(+id, updatePoeDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poesService.remove(+id);
  }
}
