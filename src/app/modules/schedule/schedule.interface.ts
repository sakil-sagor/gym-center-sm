import { Types } from 'mongoose';

export type TSchedule = {
  trainer: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  trainees?: Types.ObjectId[];
};
