import { calculateHourDifference } from '../../utils/calculateHoureDifference';
import { TSchedule } from './schedule.interface';
import { Schedule } from './schedule.model';

const getAllScheduleinDB = async () => {
  const result = await Schedule.find({})
    .populate({
      path: 'trainer',
      select: '-password  -updatedAt -__v -role',
    })
    .populate({
      path: 'trainees',
      select: ' -role -password -__v  -updatedAt',
    })
    .select('-__v  -updatedAt');
  if (!result) throw new Error('No schedule found');
  return result;
};

const createScheduleinDB = async (scheduleData: TSchedule) => {
  // Check max 5 classes per day
  const existingCount = await Schedule.countDocuments({
    date: scheduleData.date,
  });
  if (existingCount >= 5) {
    throw new Error('Schedule limit exceeded. Max 5 classes per day.');
  }
  // check class duration
  const duration = calculateHourDifference(
    scheduleData.startTime,
    scheduleData.endTime,
  );
  if (duration !== 2) {
    throw new Error('Each class must be exactly 2 hours long.');
  }
  //  Check if this trainer already has a class at same time
  const conflict = await Schedule.findOne({
    trainer: scheduleData.trainer,
    date: scheduleData.date,
    $or: [
      {
        startTime: { $lt: scheduleData.endTime },
        endTime: { $gt: scheduleData.startTime },
      },
    ],
  });

  if (conflict) {
    throw new Error('Trainer already has a class scheduled at this time.');
  }

  const created = await Schedule.create({ ...scheduleData, trainees: [] });
  return created;
};
const getTraineeSchedulesfromDb = async (traineeId: string) => {
  const mySchedules = await Schedule.find({ trainees: traineeId })
    .populate({
      path: 'trainer',
      select: '-password -_id -createdAt -updatedAt -__v -role',
    })
    .populate({
      path: 'trainees',
      select: ' -_id -role -password -__v -createdAt -updatedAt',
    })
    .select('-__v -createdAt -updatedAt');

  return mySchedules;
};
const trainerSchedulesfromDB = async (trainerId: string) => {
  const mySchedules = await Schedule.find({ trainer: trainerId })
    .populate({
      path: 'trainer',
      select: '-password -_id -createdAt -updatedAt -__v -role',
    })
    .populate({
      path: 'trainees',
      select: ' -_id -role -password -__v -createdAt -updatedAt',
    })
    .select('-__v -createdAt -updatedAt');

  return mySchedules;
};

export const ScheduleService = {
  getAllScheduleinDB,
  createScheduleinDB,
  getTraineeSchedulesfromDb,
  trainerSchedulesfromDB,
};
