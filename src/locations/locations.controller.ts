import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Location } from 'src/models/location.schema';
import { LocationService } from './locations.service';

@Controller('api/v1/locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(204)
  async create(@Request() request): Promise<Location> {
    return this.locationService.create(request.body, request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): string {
    return 'This action returns all locations';
  }

  @UseGuards(JwtAuthGuard)
  @Get('latest')
  async findLatest(@Request() request): Promise<Location> {
    return this.locationService.findLatest(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async findHistory(@Request() request): Promise<any> {
    const locs = this.locationService.findHistory(request.body.userId);
    return locs;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(): string {
    return 'This action return one location';
  }
}
