import { IsNotEmpty, isString, IsString } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  latitude: number;

  @IsNotEmpty()
  @IsString()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  createdAt: number;
}

export class LocationInpDto {
  @IsNotEmpty()
  @IsString()
  latitude: number;

  @IsNotEmpty()
  @IsString()
  longitude: number;
}
