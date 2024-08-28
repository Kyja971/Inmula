import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { PostType } from './models/post.type';
import { take as rxjsTake } from 'rxjs';
import { PostService } from './post.service';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post-dto';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  @Get() //GET htpp://localhost:3000/post
  findAll(
    @Query('take') take: number,
    @Query('page') page: number,
    @Res() res: Response,
  ) {
    this._service
      .findAll(take, page)
      .pipe(rxjsTake(1))
      .subscribe({
        next: (response) => {
          if (response) {
            res.status(200).send(response);
          }
        },
        error: (error) => {
          res.status(400).send(error);
        },
      });
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() res: Response): void {
    this._service
      .findOne(id)
      .pipe(rxjsTake(1))
      .subscribe({
        next: (response: any) => {
          if (response) {
            res.status(200).send(response);
          }
          res.status(404).json({ msg: 'Post not found' }).send();
        },
        error: (error: any) => {
          res.status(50).send(error);
        },
      });
  }

  @Post()
  add(@Body() body: CreatePostDto, @Res() res: Response): void {
    this._service
      .add(body)
      .pipe(rxjsTake(1))
      .subscribe({
        next: (response) => {
          if (response) {
            res.status(201).send(response);
          } else {
            res.status(400).send();
          }
        },
        error: (error) => {
          res.status(500).send(error);
        },
      });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: PostType,
    @Res() res: Response,
  ): void {
    this._service
      .update(id, body)
      .pipe(rxjsTake(1))
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

  @Delete(':id')
  delete(@Param('id') id: number, @Res() res: Response): void {
    this._service
      .delete(id)
      .pipe(rxjsTake(1))
      .subscribe({
        next: (response: any) => {
          if (response) {
            res.status(204).send(response);
          } else {
            res.status(400).json({ message: 'No such post to delete' }).send();
          }
        },
        error: (error: any) => {
          res.status(500).send(error);
        },
      });
  }
}
