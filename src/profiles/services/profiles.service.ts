import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { UsersService } from '../../users/services/users.service';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { profiles, users } from '../../database/schemas';
import { InsertProfileType } from '../../database/types/profile.type';
import { eq, getTableColumns } from 'drizzle-orm';
import { FindProfileByIdDto } from '../dtos/find-profile-by-id.dto';
import { SelectProfileUserType } from '../../database/types/profile_user.type';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly usersService: UsersService,
  ) {}

  async createProfile(
    createProfileDto: CreateProfileDto,
  ): Promise<InsertProfileType> {
    // check if such user exist
    await this.usersService.findUserById({
      id: createProfileDto.userId,
    });

    // insert the profile into the db
    const [newProfile] = await this.db
      .insert(profiles)
      .values(createProfileDto)
      .returning();

    return newProfile;
  }

  async findAllProfiles(): Promise<SelectProfileUserType[]> {
    // query the users from the db
    return await this.db
      .select({
        ...getTableColumns(profiles),
        user: {
          ...getTableColumns(users),
        },
      })
      .from(profiles)
      .innerJoin(users, eq(profiles.userId, users.id));
  }

  async findProfileById(
    findProfileByIdDto: FindProfileByIdDto,
  ): Promise<SelectProfileUserType> {
    // query the profile from the db
    const [fetchedProfile] = await this.db
      .select({
        ...getTableColumns(profiles),
        user: {
          ...getTableColumns(users),
        },
      })
      .from(profiles)
      .where(eq(profiles.id, findProfileByIdDto.id))
      .innerJoin(users, eq(profiles.userId, users.id));

    if (!fetchedProfile) {
      throw new NotFoundException('Profile with such id does not exist');
    }

    return fetchedProfile;
  }
}
