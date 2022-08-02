import { UsersUtils } from './utils/users.utils';
import { UserRepository } from './users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/models/usersSchema/parent.schema';
import { RegisterDto, UserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userUtils: UsersUtils,
  ) {}

  async createUser(user: RegisterDto): Promise<User> {
    let date = new Date();
    let newuser = this.userRepository.create({
      userId: uuidv4(),
      registerDetail: [
        {
          registerTime: date.toString(),
          registerDate: date.getUTCHours().toString(),
        },
      ],
      phone: user.phone,
      password: null,
      token: null,
      type: user.type,
      appVersion: user.appVersion,
    });
    return newuser;
  }

  async updateUser(phone: any, updateData: any) {
    return this.userRepository.findAndUpdate(
      { phone: { $eq: phone } },
      {
        ...updateData,
      },
    );
  }

  async addChildren(user: UserDto, children: any) {
    if (user.type === 'Parent') {
      this.createUser({ ...children })
    }
  }

  async findUser(user: any) {
    return this.userRepository.findOne({ ...user });
  }
  async findOneUser(phone: string) {
    return this.userRepository.findOne({ phone: { $eq: phone } });
  }
}
