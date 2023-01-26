import { UserEntities } from '@components/users/entities/user.entities';
import { IUserResponse } from '@components/users/interfaces/user.interfaces';

export const userResponse = (user: UserEntities): IUserResponse => ({
  id: user.id,
  login: user.login,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
