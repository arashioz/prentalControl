import { UsersUtils } from './utils/users.utils';
import { UserRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/models/usersSchema/parent.schema';
import { RegisterDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userUtils: UsersUtils,
  ) {}

  async createUser(user: RegisterDto): Promise<User> {
    let newuser = this.userRepository.create({
      userId: uuidv4(),
      registerDate: Date(),
      phone: user.phone,
      password: null,
      type: user.type,
      appVersion: user.appVersion,
    });
    return newuser;
  }

  async updatePasswordUser(user: any, updateData) {
    return this.userRepository.findAndUpdate(
      { phone: { $eq: user.phone } },
      {
        password: updateData,
      },
    );
  }

  async findUser(phone: string) {
    return this.userRepository.findOne({ phone: { $eq: phone } });
  }
}
