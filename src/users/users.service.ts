import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/index';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}
}
