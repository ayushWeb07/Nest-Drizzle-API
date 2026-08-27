import { pgTable, integer, serial } from 'drizzle-orm/pg-core';
import { posts } from './post.schema';
import { categories } from './category.schema';
import { relations } from 'drizzle-orm';

export const postCategories = pgTable('post_categories', {
  id: serial('id').primaryKey(),

  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),

  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
});

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));
