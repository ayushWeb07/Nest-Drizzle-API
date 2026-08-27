import { categories } from '../schemas';

export type SelectCategoryType = typeof categories.$inferSelect;
export type InsertCategoryType = typeof categories.$inferInsert;
