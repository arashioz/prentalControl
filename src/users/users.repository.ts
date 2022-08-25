import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Location, LocationDocument } from 'src/models/location.schema';
import { User, UserDocument } from 'src/models/usersSchema/parent.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }
  async create(user: User): Promise<User> {
    let newUser = new this.userModel({ ...user });
    return newUser.save();
  }
  async findAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<any>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user).exec();
  }
}
