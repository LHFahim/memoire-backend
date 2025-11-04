import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HabitSessionEntity } from '../entities/habit-session.entity';
import { HabitTrackerEntity } from '../entities/habit-tracker.entity';

export class CreateHabitTrackerDto extends PickType(HabitTrackerEntity, [
  'title',
  'description',
  'timezone',
]) {}

export class UpdateHabitTrackerDto extends PartialType(CreateHabitTrackerDto) {}

export class HabitTrackerDto extends HabitTrackerEntity {}

export class HabitTrackerQueryDto extends PaginationQueryDto {}

export class HabitTrackerPaginatedDto {
  @Expose()
  items: HabitTrackerDto[];

  @Expose()
  pagination: PaginationDto;
}

export class HabitSessionDto extends HabitSessionEntity {}
