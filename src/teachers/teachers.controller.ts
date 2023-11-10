import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Teacher } from './teacher.model';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  // CREATE
  @Post()
  async createTeacher(@Body() teacher: Teacher): Promise<any> {
    return await this.teachersService.createTeacher(teacher);
  }

  // READ
  @Get()
  async readAll(): Promise<any> {
    return await this.teachersService.readAll();
  }

  @Get(':id')
  async getTeacher(@Param('id') id: string) {
    return await this.teachersService.getTeacherById(id);
  }

  // UPDATE
  @Patch()
  async updateTeacher(@Body() teacher: Teacher): Promise<any> {
    return await this.teachersService.updateTeacher(teacher);
  }

  // DELETE
  @Delete(':id')
  async deleteTeacher(@Param('id') id: string): Promise<any> {
    return await this.teachersService.deleteTeacher(id);
  }
}
