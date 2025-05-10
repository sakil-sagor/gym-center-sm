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
const getSingleUserinDB = async (id: string, verifyLoggeId: string) => {
  if (id !== verifyLoggeId) throw new Error('Unauthorized access.');
  const user = await User.findOne({ _id: id }).select('-password -__v ');
  if (!user) throw new Error('No user found');
  return user;
};
const updateUserintoDB = async (
  id: string,
  verifyLoggeId: string,
  payload: Partial<TUser>,
) => {
  if (id !== verifyLoggeId) throw new Error('Unauthorized access.');
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-password -__v ');
  return result;
};

export const UserService = {
  createUserinDB,
  getAllTraineesinDB,
  getSingleUserinDB,
  updateUserintoDB,
};
