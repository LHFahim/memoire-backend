import { PartialType, PickType } from '@nestjs/swagger';
import { TodoEntity } from '../entities/todo.entity';

export class CreateTodoDto extends PickType(TodoEntity, [
  'title',
  'description',
  'type',
  'dueDate',
  'color',
  'isPinned',
]) {}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
