import { profiles } from '../schemas';

export type SelectProfileType = typeof profiles.$inferSelect;
export type InsertProfileType = typeof profiles.$inferInsert;
