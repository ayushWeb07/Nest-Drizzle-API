import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProfilesService } from './services/profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { InsertProfileType } from '../database/types/profile.type';
import { SelectProfileUserType } from '../database/types/profile_user.type';
import { FindProfileByIdDto } from './dtos/find-profile-by-id.dto';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    // call the create profile service
    const newProfile: InsertProfileType =
      await this.profilesService.createProfile(createProfileDto);

    return {
      success: true,
      message: 'Successfully created the new profile',
      data: newProfile,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllProfiles() {
    // call the fetch all profiles service
    const fetchedProfiles: SelectProfileUserType[] =
      await this.profilesService.findAllProfiles();

    return {
      success: true,
      message: 'Successfully fetched all the profiles',
      data: fetchedProfiles,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findProfileById(@Param() findProfileByIdDto: FindProfileByIdDto) {
    // call the fetch profile by id service
    const fetchedProfile: SelectProfileUserType =
      await this.profilesService.findProfileById(findProfileByIdDto);

    return {
      success: true,
      message: 'Successfully fetched the profile by id',
      data: fetchedProfile,
    };
  }
}
