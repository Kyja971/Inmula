import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post-entity';
import config from './config/config';

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
        entities: [PostEntity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PostEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
