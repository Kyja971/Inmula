import { Controller, Get, Param } from '@nestjs/common';
import { InternService } from './intern.service';
import { InternType } from './models/intern.type';
import { Observable, take } from 'rxjs';

@Controller('intern')
export class InternController {
  constructor(private _service: InternService) {}

  @Get() //GET htpp://localhost:3000/intern
  findAll(): Observable<Array<InternType>> {
    return this._service.findAll().pipe(
      take(1), // autre facon d'arrêter d'observer
    );
  }
  @Get(':id') //http://127.0.0.1:3000/intern/1
  findOne(@Param('id') id: number) {
    return this._service.findOne(id).pipe(
      take(1), // autre facon d'arrêter d'observer
    );
  }
}
