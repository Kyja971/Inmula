import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostType } from './models/post.type';
import { Observable, take } from 'rxjs';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  @Get() //GET htpp://localhost:3000/post
  findAll(
    @Query('take') takePost: number,
    @Query('page') page: number,
  ): Observable<PostType[]> {
    return this._service.findAll(takePost, page).pipe(take(1));
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<PostType> {
    return this._service.findOne(id).pipe(take(1));
  }

  @Post()
  add(@Body() body: CreatePostDto): Observable<CreatePostDto> {
    return this._service.add(body).pipe(take(1));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreatePostDto) {
    return this._service.update(id, body).pipe(take(1));
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<CreatePostDto> {
    return this._service.delete(id).pipe(take(1));
  }
}
