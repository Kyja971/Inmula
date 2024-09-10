/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';


import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';


//const envfile = 'env/' + process.env.NEST_ENV;
@Module({
  imports: [InternModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
