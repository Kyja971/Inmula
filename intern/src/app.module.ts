import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InternSchema } from './models/intern.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
      {
        dbName: 'intern_db_admin',
      },
    ),
    MongooseModule.forFeature([{ name: 'Intern', schema: InternSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
