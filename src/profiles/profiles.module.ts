import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './services/profiles.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [DatabaseModule, UsersModule],
})
export class ProfilesModule {}
