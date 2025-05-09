import { TUser } from './user.interface';
import { User } from './user.model';

const createUserinDB = async (payload: TUser) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new Error('User already exists');
  const user = await User.create(payload);
  return user;
};
const getAllTraineesinDB = async () => {
  const user = await User.find({ role: 'trainee' }).select(
    '-password -__v -updatedAt',
  );
  if (!user) throw new Error('No user found');
  return user;
};

export const UserService = {
  createUserinDB,
  getAllTraineesinDB,
};
