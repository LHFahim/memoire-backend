import { Module } from '@nestjs/common';
import { HabitTrackerService } from './habit-tracker.service';
import { HabitTrackerController } from './habit-tracker.controller';

@Module({
  controllers: [HabitTrackerController],
  providers: [HabitTrackerService],
})
export class HabitTrackerModule {}
