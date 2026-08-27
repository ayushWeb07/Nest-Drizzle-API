import { SelectProfileType } from './profile.type';
import { SelectUserType } from './user.type';

export type SelectProfileUserType = SelectProfileType & {
  user: SelectUserType;
};
