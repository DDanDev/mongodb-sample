import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Student } from './student.model';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // CREATE
  @Post()
  async createStudent(@Body() student: Student): Promise<any> {
    return await this.studentsService.createStudent(student);
  }

  // READ
  @Get()
  async readAll(): Promise<any> {
    return await this.studentsService.readAll();
  }

  @Get(':tia')
  async getStudent(@Param('tia') tia: number) {
    return await this.studentsService.getStudentByTIA(tia);
  }

  // UPDATE
  @Patch()
  async updateStudent(@Body() student: Student): Promise<any> {
    return await this.studentsService.updateStudent(student);
  }

  // DELETE
  @Delete(':tia')
  async deleteStudent(@Param('tia') tia: number) {
    return await this.studentsService.deleteStudent(tia);
  }
}
