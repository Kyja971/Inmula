import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post-entity';
import config from './config/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FormatPagingService } from './services/format-paging.service';
import { LikeStatusEntity } from './entities/like-entity';
import { LikeController } from './like/like.controller';
import { LikeService } from './like/like.service';
import { CommentStatusEntity } from './entities/comment-entity';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (_configService: ConfigService) => ({
        type: _configService.get<any>('database.type'),
        host: _configService.get('database.host'),
        port: _configService.get<number>('database.port'),
        database: _configService.get<string>('database.name'),
        username: _configService.get('database.user.name'),
        password: _configService.get<string>('database.user.password'),
        synchronize: true,
        entities: [LikeStatusEntity, PostEntity, CommentStatusEntity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      LikeStatusEntity,
      PostEntity,
      CommentStatusEntity,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ClientsModule.register([
      {
        name: 'INTERN',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3100,
        },
      },
    ]),
  ],
  controllers: [AppController, LikeController, CommentController],
  providers: [AppService, FormatPagingService, LikeService, CommentService],
})
export class AppModule {}
