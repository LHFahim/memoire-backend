import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { HabitSessionEntity } from './entities/habit-session.entity';
import { HabitTrackerEntity } from './entities/habit-tracker.entity';
import { HabitTrackerController } from './habit-tracker.controller';
import { HabitTrackerService } from './habit-tracker.service';

@Module({
  imports: [
    TypegooseModule.forFeature([HabitTrackerEntity, HabitSessionEntity]),
  ],
  controllers: [HabitTrackerController],
  providers: [HabitTrackerService],
})
export class HabitTrackerModule {}
