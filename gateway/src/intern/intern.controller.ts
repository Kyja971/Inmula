import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InternService } from './intern.service';
import { InternType } from './models/intern.type';
import { take } from 'rxjs';
import { Response } from 'express';
import { CreateInternDto } from './dto/create-intern.dto';
import { AdminOrSuperAdminGuard } from 'src/auth/guards/admin-super-admin.guard';
import { isConnectedGuard } from 'src/post/guards/is-connected.guard';

@Controller('/intern')
export class InternController {
  constructor(private _service: InternService) {} // C'est ici que sont injecté toutes les dépendances dont on a besoin

  @Get() //GET http://localhost:3000/intern
  findAll(@Res() res: Response): void {
    this._service
      .findAll()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response) {
            res.status(200).send(response);
          } else {
            res.status(400).send("Il n'y a rien à afficher");
          }
        },
        error: (error) => {
          console.log(error);
          res.status(400).send(error);
        },
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response): void {
    this._service
      .findOne(id)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          if (response) {
            res.status(200).send(response);
          } else {
            res.status(404).send();
          }
        },
        error: (error: any) => {
          res.status(500).send(error);
        },
      });
  }

  @UseGuards(AdminOrSuperAdminGuard)
  @Post()
  add(@Body() body: CreateInternDto, @Res() res: Response): void {
    this._service
      .add(body)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          if (response) {
            res.status(201).send(response);
          } else {
            res.status(400).send();
          }
        },
        error: (error: any) => {
          res.status(500).send(error);
        },
      });
  }

  @UseGuards(isConnectedGuard)
  @Put(':id')
  // eslint-disable-next-line prettier/prettier
  update(@Param('id') id: string, @Body() body: InternType, @Res() res: Response, @Req() req: Request): void {
    if (req['user'].internId === id) {
      this._service
        .update(id, body)
        .pipe(take(1))
        .subscribe({
          next: (response: any) => {
            if (response) {
              res.status(200).send(response);
            } else {
              res.status(400).send();
            }
          },
          error: (error: any) => {
            res.status(500).send(error);
          },
        });
    }
  }

  @UseGuards(AdminOrSuperAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response): void {
    this._service
      .delete(id)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          if (response) {
            res.status(204).send(response);
          } else {
            res
              .status(400)
              .json({ message: 'No such intern to delete' })
              .send();
          }
        },
        error: (error: any) => {
          res.status(500).send(error);
        },
      });
  }
}
