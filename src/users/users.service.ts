import { UsersUtils } from './utils/users.utils';
import { UserRepository } from './users.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/models/usersSchema/parent.schema';
import { RegisterDto, UserDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userUtils: UsersUtils,
  ) {}

  async createUser(user: RegisterDto, otp: any, hash: any): Promise<User> {
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
      password: hash,
      token: otp,
      type: user.type,
      appVersion: user.appVersion,
      children: [],
    });
    return newuser;
  }

  async updateUser(phone: any, updateData: any) {
    return await this.userRepository.findAndUpdate(
      { phone: phone },
      {
        ...updateData,
      },
    );
  }

  async addChildren(user: UserDto, children: any) {
    if (user.phone) {
      let foundUser = this.findOneUser(user.phone);
      console.log(foundUser);
    }
  }

  async findUser(user: any) {
    return this.userRepository.findOne({ ...user });
  }

  async findOneUser(phone: string) {
    return this.userRepository.findOne({ phone: { $eq: phone } });
  }

  async verify(userId: string, params: { childrenId: string; otp: string }) {
    // const parent = await this.userRepository.findOne({ userId });
    const child = await this.userRepository.findOne({
      userId: params.childrenId,
    });

    if (!child) {
      throw new NotFoundException('Chid not found');
    }

    const match = await bcrypt.compare(params.otp, child.password);

    if (!match) throw new BadRequestException('OTP its Wrong');

    return await this.userRepository.findAndUpdate(
      { userId },
      { $push: { children: child } },
    );
  }

  // async findAllChildren(userId): Promise<User[]> {
    
  // }
}
