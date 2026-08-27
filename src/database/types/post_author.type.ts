import { SelectPostType } from './post.type';
import { SelectUserType } from './user.type';

export type SelectPostAuthorType = SelectPostType & { author: SelectUserType };
