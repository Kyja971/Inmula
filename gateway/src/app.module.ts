/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { BonneBoiteModule } from './bonne-boite/bonne-boite.module';


@Module({
  imports: [InternModule, PostModule, AuthModule, BonneBoiteModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
