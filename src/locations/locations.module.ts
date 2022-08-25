import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from 'src/models/location.schema';
import { LocationController } from './locations.controller';
import { LocationRepository } from './locations.repository';
import { LocationService } from './locations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
})
export class LocationsModule {}
