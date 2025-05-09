import { User } from '../user/user.model';
import { TTrainer } from './trainer.interface';

const createTrainerinDB = async (data: TTrainer) => {
  const trainerData = { ...data, role: 'trainer' };
  const result = await User.create(trainerData);
  return result;
};

export const TrainerService = {
  createTrainerinDB,
};
