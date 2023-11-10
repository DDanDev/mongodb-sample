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
    var result = await this.teachersService.createTeacher(teacher);
    return { id: result };
  }

  // READ
  @Get()
  readAll(): Promise<any> {
    return this.teachersService.readAll();
  }

  @Get(':id')
  getTeacher(@Param('id') id: string) {
    return this.teachersService.getTeacherById(id);
  }

  // UPDATE
  @Patch()
  async updateTeacher(@Body() teacher: Teacher): Promise<any> {
    return await this.teachersService.updateTeacher(teacher);
  }

  // DELETE
  @Delete(':id')
  async deleteTeacher(@Param('id') id: string): Promise<any> {
    await this.teachersService.deleteTeacher(id);
    return { message: 'Teacher deleted successfully' };
  }
}
