import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.model';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async createStudent(student: Student): Promise<{ id: string }> {
    const studentModel = new this.studentModel({
      name: student.name,
      tia: student.tia,
      course: student.course,
    });
    const result = await studentModel.save();
    return { id: result.id };
  }

  async readAll(): Promise<Student[]> {
    const students = await this.studentModel.find().exec();
    return students.map((student) => ({
      id: student.id,
      name: student.name,
      tia: student.tia,
      course: student.course,
    }));
  }

  async getStudentByTIA(tia: number): Promise<Student> {
    if (isNaN(Number(tia))) {
      throw new BadRequestException('TIA must be a number');
    }

    const student = await this.studentModel.findOne({ tia: tia });
    if (!student) {
      throw new NotFoundException('Could not find the student.');
    }
    return {
      id: student.id,
      name: student.name,
      tia: student.tia,
      course: student.course,
    };
  }

  async deleteStudent(tia: number): Promise<{ message: string }> {
    if (isNaN(Number(tia))) {
      throw new BadRequestException('TIA must be a number');
    }
    const result = await this.studentModel.deleteOne({ tia: tia }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not remove student.');
    }
    return { message: `Student with tia ${tia} deleted` };
  }

  async updateStudent(student: Student): Promise<Student> {
    const updatedStudent = await this.studentModel.findOne({
      tia: student.tia,
    });
    if (!updatedStudent) {
      throw new NotFoundException('Could not find student.');
    }
    if (student.name) {
      updatedStudent.name = student.name;
    }
    if (student.course) {
      updatedStudent.course = student.course;
    }
    updatedStudent.save();
    return {
      id: updatedStudent.id,
      name: updatedStudent.name,
      tia: updatedStudent.tia,
      course: updatedStudent.course,
    };
  }
}
