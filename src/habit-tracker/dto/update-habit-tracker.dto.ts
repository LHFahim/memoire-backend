import { PartialType } from '@nestjs/swagger';
import { CreateHabitTrackerDto } from './create-habit-tracker.dto';

export class UpdateHabitTrackerDto extends PartialType(CreateHabitTrackerDto) {}
