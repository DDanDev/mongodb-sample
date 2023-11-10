import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './teacher.model';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<Teacher>,
  ) {}

  async createTeacher(teacher: Teacher): Promise<{ id: string }> {
    const teacherModel = new this.teacherModel({
      name: teacher.name,
      subject: teacher.subject,
      department: teacher.department,
    });
    const result = await teacherModel.save();
    return { id: result.id };
  }

  async readAll(): Promise<Teacher[]> {
    const teachers = await this.teacherModel.find().exec();
    return teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      subject: teacher.subject,
      department: teacher.department,
    }));
  }

  async getTeacherById(id: string): Promise<Teacher> {
    let teacher;
    try {
      teacher = await this.teacherModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find teacher.');
    }
    if (!teacher) {
      throw new NotFoundException('Could not find teacher.');
    }
    return {
      id: teacher.id,
      name: teacher.name,
      subject: teacher.subject,
      department: teacher.department,
    };
  }

  async updateTeacher(teacher: Teacher): Promise<Teacher> {
    const updatedTeacher = await this.teacherModel.findOne({ _id: teacher.id });
    if (!updatedTeacher) {
      throw new NotFoundException('Could not find teacher.');
    }
    if (teacher.name) {
      updatedTeacher.name = teacher.name;
    }
    if (teacher.subject) {
      updatedTeacher.subject = teacher.subject;
    }
    if (teacher.department) {
      updatedTeacher.department = teacher.department;
    }
    await updatedTeacher.save();
    return {
      id: updatedTeacher.id,
      name: updatedTeacher.name,
      subject: updatedTeacher.subject,
      department: updatedTeacher.department,
    };
  }

  async deleteTeacher(id: string): Promise<{ message: string }> {
    const result = await this.teacherModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find teacher.');
    }
    return { message: `Teacher of id ${id} deleted` };
  }
}
