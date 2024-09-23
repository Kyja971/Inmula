import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BonneBoiteService } from './bonne-boite.service';
import { BonneBoiteDto } from './dto/create-bonne-boite.dto';
import { UpdateBonneBoiteDto } from './dto/update-bonne-boite.dto';
import { ContactType } from './models/contact.type';

@Controller('boite')
export class BonneBoiteController {
  constructor(private readonly bonneBoiteService: BonneBoiteService) {}

  @Post()
  create(@Body() createBonneBoiteDto: BonneBoiteDto) {
    return this.bonneBoiteService.create(createBonneBoiteDto);
  }

  @Post(':id')
  addCompany(@Param('id') id: string, @Body() companyId: number) {
    console.log(companyId, id);
    return this.bonneBoiteService.addCompany(id, companyId);
  }

  @Get('unactivated')
  findAll() {
    return this.bonneBoiteService.findAll();
  }

  @Get('company')
  getCompanyIdToCompanyInfo(@Request() req) {
    const companyIds = req.headers['params'];
    return this.bonneBoiteService.getCompanyIdToCompanyInfo(companyIds);
  }

  @Get()
  fakeResult() {
    return this.bonneBoiteService.fakeResult();
  }

  @Get(':id')
  getPersonnalArray(@Param('id') id: string) {
    return this.bonneBoiteService.getPersonnalArray(id);
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

  @Post('contact')
  addContact(
    @Query('internId') intern: string,
    @Query('companyId') companyId: string,
    @Body() body: ContactType,
  ) {
    return this.bonneBoiteService.addContact(intern, parseInt(companyId), body);
  }

  @Get('contact/contact')
  getContact(
    @Query('internId') intern: string,
    @Query('companyId') companyId: string,
  ) {
    return this.bonneBoiteService.getContact(intern, parseInt(companyId));
  }
}
