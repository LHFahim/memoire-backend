import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HabitSessionEntity } from '../entities/habit-session.entity';

export class CreateHabitSessionDto extends PickType(HabitSessionEntity, [
  'startedAt',
]) {}

export class UpdateHabitSessionDto extends PickType(HabitSessionEntity, [
  'startedAt',
  'endedAt',
  'durationInHours',
  'isActive',
]) {}

export class EndHabitSessionDto extends PickType(HabitSessionEntity, [
  'endedAt',
]) {}

export class HabitSessionDto extends HabitSessionEntity {}

export class HabitSessionQueryDto extends PaginationQueryDto {}

export class HabitSessionPaginatedDto {
  @Expose()
  items: HabitSessionDto[];

  @Expose()
  pagination: PaginationDto;
}
