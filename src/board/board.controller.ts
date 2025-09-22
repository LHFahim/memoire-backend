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
import { BoardService } from './board.service';
import { BoardQueryDto, CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@ApiTags('Board')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Board, version: APIVersions.V1 })
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post(Routes[ControllersEnum.Board].createBoard)
  createBoard(@UserId() userId: string, @Body() body: CreateBoardDto) {
    return this.boardService.createBoard(userId, body);
  }

  @Get(Routes[ControllersEnum.Board].findAllBoards)
  findAll(@UserId() userId: string, @Query() query: BoardQueryDto) {
    return this.boardService.findAll(userId, query);
  }

  @Get(Routes[ControllersEnum.Board].findOneBoard)
  findOneBoard(@UserId() userId: string, @ResourceId() id: string) {
    return this.boardService.findOneBoard(userId, id);
  }

  @Patch(Routes[ControllersEnum.Board].updateOneBoard)
  updateOneBoard(
    @UserId() userId: string,
    @ResourceId() id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.updateOneBoard(userId, id, updateBoardDto);
  }

  @Delete(Routes[ControllersEnum.Board].deleteOneBoard)
  deleteOneBoard(@UserId() userId: string, @ResourceId() id: string) {
    return this.boardService.deleteOneBoard(userId, id);
  }
}
