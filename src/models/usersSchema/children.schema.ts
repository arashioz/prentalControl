import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type UserDocument = UserChildren & Document;

@Schema()
export class UserChildren {
  @Prop()
  userId: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  registerDate: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: true })
  type: 'Parent' | 'Children';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserChildren' })
  children: UserChildren;

  @Prop()
  hashRt?: string;

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

export const UserSchema = SchemaFactory.createForClass(UserChildren);
