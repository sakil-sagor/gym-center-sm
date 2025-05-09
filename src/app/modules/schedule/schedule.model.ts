import { Schema, model } from 'mongoose';
import { TSchedule } from './schedule.interface';

const scheduleSchema = new Schema<TSchedule>(
  {
    trainer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  },
  {
    timestamps: true,
  },
);

export const Schedule = model<TSchedule>('Schedule', scheduleSchema);
