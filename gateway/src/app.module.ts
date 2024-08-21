/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { PoeModule } from './poes/poes.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostEntity } from './post/models/post-entity';
import { Poe } from './poes/entities/poe.entity';

const envfile = 'env/' + process.env.NEST_ENV;
@Module({
  imports: [InternModule, PostModule, PoeModule, ConfigModule.forRoot({
    isGlobal: true, envFilePath: envfile,
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: configService.get<any>('DATABASE_TYPE'),
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_DATABASE'),
      entities: [Poe, PostEntity],
      synchronize: true,
    }),
  }),
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  /*public static mariaDBConfig: TypeOrmModuleOptions = { 
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'post_db_admin',
    password: 'admin_db_post',
    database: 'post_repository',
    synchronize: true,
    entities: [
      PostEntity,Poe
    ],
  };
  */
}
