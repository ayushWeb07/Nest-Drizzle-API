import { users } from '../schemas';

export type SelectUserType = typeof users.$inferSelect;
export type InsertUserType = typeof users.$inferInsert;
