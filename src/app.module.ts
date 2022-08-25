import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    LocationsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/lightHouse'),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
