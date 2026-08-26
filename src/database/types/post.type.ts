import { posts } from '../schemas';

export type SelectPostType = typeof posts.$inferSelect;
export type InsertPostType = typeof posts.$inferInsert;
