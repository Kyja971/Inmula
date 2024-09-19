import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoiteSchema } from './models/boite-schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
      {
        dbName: 'boite_db',
      },
    ),
    MongooseModule.forFeature([{ name: 'Boite', schema: BoiteSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
