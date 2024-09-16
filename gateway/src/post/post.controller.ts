import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PostType } from './models/post.type';
import { Observable, switchMap, take } from 'rxjs';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { isConnectedGuard } from './guards/is-connected.guard';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  @UseGuards(isConnectedGuard)
  @Get() //GET htpp://localhost:3000/post
  findAll(
    @Query('take') takePost: number,
    @Query('page') page: number,
  ): Observable<PostType[]> {
    return this._service.findAll(takePost, page).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<CreatePostDto> {
    return this._service.findOne(id).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Post()
  add(@Body() body: CreatePostDto): Observable<CreatePostDto> {
    return this._service.add(body).pipe(take(1));
  }

  @UseGuards(isConnectedGuard)
  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() body: CreatePostDto,
  ) {
    if (req['user'].internId === body.authorId) {
      return this._service.update(id, body).pipe(take(1));
    } else {
      throw new UnauthorizedException("Vous n'avez pas les droits");
    }
  }

  @UseGuards(isConnectedGuard)
  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  async delete(@Req() req: Request, @Param('id') id: number): Promise<Observable<CreatePostDto>> {
    if (req['user'].role === 'super_admin') {
      return this._service.delete(id).pipe(take(1));
    } else {
      return this.findOne(id).pipe(
        take(1),
        switchMap((post: CreatePostDto) => {
          if (req['user'].internId === post.authorId) {
            return this._service.delete(id).pipe(take(1));
          } else {
            throw new UnauthorizedException("Vous n'avez pas les droits");
          }
        }),
      );
    }
  }
}
