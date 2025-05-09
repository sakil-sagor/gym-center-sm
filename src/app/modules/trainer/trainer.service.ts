import { User } from '../user/user.model';
import { TTrainer } from './trainer.interface';

const createTrainerinDB = async (data: TTrainer) => {
  const trainerData = { ...data, role: 'trainer' };
  const result = await User.create(trainerData);
  return result;
};
const getAllTrainersinDB = async () => {
  const result = await User.find({ role: 'trainer' }).select(
    '-password -__v -updatedAt',
  );
  if (!result) throw new Error('No user found');
  return result;
};

export const TrainerService = {
  createTrainerinDB,
  getAllTrainersinDB,
};
