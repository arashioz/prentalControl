import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop({
    required: [true, 'this feild is required'],
  })
  phone: string;

  @Prop({ required: true })
  registerDetail: [{ registerTime: string; registerDate: string }];

  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: true })
  type: 'PARENT' | 'CHILD';

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  children: User[];

  @Prop()
  token?: string;

  @Prop()
  name?: string;

  @Prop()
  appVersion: string;

  // @Prop(
  //   raw({
  //     firstName: { type: String },
  //     lastName: { type: String },
  //   }),
  // )
  // details: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
