import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Location, LocationDocument } from 'src/models/location.schema';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async create(location: Location): Promise<Location> {
    let loc = new this.locationModel({ ...location });
    return loc.save();
  }

  async findLatest(
    locationFilterQuery: FilterQuery<Location>,
  ): Promise<Location> {
    return this.locationModel.findOne(locationFilterQuery, {}, { sort: { 'createdAt' : -1 }});
  }

  async findHistory(
    locationFilterQuery: FilterQuery<Location>,
  ): Promise<Location[]> {
    return this.locationModel.find(locationFilterQuery, {}, { sort: { 'createdAt' : -1 }});
  }
}
