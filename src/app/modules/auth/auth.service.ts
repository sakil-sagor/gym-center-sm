import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUserinDB = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = generateToken({
    id: user._id,
    role: user.role,
    email: user.email,
  });

  return { token };
};
export const AuthService = {
  loginUserinDB,
};
