import { Types } from 'mongoose';
import { isTimeOverlap } from '../../utils/isTimeOverlap';
import { Schedule } from '../schedule/schedule.model';

export const bookClassinDB = async (scheduleId: string, traineeId: string) => {
  //Get target schedule
  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    throw new Error('Schedule not found');
  }

  // check if class is full
  const trainees = schedule.trainees ?? [];

  if (trainees.length >= 10) {
    throw new Error('Class schedule is full. Maximum 10 trainees allowed.');
  }
  //  Check if the trainee already booked this same schedule
  const alreadyBooked = trainees.some((t) => t.toString() === traineeId);
  if (alreadyBooked) {
    throw new Error('You have already booked this schedule.');
  }
  // Check if this trainee already booked another class at the same time
  const sameDaySchedules = await Schedule.find({
    date: schedule.date,
    trainees: traineeId,
    _id: { $ne: scheduleId },
  });

  const hasConflict = sameDaySchedules.some((existing) =>
    isTimeOverlap(
      schedule.startTime,
      schedule.endTime,
      existing.startTime,
      existing.endTime,
    ),
  );

  if (hasConflict) {
    throw new Error('You already have a class booked in this time slot.');
  }

  // Add trainee to schedule
  trainees.push(new Types.ObjectId(traineeId));
  await schedule.save();

  return schedule;
};

const cancelBookinginDB = async (scheduleId: string, traineeId: string) => {
  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) throw new Error('Schedule not found');

  // Remove trainee
  const trainees = schedule.trainees ?? [];
  schedule.trainees = trainees.filter((id) => id.toString() !== traineeId);
  await schedule.save();

  return schedule;
};

export const BookingService = {
  bookClassinDB,
  cancelBookinginDB,
};
