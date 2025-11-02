import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitTrackerService } from './habit-tracker.service';
import { CreateHabitTrackerDto } from './dto/create-habit-tracker.dto';
import { UpdateHabitTrackerDto } from './dto/update-habit-tracker.dto';

@Controller('habit-tracker')
export class HabitTrackerController {
  constructor(private readonly habitTrackerService: HabitTrackerService) {}

  @Post()
  create(@Body() createHabitTrackerDto: CreateHabitTrackerDto) {
    return this.habitTrackerService.create(createHabitTrackerDto);
  }

  @Get()
  findAll() {
    return this.habitTrackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitTrackerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitTrackerDto: UpdateHabitTrackerDto) {
    return this.habitTrackerService.update(+id, updateHabitTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitTrackerService.remove(+id);
  }
}
