import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountEntity } from './models/account-entity';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

const envfile = 'env/' + process.env.NEST_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envfile,
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
        entities: [AccountEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([AccountEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions : {
        expiresIn: process.env.EXPIRES_IN,
      }
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
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
