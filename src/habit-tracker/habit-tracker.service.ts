import { Injectable } from '@nestjs/common';
import { CreateHabitTrackerDto } from './dto/create-habit-tracker.dto';
import { UpdateHabitTrackerDto } from './dto/update-habit-tracker.dto';

@Injectable()
export class HabitTrackerService {
  create(createHabitTrackerDto: CreateHabitTrackerDto) {
    return 'This action adds a new habitTracker';
  }

  findAll() {
    return `This action returns all habitTracker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habitTracker`;
  }

  update(id: number, updateHabitTrackerDto: UpdateHabitTrackerDto) {
    return `This action updates a #${id} habitTracker`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitTracker`;
  }
}
