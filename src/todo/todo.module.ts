import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BoardEntity } from 'src/board/entities/board.entity';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypegooseModule.forFeature([TodoEntity, BoardEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
