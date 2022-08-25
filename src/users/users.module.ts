import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/usersSchema/parent.schema';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersUtils } from './utils/users.utils';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersController, UsersService, UserRepository, UsersUtils],
  exports: [UsersService, UsersUtils, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
