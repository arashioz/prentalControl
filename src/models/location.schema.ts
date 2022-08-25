import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop()
  userId: string;

  @Prop({
    required: [true, 'this feild is required'],
  })
  latitude: string;

  @Prop({
    required: [true, 'this feild is required'],
  })
  longitude: string;

  @Prop()
  createdAt: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
