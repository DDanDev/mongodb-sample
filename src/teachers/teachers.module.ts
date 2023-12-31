import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.model';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      `${process.env.MONGODB_CONNECT}teachers${process.env.MONGODB_OPTIONS}`,
    ),
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
