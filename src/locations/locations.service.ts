import { Injectable } from '@nestjs/common';
import { LocationDto, LocationInpDto } from 'src/dto/location.dto';
import { Location } from 'src/models/location.schema';
import { LocationRepository } from './locations.repository';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async create(params: Location, userId: string): Promise<Location> {
    let date = new Date();
    return this.locationRepository.create({
      ...params,
      userId,
      createdAt: date.valueOf(),
    });
  }

  async findLatest(userId: string): Promise<Location> {
    return this.locationRepository.findLatest({
      userId,
    });
  }

  async findHistory(userId: string): Promise<Location[]> {
    return this.locationRepository.findHistory({
      userId,
    });
  }
}
