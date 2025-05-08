import { TUser } from './user.interface';
import { User } from './user.model';

const createUserinDB = async (payload: TUser) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new Error('User already exists');
  const user = await User.create(payload);
  return user;
};

export const UserService = {
  createUserinDB,
};
