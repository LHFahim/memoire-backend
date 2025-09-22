import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BoardEntity } from '../entities/board.entity';

export class CreateBoardDto extends PickType(BoardEntity, [
  'name',
  'description',
]) {}

export class UpdateBoardDto extends PartialType(
  PickType(BoardEntity, ['name', 'description', 'members', 'settings']),
) {}

export class BoardDto extends BoardEntity {}

export class BoardQueryDto extends PaginationQueryDto {}

export class BoardPaginatedDto {
  @Expose()
  items: BoardDto[];

  @Expose()
  pagination: PaginationDto;
}
