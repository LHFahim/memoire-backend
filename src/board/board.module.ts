import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from './entities/board.entity';

@Module({
  imports: [TypegooseModule.forFeature([BoardEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
