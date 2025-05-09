import { calculateHourDifference } from '../../utils/calculateHoureDifference';
import { TSchedule } from './schedule.interface';
import { Schedule } from './schedule.model';

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

export const ScheduleService = {
  createScheduleinDB,
};
