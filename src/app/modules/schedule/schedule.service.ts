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

  const created = await Schedule.create({ ...scheduleData, trainees: [] });
  return created;
};

export const ScheduleService = {
  createScheduleinDB,
};
