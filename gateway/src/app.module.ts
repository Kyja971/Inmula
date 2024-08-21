/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { ConfigModule } from '@nestjs/config';


const envfile = 'env/' + process.env.NEST_ENV;
@Module({
  imports: [InternModule, ConfigModule.forRoot({
    isGlobal: true, envFilePath: envfile,
  }),
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
