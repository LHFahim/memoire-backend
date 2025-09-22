import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService extends SerializeService<TodoEntity> {
  constructor(
    @InjectModel(TodoEntity)
    private readonly todoModel: ReturnModelType<typeof TodoEntity>,
  ) {
    super(TodoEntity);
  }

  async create(userId: string, body: CreateTodoDto) {
    console.log('🚀 ~ TodoService ~ create ~ body:', body);

    const newTodo = await this.todoModel.create({
      ...body,
      // status: TodoStatusEnum.PENDING,
      // priority: PriorityEnum.LOW,
      // attachments: [],
      createdBy: userId,
    });
    console.log('🚀 ~ TodoService ~ create ~ newTodo:', newTodo);
    return newTodo;
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
