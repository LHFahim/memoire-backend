import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TodoEntity } from '../entities/todo.entity';
import { TodoStatusEnum } from '../entities/todo.enum';

export class CreateTodoDto extends PickType(TodoEntity, [
  'title',
  'description',
  'status',
  'type',
  'dueDate',
  'color',
  'priority',
]) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  board: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsEnum(TodoStatusEnum)
  @ApiProperty({ enum: TodoStatusEnum, required: false })
  status: TodoStatusEnum;
}

export class TodoDto extends OmitType(TodoEntity, []) {
  // FIXME createdBy field is garbage in the response, have to fix later
  @Expose()
  @IsMongoId()
  // @Transform(({ value }) => value._id.toString(), { toPlainOnly: true })
  createdBy: Types.ObjectId;
}

export class TodoQueryDto extends PaginationQueryDto {
  @IsString()
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  boardId?: string;
}

export class TodoPaginatedDto {
  @Expose()
  items: TodoDto[];

  @Expose()
  pagination: PaginationDto;
}
