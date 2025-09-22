import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  BoardDto,
  BoardPaginatedDto,
  BoardQueryDto,
  CreateBoardDto,
  UpdateBoardDto,
} from './dto/board.dto';
import { BoardEntity } from './entities/board.entity';
import { BoardVisibilityEnum } from './entities/board.enums';

@Injectable()
export class BoardService extends SerializeService<BoardEntity> {
  constructor(
    @InjectModel(BoardEntity)
    private readonly boardModel: ReturnModelType<typeof BoardEntity>,
  ) {
    super(BoardEntity);
  }

  async createBoard(userId: string, body: CreateBoardDto) {
    const doc = await this.boardModel.create({
      ...body,
      visibility: BoardVisibilityEnum.PRIVATE,
      settings: {
        isAttachmentsEnabled: true,
        isCommentsEnabled: true,
      },
      members: [],

      isActive: true,
      isDeleted: false,
      createdBy: userId,
    });

    return this.toJSON(doc, BoardDto);
  }

  async findAll(
    userId: string,
    query: BoardQueryDto,
  ): Promise<BoardPaginatedDto> {
    const docs = await this.boardModel
      .find({
        createdBy: userId,

        isDeleted: false,
      })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const boardsCount = await this.boardModel.countDocuments({
      createdBy: userId,
      isDeleted: false,
    });

    return {
      items: this.toJSONs(docs, BoardDto),
      pagination: {
        total: boardsCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          docs.length > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  findOneBoard(userId: string, id: string) {
    const board = this.boardModel.findOne({
      _id: id,
      createdBy: userId,
      isDeleted: false,
    });

    if (!board) throw new NotFoundException('Board not found');

    return this.toJSON(board, BoardDto);
  }

  updateOneBoard(userId: string, id: string, updateBoardDto: UpdateBoardDto) {
    const board = this.boardModel.findOneAndUpdate(
      { _id: id, createdBy: userId, isDeleted: false },
      { ...updateBoardDto },
      { new: true },
    );

    if (!board) throw new NotFoundException('Board not found');

    return this.toJSON(board, BoardDto);
  }

  deleteOneBoard(userId: string, id: string) {
    const board = this.boardModel.findOneAndUpdate(
      { _id: id, createdBy: userId, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!board) throw new NotFoundException('Board not found');

    return this.toJSON(board, BoardDto);
  }
}
