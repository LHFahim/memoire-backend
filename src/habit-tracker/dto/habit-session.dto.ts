import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HabitSessionEntity } from '../entities/habit-session.entity';

export class CreateHabitSessionDto extends PickType(HabitSessionEntity, [
  'startedAt',
]) {}

export class UpdateHabitSessionDto extends PartialType(CreateHabitSessionDto) {}

export class HabitSessionDto extends HabitSessionEntity {}

export class HabitSessionQueryDto extends PaginationQueryDto {}

export class HabitSessionPaginatedDto {
  @Expose()
  items: HabitSessionDto[];

  @Expose()
  pagination: PaginationDto;
}
