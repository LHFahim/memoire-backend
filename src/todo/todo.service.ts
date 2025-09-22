import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateTodoDto,
  TodoDto,
  TodoPaginatedDto,
  TodoQueryDto,
  UpdateTodoDto,
} from './dto/todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { PriorityEnum, TodoStatusEnum } from './entities/todo.enum';

@Injectable()
export class TodoService extends SerializeService<TodoEntity> {
  constructor(
    @InjectModel(TodoEntity)
    private readonly todoModel: ReturnModelType<typeof TodoEntity>,
  ) {
    super(TodoEntity);
  }

  async createTodo(userId: string, body: CreateTodoDto) {
    const todoDoc = await this.todoModel.create({
      ...body,
      status: TodoStatusEnum.PENDING,
      priority: PriorityEnum.LOW,
      attachments: [],
      createdBy: userId,
      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(todoDoc, TodoDto);

    /*
  {
  "title": "string",
  "description": "string",
  "type": "PERSONAL",
  "dueDate": "2025-10-10",
  "color": "#F54927",
  "isPinned": false
}
  */
  }

  async findAllTodos(
    userId: string,
    query: TodoQueryDto,
  ): Promise<TodoPaginatedDto> {
    const todos = await this.todoModel
      .find({ createdBy: userId, isDeleted: false })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const todosCount = await this.todoModel.countDocuments({
      createdBy: userId,
      isDeleted: false,
    });

    console.log(todos);

    return {
      items: this.toJSONs(todos, TodoDto),
      pagination: {
        total: todosCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          todos.length > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOneTodo(userId: string, id: string) {
    const todo = await this.todoModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!todo) throw new NotFoundException('Todo not found');

    return this.toJSON(todo, TodoDto);
  }

  async updateOneTodo(userId: string, id: string, body: UpdateTodoDto) {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, createdBy: userId, isDeleted: false },
      { ...body },
      { new: true },
    );

    if (!todo) throw new NotFoundException('Todo not found');

    return this.toJSON(todo, TodoDto);
  }

  async deleteOneTodo(userId: string, id: string) {
    const doc = await this.todoModel.findOneAndUpdate(
      {
        _id: id,
        createdBy: userId,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true },
    );

    if (!doc) throw new NotFoundException('Todo not found');

    return true;
  }
}
