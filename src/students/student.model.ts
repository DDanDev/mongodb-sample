import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tia: { type: Number, required: true },
  course: { type: String, required: true },
});

export interface Student {
  id: string;
  name: string;
  tia: number;
  course: string;
}
