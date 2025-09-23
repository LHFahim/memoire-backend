import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BoardEntity } from 'src/board/entities/board.entity';
import { ReflectionEntity } from './entities/reflection.entity';
import { ReflectionController } from './reflection.controller';
import { ReflectionService } from './reflection.service';

@Module({
  imports: [TypegooseModule.forFeature([ReflectionEntity, BoardEntity])],
  controllers: [ReflectionController],
  providers: [ReflectionService],
})
export class ReflectionModule {}
