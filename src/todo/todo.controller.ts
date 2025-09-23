import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { UserId } from 'src/common/decorator/user.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { CreateTodoDto, TodoQueryDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Todo, version: APIVersions.V1 })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(Routes[ControllersEnum.Todo].createTodo)
  createTodo(@UserId() userId: string, @Body() body: CreateTodoDto) {
    return this.todoService.createTodo(userId, body);
  }

  @Get(Routes[ControllersEnum.Todo].findAllTodos)
  findAllTodos(@UserId() userId: string, @Query() query: TodoQueryDto) {
    return this.todoService.findAllTodos(userId, query);
  }

  @Get(Routes[ControllersEnum.Todo].findOneTodo)
  findOneTodo(
    @UserId() userId: string,
    @ResourceId('boardId') boardId: string,
    @ResourceId('id') id: string,
  ) {
    return this.todoService.findOneTodo(userId, boardId, id);
  }

  @Patch(Routes[ControllersEnum.Todo].updateOneTodo)
  updateOneTodo(
    @UserId() userId: string,
    @ResourceId('boardId') boardId: string,
    @ResourceId('id') id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.updateOneTodo(userId, boardId, id, body);
  }

  @Delete(Routes[ControllersEnum.Todo].deleteOneTodo)
  deleteOneTodo(
    @UserId() userId: string,
    @ResourceId('boardId') boardId: string,
    @ResourceId('id') id: string,
  ) {
    return this.todoService.deleteOneTodo(userId, boardId, id);
  }
}
