import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/usersSchema/parent.schema';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersUtils } from './utils/users.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UserRepository, UsersUtils],
  exports: [UsersService, UsersUtils, UserRepository],
})
export class UsersModule {}
