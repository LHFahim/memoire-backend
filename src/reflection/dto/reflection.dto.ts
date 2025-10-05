import { PartialType, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ReflectionEntity } from '../entities/reflection.entity';

export class CreateReflectionDto extends PickType(ReflectionEntity, [
  'title',
  'content',
  'board',
  'image_url',
]) {}

export class UpdateReflectionDto extends PartialType(CreateReflectionDto) {}

export class ReflectionDto extends ReflectionEntity {}

export class ReflectionQueryDto extends PaginationQueryDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  boardId: string;
}

export class ReflectionPaginatedDto {
  @Expose()
  items: ReflectionDto[];

  @Expose()
  pagination: PaginationDto;
}
