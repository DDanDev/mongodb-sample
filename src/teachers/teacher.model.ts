import * as mongoose from 'mongoose';

export const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  department: { type: String, required: true },
});

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  department: string;
}
